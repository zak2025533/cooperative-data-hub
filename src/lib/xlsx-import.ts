import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type FieldMap = {
  /** db column key */
  key: string;
  /** human label shown in UI */
  label: string;
  /** acceptable Arabic/English header names in xlsx (case/space insensitive) */
  aliases: string[];
  /** transform raw cell to db value */
  transform?: (v: any) => any;
  required?: boolean;
};

const norm = (s: any) =>
  String(s ?? "").trim().toLowerCase().replace(/\s+/g, " ");

export function parseXlsxFile(file: File): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: null });
        resolve(rows);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export function mapRows(rows: Record<string, any>[], fields: FieldMap[]) {
  if (!rows.length) return { mapped: [], errors: ["الملف فارغ"] };
  const headers = Object.keys(rows[0]);
  const headerToKey: Record<string, string> = {};
  for (const f of fields) {
    const aliases = [f.key, f.label, ...f.aliases].map(norm);
    const h = headers.find((h) => aliases.includes(norm(h)));
    if (h) headerToKey[h] = f.key;
  }
  const mappedHeaders = Object.keys(headerToKey);
  const unmappedRequired = fields.filter((f) => f.required && !mappedHeaders.find((h) => headerToKey[h] === f.key));
  const errors: string[] = [];
  if (unmappedRequired.length) {
    errors.push(`أعمدة إلزامية مفقودة: ${unmappedRequired.map((f) => f.label).join("، ")}`);
  }

  const mapped: Record<string, any>[] = [];
  rows.forEach((row, idx) => {
    const obj: Record<string, any> = {};
    let hasAny = false;
    for (const h of mappedHeaders) {
      const key = headerToKey[h];
      const field = fields.find((f) => f.key === key)!;
      let v = row[h];
      if (v === "" || v == null) v = null;
      if (v != null && field.transform) {
        try { v = field.transform(v); } catch (e: any) {
          errors.push(`السطر ${idx + 2}: عمود "${field.label}" — ${e.message || "قيمة غير صحيحة"}`);
          continue;
        }
      }
      obj[key] = v;
      if (v != null) hasAny = true;
    }
    if (hasAny) {
      for (const f of fields) if (f.required && (obj[f.key] == null || obj[f.key] === "")) {
        errors.push(`السطر ${idx + 2}: حقل إلزامي فارغ "${f.label}"`);
      }
      mapped.push(obj);
    }
  });
  return { mapped, errors };
}

export async function importXlsx(
  file: File,
  table: string,
  fields: FieldMap[],
  opts?: { onDone?: () => void }
) {
  try {
    const rows = await parseXlsxFile(file);
    const { mapped, errors } = mapRows(rows, fields);
    if (errors.length) {
      toast.error(`تعذّر الاستيراد:\n${errors.slice(0, 5).join("\n")}${errors.length > 5 ? `\n…و ${errors.length - 5} أخطاء أخرى` : ""}`);
      return;
    }
    if (!mapped.length) {
      toast.error("لا توجد صفوف صالحة للاستيراد");
      return;
    }
    // chunk insert to avoid payload limits
    const chunkSize = 500;
    let inserted = 0;
    for (let i = 0; i < mapped.length; i += chunkSize) {
      const chunk = mapped.slice(i, i + chunkSize);
      const { error } = await supabase.from(table as any).insert(chunk);
      if (error) {
        toast.error(`خطأ عند الإدراج: ${error.message}`);
        return;
      }
      inserted += chunk.length;
    }
    toast.success(`تم استيراد ${inserted} سجل بنجاح`);
    opts?.onDone?.();
  } catch (e: any) {
    toast.error(`فشل قراءة الملف: ${e.message || e}`);
  }
}

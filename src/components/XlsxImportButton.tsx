import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { importXlsx, FieldMap } from "@/lib/xlsx-import";

export function XlsxImportButton({
  table, fields, label = "استيراد XLSX",
}: { table: string; fields: FieldMap[]; label?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          await importXlsx(f, table, fields, { onDone: () => qc.invalidateQueries({ queryKey: [table] }) });
          if (ref.current) ref.current.value = "";
        }}
      />
      <Button variant="outline" type="button" onClick={() => ref.current?.click()} className="w-full sm:w-auto">
        <Upload className="size-4" /> {label}
      </Button>
    </>
  );
}

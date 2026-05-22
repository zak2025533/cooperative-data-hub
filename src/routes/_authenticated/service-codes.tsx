import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";
import { CATEGORY_OPTIONS } from "@/lib/options";
import { Badge } from "@/components/ui/badge";
import { XlsxImportButton } from "@/components/XlsxImportButton";
import type { FieldMap } from "@/lib/xlsx-import";

const IMPORT_FIELDS: FieldMap[] = [
  { key: "code", label: "الرمز", aliases: ["code", "service code", "كود", "رمز الخدمة"], required: true },
  { key: "name", label: "اسم الخدمة", aliases: ["name", "service name", "الاسم", "الخدمة"], required: true },
  { key: "category", label: "الفئة", aliases: ["category", "type", "النوع", "التصنيف"] },
  { key: "unit_measure", label: "وحدة القياس", aliases: ["unit", "unit measure", "قياس", "الوحدة"] },
  { key: "default_price", label: "السعر الافتراضي", aliases: ["price", "default price", "السعر", "سعر"],
    transform: (v) => { const n = Number(String(v).replace(/,/g, "")); if (isNaN(n)) throw new Error("ليس رقمًا"); return n; } },
  { key: "is_active", label: "الحالة", aliases: ["active", "is_active", "فعّال", "نشط", "status"],
    transform: (v) => {
      const s = String(v).trim().toLowerCase();
      if (["false", "0", "no", "موقوف", "غير نشط", "لا"].includes(s)) return false;
      return true;
    } },
  { key: "notes", label: "ملاحظات", aliases: ["notes", "remarks", "ملاحظة", "ملاحظات"] },
];

export const Route = createFileRoute("/_authenticated/service-codes")({
  component: () => (
    <CrudPage
      title="رموز الخدمات"
      table="service_codes"
      orderBy="code"
      searchable={["code", "name", "category"]}
      defaults={{ is_active: true }}
      headerExtra={<XlsxImportButton table="service_codes" fields={IMPORT_FIELDS} />}
      columns={[
        { key: "code", label: "الرمز", required: true },
        { key: "name", label: "اسم الخدمة", required: true },
        { key: "category", label: "الفئة", type: "select",
          options: [...CATEGORY_OPTIONS, "خدمات إرشادية", "خدمات بيطرية", "خدمات تسويقية", "خدمات تدريبية"] },
        { key: "unit_measure", label: "وحدة القياس", type: "select",
          options: ["قطعة","كجم","لتر","ساعة","يوم","زيارة","دورة","حصة","أخرى"] },
        { key: "default_price", label: "السعر الافتراضي", type: "number", format: fmtMoney },
        { key: "is_active", label: "الحالة", type: "select", options: ["true", "false"],
          format: (v) => <Badge variant={v ? "default" : "secondary"}>{v ? "فعّال" : "موقوف"}</Badge> },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
      onBeforeSave={(row) => ({
        ...row,
        is_active: row.is_active === "false" ? false : !!row.is_active,
      })}
    />
  ),
});

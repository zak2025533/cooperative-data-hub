import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";
import { UNIT_OPTIONS, CATEGORY_OPTIONS } from "@/lib/options";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/service-codes")({
  component: () => (
    <CrudPage
      title="رموز الخدمات"
      table="service_codes"
      orderBy="code"
      searchable={["code", "name", "category"]}
      defaults={{ is_active: true }}
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

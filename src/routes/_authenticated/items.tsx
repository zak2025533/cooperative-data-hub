import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtNumber, fmtMoney } from "@/components/CrudPage";
import { CATEGORY_OPTIONS } from "@/lib/options";

export const Route = createFileRoute("/_authenticated/items")({
  component: () => (
    <CrudPage
      title="أصناف المخزون"
      table="items"
      orderBy="name"
      searchable={["name", "code", "category"]}
      columns={[
        { key: "code", label: "الكود" },
        { key: "name", label: "اسم الصنف", required: true },
        { key: "category", label: "الفئة", type: "select", options: CATEGORY_OPTIONS },
        { key: "unit_measure", label: "وحدة القياس" },
        { key: "unit_name", label: "الوحدة التشغيلية" },
        { key: "cost_price", label: "سعر التكلفة", type: "number", format: fmtMoney },
        { key: "sale_price", label: "سعر البيع", type: "number", format: fmtMoney },
        { key: "opening_qty", label: "رصيد افتتاحي", type: "number", format: fmtNumber },
        { key: "current_qty", label: "الرصيد الحالي", type: "number", format: fmtNumber },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});

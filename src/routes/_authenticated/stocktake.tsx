import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtNumber } from "@/components/CrudPage";
import { UNIT_OPTIONS } from "@/lib/options";

export const Route = createFileRoute("/_authenticated/stocktake")({
  component: () => (
    <CrudPage
      title="الجرد"
      table="stocktakes"
      orderBy="stocktake_date"
      searchable={["item_name", "unit_name"]}
      onBeforeSave={(row) => ({
        ...row,
        variance: Number(row.actual_qty || 0) - Number(row.system_qty || 0),
      })}
      columns={[
        { key: "stocktake_date", label: "تاريخ الجرد", type: "date", required: true },
        { key: "unit_name", label: "الوحدة", type: "select", options: UNIT_OPTIONS },
        { key: "item_name", label: "الصنف", required: true },
        { key: "system_qty", label: "كمية النظام", type: "number", format: fmtNumber },
        { key: "actual_qty", label: "الكمية الفعلية", type: "number", format: fmtNumber },
        { key: "variance", label: "الفرق", type: "number", format: fmtNumber },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});

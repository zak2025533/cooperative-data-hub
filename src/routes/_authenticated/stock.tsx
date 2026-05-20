import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtNumber, fmtMoney } from "@/components/CrudPage";
import { UNIT_OPTIONS } from "@/lib/options";

export const Route = createFileRoute("/_authenticated/stock")({
  component: () => (
    <CrudPage
      title="حركات المخزون"
      table="stock_movements"
      orderBy="movement_date"
      searchable={["item_name", "ref_no", "description"]}
      columns={[
        { key: "movement_date", label: "التاريخ", type: "date", required: true },
        { key: "movement_type", label: "نوع الحركة", type: "select", options: ["وارد","صادر","تحويل","تسوية"], required: true },
        { key: "item_name", label: "الصنف", required: true },
        { key: "unit_name", label: "الوحدة التشغيلية", type: "select", options: UNIT_OPTIONS },
        { key: "qty_in", label: "كمية واردة", type: "number", format: fmtNumber },
        { key: "qty_out", label: "كمية صادرة", type: "number", format: fmtNumber },
        { key: "unit_price", label: "سعر الوحدة", type: "number", format: fmtMoney },
        { key: "ref_no", label: "رقم المرجع" },
        { key: "description", label: "البيان", type: "textarea", hideInTable: true },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtNumber, fmtMoney } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/contract-farming")({
  component: () => (
    <CrudPage
      title="الزراعة التعاقدية"
      table="contract_farming"
      orderBy="contract_date"
      searchable={["farmer_name", "crop", "village", "contract_no"]}
      onBeforeSave={(row) => ({
        ...row,
        total_value: Number(row.actual_qty || row.expected_qty || 0) * Number(row.unit_price || 0),
      })}
      columns={[
        { key: "contract_no", label: "رقم العقد" },
        { key: "contract_date", label: "تاريخ العقد", type: "date", required: true },
        { key: "farmer_name", label: "اسم المزارع", required: true },
        { key: "farmer_phone", label: "هاتف المزارع", hideInTable: true },
        { key: "area", label: "المنطقة" },
        { key: "village", label: "القرية", hideInTable: true },
        { key: "crop", label: "المحصول", required: true },
        { key: "season", label: "الموسم", type: "select", options: ["صيفي","شتوي","ربيعي","خريفي"] },
        { key: "land_area", label: "المساحة (لبنة)", type: "number", format: fmtNumber },
        { key: "expected_qty", label: "الكمية المتوقعة", type: "number", format: fmtNumber },
        { key: "actual_qty", label: "الكمية الفعلية", type: "number", format: fmtNumber },
        { key: "unit_price", label: "سعر الوحدة", type: "number", format: fmtMoney },
        { key: "total_value", label: "القيمة الإجمالية", type: "number", format: fmtMoney },
        { key: "status", label: "الحالة", type: "select", options: ["نشط","مكتمل","ملغي","متعثر"] },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});

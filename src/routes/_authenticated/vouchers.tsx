import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/vouchers")({
  component: () => (
    <CrudPage
      title="السندات (قبض / صرف)"
      table="vouchers"
      orderBy="voucher_date"
      searchable={["voucher_no", "party_name", "description"]}
      columns={[
        { key: "voucher_no", label: "رقم السند" },
        { key: "voucher_type", label: "النوع", type: "select", options: ["قبض","صرف"], required: true },
        { key: "voucher_date", label: "التاريخ", type: "date", required: true },
        { key: "party_name", label: "الطرف (المستلم/الدافع)", required: true },
        { key: "amount", label: "المبلغ", type: "number", format: fmtMoney, required: true },
        { key: "counter_account", label: "الحساب المقابل" },
        { key: "payment_method", label: "طريقة الدفع", type: "select", options: ["نقدا","شيك","حوالة بنكية","تحويل","أخرى"] },
        { key: "area", label: "المنطقة", hideInTable: true },
        { key: "description", label: "البيان", type: "textarea", hideInTable: true },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";
import { UNIT_OPTIONS } from "@/lib/options";

export const Route = createFileRoute("/_authenticated/invoices")({
  component: () => (
    <CrudPage
      title="الفواتير (بيع / شراء)"
      table="invoices"
      orderBy="invoice_date"
      searchable={["invoice_no", "party_name"]}
      columns={[
        { key: "invoice_no", label: "رقم الفاتورة" },
        { key: "invoice_type", label: "النوع", type: "select", options: ["بيع","شراء","مرتجع بيع","مرتجع شراء"], required: true },
        { key: "invoice_date", label: "التاريخ", type: "date", required: true },
        { key: "party_name", label: "اسم الطرف", required: true },
        { key: "party_phone", label: "هاتف الطرف", hideInTable: true },
        { key: "unit_name", label: "الوحدة", type: "select", options: UNIT_OPTIONS },
        { key: "total_amount", label: "الإجمالي", type: "number", format: fmtMoney },
        { key: "discount", label: "الخصم", type: "number", format: fmtMoney, hideInTable: true },
        { key: "net_amount", label: "الصافي", type: "number", format: fmtMoney },
        { key: "paid", label: "المدفوع", type: "number", format: fmtMoney },
        { key: "remaining", label: "المتبقي", type: "number", format: fmtMoney },
        { key: "status", label: "الحالة", type: "select", options: ["جديد","مدفوع","جزئي","ملغي"] },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});

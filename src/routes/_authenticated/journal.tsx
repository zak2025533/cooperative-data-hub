import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/journal")({
  component: () => (
    <CrudPage
      title="القيود اليومية"
      table="journal_entries"
      orderBy="entry_date"
      searchable={["entry_no","description","account_no"]}
      columns={[
        { key: "entry_no", label: "رقم القيد" },
        { key: "entry_date", label: "التاريخ", type: "date", required: true },
        { key: "document_no", label: "رقم المستند" },
        { key: "document_type", label: "نوع المستند" },
        { key: "account_no", label: "رقم الحساب", required: true },
        { key: "description", label: "البيان", type: "textarea" },
        { key: "debit", label: "مدين", type: "number", format: fmtMoney },
        { key: "credit", label: "دائن", type: "number", format: fmtMoney },
        { key: "area", label: "العزلة", hideInTable: true },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});

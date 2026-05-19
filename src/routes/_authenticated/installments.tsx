import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/installments")({ component: InstallmentsPage });

function InstallmentsPage() {
  const { data: loans = [] } = useQuery({
    queryKey: ["loans-options"],
    queryFn: async () => {
      const { data } = await supabase.from("loans").select("id,loan_no,beneficiary_id").order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <CrudPage
      title="الأقساط"
      table="installments"
      orderBy="due_date"
      searchable={["receipt_no","status"]}
      columns={[
        { key: "loan_id", label: "القرض", type: "select", required: true,
          options: loans.map((l: any) => l.id),
          format: (v) => loans.find((l: any) => l.id === v)?.loan_no || "—" },
        { key: "installment_no", label: "رقم القسط", type: "number", required: true },
        { key: "due_date", label: "تاريخ الاستحقاق", type: "date", required: true },
        { key: "amount", label: "قيمة القسط", type: "number", required: true, format: fmtMoney },
        { key: "paid", label: "المدفوع", type: "number", format: fmtMoney },
        { key: "remaining", label: "المتبقي", type: "number", format: fmtMoney },
        { key: "pay_date", label: "تاريخ الدفع", type: "date" },
        { key: "receipt_no", label: "رقم القسيمة", hideInTable: true },
        { key: "status", label: "حالة السداد", type: "select",
          options: ["غير مستحق","مسدد","جزئي","متأخر","متعثر"] },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
      onBeforeSave={(row) => {
        const amt = Number(row.amount || 0);
        const paid = Number(row.paid || 0);
        return { ...row, remaining: amt - paid };
      }}
    />
  );
}

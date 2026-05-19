import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/loans")({ component: LoansPage });

function LoansPage() {
  const { data: bens = [] } = useQuery({
    queryKey: ["beneficiaries-options"],
    queryFn: async () => {
      const { data } = await supabase.from("beneficiaries").select("id,name").order("name");
      return data || [];
    },
  });

  return (
    <CrudPage
      title="القروض"
      table="loans"
      orderBy="created_at"
      searchable={["loan_no","loan_type","status"]}
      columns={[
        { key: "loan_no", label: "رقم القرض" },
        { key: "beneficiary_id", label: "المستفيد", type: "select",
          options: bens.map((b: any) => b.id),
          format: (v) => bens.find((b: any) => b.id === v)?.name || "—" },
        { key: "loan_type", label: "نوع القرض", type: "select",
          options: ["دعم","قرض أبيض","قرض مسترد","تمويل دوار","مساهمة مجتمعية"] },
        { key: "amount", label: "قيمة القرض", type: "number", required: true, format: fmtMoney },
        { key: "delivery_date", label: "تاريخ التسليم", type: "date" },
        { key: "installments_count", label: "عدد الأقساط", type: "number" },
        { key: "installment_amount", label: "قيمة القسط", type: "number", format: fmtMoney },
        { key: "first_installment_date", label: "تاريخ القسط الأول", type: "date", hideInTable: true },
        { key: "total_paid", label: "المدفوع", type: "number", format: fmtMoney },
        { key: "remaining", label: "المتبقي", type: "number", format: fmtMoney },
        { key: "status", label: "الحالة", type: "select", options: ["نشط","منتهي","متعثر","متأخر"] },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
      onBeforeSave={(row) => {
        const amount = Number(row.amount || 0);
        const paid = Number(row.total_paid || 0);
        return { ...row, remaining: amount - paid };
      }}
    />
  );
}

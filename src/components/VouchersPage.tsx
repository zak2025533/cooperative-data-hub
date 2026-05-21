import { CrudPage, fmtMoney } from "@/components/CrudPage";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Check, Ban } from "lucide-react";
import { toast } from "sonner";
import { nextVoucherNo, STATUS_OPTIONS, StatusBadge, VoucherType } from "@/lib/voucher-helpers";

export function VouchersPage({ type, title }: { type: VoucherType; title: string }) {
  const qc = useQueryClient();

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("vouchers").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم تحديث الحالة");
    qc.invalidateQueries({ queryKey: ["vouchers"] });
  }

  return (
    <CrudPage
      title={title}
      table="vouchers"
      orderBy="voucher_date"
      searchable={["voucher_no", "party_name", "description"]}
      filter={{ column: "voucher_type", value: type }}
      defaults={{
        voucher_type: type,
        status: "جديد",
        voucher_date: new Date().toISOString().slice(0, 10),
      }}
      onBeforeSave={async (row) => {
        const payload = { ...row, voucher_type: type };
        if (!payload.voucher_no || String(payload.voucher_no).trim() === "") {
          payload.voucher_no = await nextVoucherNo(type);
        }
        if (!payload.status) payload.status = "جديد";
        return payload;
      }}
      customActions={(row) => (
        <>
          {row.status !== "مدفوع" && (
            <Button variant="ghost" size="icon" title="تأكيد الدفع"
                    onClick={() => setStatus(row.id, "مدفوع")}>
              <Check className="size-4 text-emerald-600" />
            </Button>
          )}
          {row.status !== "ملغي" && (
            <Button variant="ghost" size="icon" title="إلغاء السند"
                    onClick={() => { if (confirm("إلغاء هذا السند؟")) setStatus(row.id, "ملغي"); }}>
              <Ban className="size-4 text-destructive" />
            </Button>
          )}
        </>
      )}
      columns={[
        { key: "voucher_no", label: "رقم السند", readOnly: true, placeholder: "يُولَّد تلقائياً عند الحفظ" },
        { key: "voucher_date", label: "التاريخ", type: "date", required: true },
        { key: "party_name", label: type === "قبض" ? "المستلَم منه" : "المدفوع إليه", required: true },
        { key: "amount", label: "المبلغ", type: "number", format: fmtMoney, required: true },
        {
          key: "status", label: "الحالة", type: "select", options: [...STATUS_OPTIONS],
          format: (v) => <StatusBadge value={v} />,
        },
        { key: "payment_method", label: "طريقة الدفع", type: "select",
          options: ["نقدا", "شيك", "حوالة بنكية", "تحويل", "أخرى"] },
        { key: "counter_account", label: "الحساب المقابل", hideInTable: true },
        { key: "area", label: "المنطقة", hideInTable: true },
        { key: "description", label: "البيان", type: "textarea", hideInTable: true },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
        { key: "voucher_type", label: "النوع", hideInTable: true, hideInForm: true },
      ]}
    />
  );
}

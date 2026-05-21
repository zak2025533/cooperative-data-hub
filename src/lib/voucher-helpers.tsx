import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

export type VoucherType = "قبض" | "صرف";

const PREFIX: Record<VoucherType, string> = {
  "قبض": "REC",
  "صرف": "PAY",
};

export async function nextVoucherNo(type: VoucherType): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `${PREFIX[type]}-${year}-`;
  const { data, error } = await supabase
    .from("vouchers")
    .select("voucher_no")
    .eq("voucher_type", type)
    .like("voucher_no", `${prefix}%`)
    .order("voucher_no", { ascending: false })
    .limit(1);
  if (error) throw error;
  let n = 1;
  if (data && data.length > 0 && data[0].voucher_no) {
    const tail = data[0].voucher_no.split("-").pop();
    const parsed = parseInt(tail || "0", 10);
    if (!Number.isNaN(parsed)) n = parsed + 1;
  }
  return `${prefix}${String(n).padStart(5, "0")}`;
}

export const STATUS_OPTIONS = ["جديد", "مدفوع", "ملغي"] as const;

export function StatusBadge({ value }: { value: string | null | undefined }) {
  const v = value || "جديد";
  const variant: "secondary" | "default" | "destructive" | "outline" =
    v === "مدفوع" ? "default" : v === "ملغي" ? "destructive" : "secondary";
  return <Badge variant={variant}>{v}</Badge>;
}

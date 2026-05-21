import { createFileRoute } from "@tanstack/react-router";
import { VouchersPage } from "@/components/VouchersPage";

export const Route = createFileRoute("/_authenticated/vouchers/payments")({
  component: () => <VouchersPage type="صرف" title="سندات الصرف" />,
});

import { createFileRoute } from "@tanstack/react-router";
import { VouchersPage } from "@/components/VouchersPage";

export const Route = createFileRoute("/_authenticated/vouchers/receipts")({
  component: () => <VouchersPage type="قبض" title="سندات القبض" />,
});

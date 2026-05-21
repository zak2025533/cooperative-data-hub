ALTER TABLE public.vouchers ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'جديد';
CREATE INDEX IF NOT EXISTS idx_vouchers_type_no ON public.vouchers (voucher_type, voucher_no);
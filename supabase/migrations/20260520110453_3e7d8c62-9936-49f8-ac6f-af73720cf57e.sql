
-- Inventory items
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT,
  name TEXT NOT NULL,
  category TEXT,
  unit_measure TEXT,
  unit_name TEXT,
  cost_price NUMERIC DEFAULT 0,
  sale_price NUMERIC DEFAULT 0,
  opening_qty NUMERIC DEFAULT 0,
  current_qty NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
CREATE POLICY auth_select_items ON public.items FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_items ON public.items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_items ON public.items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_items ON public.items FOR DELETE TO authenticated USING (true);

-- Stock movements
CREATE TABLE public.stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  movement_type TEXT,
  item_id UUID,
  item_name TEXT,
  unit_name TEXT,
  qty_in NUMERIC DEFAULT 0,
  qty_out NUMERIC DEFAULT 0,
  unit_price NUMERIC DEFAULT 0,
  ref_no TEXT,
  description TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY auth_select_stock_movements ON public.stock_movements FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_stock_movements ON public.stock_movements FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_stock_movements ON public.stock_movements FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_stock_movements ON public.stock_movements FOR DELETE TO authenticated USING (true);

-- Invoices (sale/purchase)
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no TEXT,
  invoice_type TEXT NOT NULL DEFAULT 'بيع',
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  party_name TEXT,
  party_phone TEXT,
  unit_name TEXT,
  total_amount NUMERIC DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  net_amount NUMERIC DEFAULT 0,
  paid NUMERIC DEFAULT 0,
  remaining NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'جديد',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY auth_select_invoices ON public.invoices FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_invoices ON public.invoices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_invoices ON public.invoices FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_invoices ON public.invoices FOR DELETE TO authenticated USING (true);

-- Invoice items
CREATE TABLE public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID,
  item_id UUID,
  item_name TEXT,
  qty NUMERIC DEFAULT 0,
  unit_price NUMERIC DEFAULT 0,
  total NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY auth_select_invoice_items ON public.invoice_items FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_invoice_items ON public.invoice_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_invoice_items ON public.invoice_items FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_invoice_items ON public.invoice_items FOR DELETE TO authenticated USING (true);

-- Vouchers (receipt/payment)
CREATE TABLE public.vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_no TEXT,
  voucher_type TEXT NOT NULL DEFAULT 'قبض',
  voucher_date DATE NOT NULL DEFAULT CURRENT_DATE,
  party_name TEXT,
  amount NUMERIC DEFAULT 0,
  counter_account TEXT,
  payment_method TEXT,
  description TEXT,
  area TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;
CREATE POLICY auth_select_vouchers ON public.vouchers FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_vouchers ON public.vouchers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_vouchers ON public.vouchers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_vouchers ON public.vouchers FOR DELETE TO authenticated USING (true);

-- Stocktakes
CREATE TABLE public.stocktakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stocktake_date DATE NOT NULL DEFAULT CURRENT_DATE,
  unit_name TEXT,
  item_id UUID,
  item_name TEXT,
  system_qty NUMERIC DEFAULT 0,
  actual_qty NUMERIC DEFAULT 0,
  variance NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stocktakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY auth_select_stocktakes ON public.stocktakes FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_stocktakes ON public.stocktakes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_stocktakes ON public.stocktakes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_stocktakes ON public.stocktakes FOR DELETE TO authenticated USING (true);

-- Contract farming
CREATE TABLE public.contract_farming (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_no TEXT,
  contract_date DATE NOT NULL DEFAULT CURRENT_DATE,
  farmer_name TEXT NOT NULL,
  farmer_phone TEXT,
  area TEXT,
  village TEXT,
  crop TEXT,
  season TEXT,
  land_area NUMERIC DEFAULT 0,
  expected_qty NUMERIC DEFAULT 0,
  actual_qty NUMERIC DEFAULT 0,
  unit_price NUMERIC DEFAULT 0,
  total_value NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'نشط',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contract_farming ENABLE ROW LEVEL SECURITY;
CREATE POLICY auth_select_contract_farming ON public.contract_farming FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_contract_farming ON public.contract_farming FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_contract_farming ON public.contract_farming FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_contract_farming ON public.contract_farming FOR DELETE TO authenticated USING (true);

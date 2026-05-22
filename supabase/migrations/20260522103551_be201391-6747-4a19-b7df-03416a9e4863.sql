
CREATE TABLE public.custodies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  custody_no text,
  custody_date date NOT NULL DEFAULT CURRENT_DATE,
  holder_name text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  purpose text,
  settled_amount numeric DEFAULT 0,
  remaining numeric DEFAULT 0,
  status text NOT NULL DEFAULT 'نشطة',
  unit_name text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.custodies ENABLE ROW LEVEL SECURITY;
CREATE POLICY auth_select_custodies ON public.custodies FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_custodies ON public.custodies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_custodies ON public.custodies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_custodies ON public.custodies FOR DELETE TO authenticated USING (true);

CREATE TABLE public.procedures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  procedure_no text,
  procedure_date date NOT NULL DEFAULT CURRENT_DATE,
  procedure_type text,
  title text NOT NULL,
  requester text,
  assignee text,
  priority text DEFAULT 'عادية',
  status text NOT NULL DEFAULT 'جديد',
  due_date date,
  description text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;
CREATE POLICY auth_select_procedures ON public.procedures FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_procedures ON public.procedures FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_procedures ON public.procedures FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_procedures ON public.procedures FOR DELETE TO authenticated USING (true);

CREATE TABLE public.service_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  category text,
  unit_measure text,
  default_price numeric DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.service_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY auth_select_service_codes ON public.service_codes FOR SELECT TO authenticated USING (true);
CREATE POLICY auth_insert_service_codes ON public.service_codes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_service_codes ON public.service_codes FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_service_codes ON public.service_codes FOR DELETE TO authenticated USING (true);

CREATE INDEX idx_service_codes_category ON public.service_codes (category);
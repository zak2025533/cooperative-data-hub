
-- المناطق/العزل
CREATE TABLE public.areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- الوحدات التنظيمية
CREATE TABLE public.units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  manager_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- المستفيدين
CREATE TABLE public.beneficiaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE,
  name TEXT NOT NULL,
  area TEXT,
  village TEXT,
  phone TEXT,
  activity_type TEXT,
  value_chain TEXT,
  national_id TEXT,
  guarantor1_name TEXT,
  guarantor1_phone TEXT,
  guarantor2_name TEXT,
  guarantor2_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- المشاريع والتمويل
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE,
  name TEXT NOT NULL,
  funder TEXT,
  funding_type TEXT,
  start_date DATE,
  end_date DATE,
  total_amount NUMERIC(15,2) DEFAULT 0,
  status TEXT DEFAULT 'نشط',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- دليل الحسابات
CREATE TABLE public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_no TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  nature TEXT NOT NULL,
  level INT DEFAULT 1,
  parent_no TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- القروض
CREATE TABLE public.loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_no TEXT UNIQUE,
  beneficiary_id UUID REFERENCES public.beneficiaries(id) ON DELETE RESTRICT,
  loan_type TEXT,
  amount NUMERIC(15,2) NOT NULL DEFAULT 0,
  delivery_date DATE,
  installments_count INT DEFAULT 1,
  installment_amount NUMERIC(15,2) DEFAULT 0,
  first_installment_date DATE,
  total_paid NUMERIC(15,2) DEFAULT 0,
  remaining NUMERIC(15,2) DEFAULT 0,
  status TEXT DEFAULT 'نشط',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- الأقساط
CREATE TABLE public.installments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID REFERENCES public.loans(id) ON DELETE CASCADE,
  installment_no INT NOT NULL,
  due_date DATE NOT NULL,
  amount NUMERIC(15,2) NOT NULL DEFAULT 0,
  paid NUMERIC(15,2) DEFAULT 0,
  remaining NUMERIC(15,2) DEFAULT 0,
  pay_date DATE,
  receipt_no TEXT,
  status TEXT DEFAULT 'غير مستحق',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- القيود اليومية
CREATE TABLE public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_no TEXT,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  document_no TEXT,
  document_type TEXT,
  description TEXT,
  account_no TEXT,
  debit NUMERIC(15,2) DEFAULT 0,
  credit NUMERIC(15,2) DEFAULT 0,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  beneficiary_id UUID REFERENCES public.beneficiaries(id) ON DELETE SET NULL,
  area TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- حركات الصندوق
CREATE TABLE public.cash_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  voucher_no TEXT,
  operation_type TEXT,
  description TEXT,
  amount_in NUMERIC(15,2) DEFAULT 0,
  amount_out NUMERIC(15,2) DEFAULT 0,
  counter_account TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  beneficiary_id UUID REFERENCES public.beneficiaries(id) ON DELETE SET NULL,
  area TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- حركات البنك
CREATE TABLE public.bank_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  ref_no TEXT,
  operation_type TEXT,
  bank_account TEXT,
  description TEXT,
  deposit NUMERIC(15,2) DEFAULT 0,
  withdrawal NUMERIC(15,2) DEFAULT 0,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- العضوية والأسهم
CREATE TABLE public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_no TEXT UNIQUE,
  member_name TEXT NOT NULL,
  area TEXT,
  join_date DATE,
  shares_count INT DEFAULT 0,
  share_value NUMERIC(15,2) DEFAULT 0,
  total_value NUMERIC(15,2) DEFAULT 0,
  phone TEXT,
  status TEXT DEFAULT 'نشط',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- تفعيل RLS
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cash_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- سياسات: أي مستخدم مسجل يمكنه كل شيء
DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY['areas','units','beneficiaries','projects','accounts','loans','installments','journal_entries','cash_movements','bank_movements','memberships'])
  LOOP
    EXECUTE format('CREATE POLICY "auth_select_%I" ON public.%I FOR SELECT TO authenticated USING (true)', t, t);
    EXECUTE format('CREATE POLICY "auth_insert_%I" ON public.%I FOR INSERT TO authenticated WITH CHECK (true)', t, t);
    EXECUTE format('CREATE POLICY "auth_update_%I" ON public.%I FOR UPDATE TO authenticated USING (true) WITH CHECK (true)', t, t);
    EXECUTE format('CREATE POLICY "auth_delete_%I" ON public.%I FOR DELETE TO authenticated USING (true)', t, t);
  END LOOP;
END $$;

-- بيانات أولية: العزل
INSERT INTO public.areas (name) VALUES
('حقين'),('بني وائل'),('حليمة'),('بني الفخر'),('بني سليمان'),('المزارقة'),
('الأجعوم'),('سيدم'),('الشعاور'),('يريس'),('الأصيور'),('الأبعون'),
('الإسلوم'),('الأحكوم'),('المجاهدة'),('جبل حريم'),('بني أسعد'),
('المعيضة'),('الشرقي');

-- بيانات أولية: الوحدات
INSERT INTO public.units (name) VALUES
('وحدة البن'),('وحدة البذور'),('وحدة المشاتل'),('وحدة العسل'),
('وحدة الإنتاج والمباني'),('وحدة الثروة الحيوانية'),('وحدة التسويق'),
('وحدة الزراعة التعاقدية'),('وحدة الإقراض'),('وحدة الري'),
('وحدة الأعلاف'),('وحدة التمكين الاقتصادي'),('الإدارة التنفيذية');

-- بيانات أولية: دليل الحسابات
INSERT INTO public.accounts (account_no, name, account_type, nature, level, parent_no) VALUES
('1000','الأصول','أصول','مدين',1,NULL),
('1100','الصندوق','أصول','مدين',2,'1000'),
('1200','البنوك','أصول','مدين',2,'1000'),
('1300','المدينون','أصول','مدين',2,'1000'),
('1400','القروض الممنوحة','أصول','مدين',2,'1000'),
('1500','المخزون','أصول','مدين',2,'1000'),
('2000','الخصوم','خصوم','دائن',1,NULL),
('2100','الدائنون','خصوم','دائن',2,'2000'),
('3000','حقوق الملكية','حقوق ملكية','دائن',1,NULL),
('3100','رأس المال (الأسهم)','حقوق ملكية','دائن',2,'3000'),
('4000','الإيرادات','إيرادات','دائن',1,NULL),
('5000','المصروفات','مصروفات','مدين',1,NULL);

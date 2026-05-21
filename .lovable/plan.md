# سندات القبض والصرف — صفحات مفصلة مع ترقيم تلقائي وحالة

## الهدف
فصل سندات القبض عن سندات الصرف في صفحتين مخصصتين، مع ترقيم تلقائي عند الإنشاء وإدارة حالة السند (جديد / مدفوع / ملغي).

## التغييرات

### 1. قاعدة البيانات (migration)
- إضافة عمود `status` إلى جدول `vouchers` (نص، افتراضي `'جديد'`).
- إضافة فهرس على `(voucher_type, voucher_no)` لتسريع توليد الترقيم.
- (الأعمدة الأخرى موجودة مسبقاً: voucher_no, voucher_type, voucher_date, party_name, amount, counter_account, payment_method, description, area, notes).

### 2. صفحات جديدة
- `src/routes/_authenticated/vouchers.receipts.tsx` → سندات القبض (`voucher_type = 'قبض'`).
- `src/routes/_authenticated/vouchers.payments.tsx` → سندات الصرف (`voucher_type = 'صرف'`).
- الإبقاء على `vouchers.tsx` كصفحة جامعة (عرض الكل) أو تحويلها إلى صفحة فهرس بطاقات للنوعين.

### 3. الترقيم التلقائي
عند فتح نموذج "إضافة جديد":
- جلب أعلى `voucher_no` للنوع الحالي من Supabase.
- توليد الرقم بالصيغة: `REC-2026-00045` للقبض و `PAY-2026-00045` للصرف.
- الحقل يظهر للعرض فقط (read-only) ويمكن تجاوزه يدوياً إذا لزم.

### 4. حالة السند
- خيارات: `جديد`، `مدفوع`، `ملغي`.
- عرض الحالة في الجدول كشارة ملونة (Badge): رمادي/أخضر/أحمر.
- زر سريع في كل صف: "تأكيد الدفع" → يحدّث الحالة إلى `مدفوع`، "إلغاء" → `ملغي`.
- عند الحفظ الأول تكون الحالة `جديد` تلقائياً.

### 5. القائمة الرئيسية والشريط الجانبي
- تحديث `src/routes/_authenticated/index.tsx` و `AppLayout.tsx` لإظهار رابطين منفصلين: "سندات القبض" و"سندات الصرف".

## تفاصيل تقنية
- استخدام `CrudPage` الحالي مع `defaults` لتمرير `voucher_type` و`status` الأولي، و`onBeforeSave` لتوليد الرقم.
- توسيع `CrudPage` بإضافة دعم `customActions?: (row) => ReactNode` لإظهار أزرار "تأكيد/إلغاء" في الجدول (تغيير صغير وغير كاسر).
- استخدام مكوّن `Badge` من shadcn لعرض الحالة.

## ملفات متأثرة
- migration جديد (إضافة `status` + فهرس).
- إنشاء: `vouchers.receipts.tsx`، `vouchers.payments.tsx`.
- تعديل: `CrudPage.tsx` (دعم actions + badge formatting)، `AppLayout.tsx`، `_authenticated/index.tsx`.

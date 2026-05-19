import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sprout } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
        toast.success("تم إنشاء الحساب. تحقق من بريدك لتفعيل الحساب.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("مرحباً بك");
        navigate({ to: "/" });
      }
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-4 pattern-grain"
         style={{ background: "linear-gradient(135deg, oklch(0.42 0.12 150 / 0.08), oklch(0.72 0.14 75 / 0.08))" }}>
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="size-14 rounded-2xl bg-primary text-primary-foreground grid place-items-center mb-3">
            <Sprout className="size-7" />
          </div>
          <h1 className="text-xl font-bold">جمعية حزم العدين التعاونية الزراعية</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "تسجيل الدخول للنظام" : "إنشاء حساب جديد"}
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" required value={email}
                   onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div>
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" type="password" required minLength={6} value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   autoComplete={mode === "login" ? "current-password" : "new-password"} />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "..." : mode === "login" ? "دخول" : "إنشاء الحساب"}
          </Button>
        </form>
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 text-sm text-muted-foreground hover:text-primary w-full text-center"
        >
          {mode === "login" ? "ليس لديك حساب؟ إنشاء حساب" : "لديك حساب؟ تسجيل الدخول"}
        </button>
      </Card>
    </div>
  );
}

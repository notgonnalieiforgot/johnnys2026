import Image from "next/image";
import { Lock } from "lucide-react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Staff Sign In",
  robots: { index: false, follow: false },
};

export default function StaffLoginPage() {
  return (
    <div className="relative min-h-screen grid place-items-center bg-ink-950 px-6 grain">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.14),transparent_60%)] pointer-events-none"
      />

      <div className="relative w-full max-w-md clay-lg p-9 sm:p-11">
        <Image
          src="/johnnys-logo.png"
          alt="Johnny's"
          width={999}
          height={461}
          priority
          className="h-12 w-auto mx-auto drop-shadow-[0_4px_22px_rgba(220,38,38,0.4)]"
        />

        <div className="mt-7 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson-500/10 border border-crimson-500/25 text-crimson-300">
          <Lock className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase tracking-[0.24em]">Staff Sign In</span>
        </div>

        <h1 className="mt-5 font-display text-3xl tracking-tight">Welcome back.</h1>
        <p className="mt-2 text-sm text-bone/55">
          Use your staff credentials to access the dashboard.
        </p>

        <LoginForm />

        <p className="mt-6 text-[11px] text-bone/35 leading-relaxed">
          Forgot your credentials? Ask a manager. Sessions expire after 8 hours of inactivity.
        </p>
      </div>
    </div>
  );
}

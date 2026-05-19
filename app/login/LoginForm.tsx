"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { signIn, type SignInResult } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action] = useActionState<SignInResult | null, FormData>(signIn, null);

  return (
    <form action={action} className="mt-7 space-y-4">
      <label className="block">
        <span className="block text-[11px] uppercase tracking-[0.24em] text-bone/50 mb-2">
          Username
        </span>
        <input
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="manager"
          className="w-full rounded-xl bg-ink-900/70 border border-white/8 px-4 py-3 text-bone placeholder:text-bone/30
                     focus:outline-none focus:border-crimson-400/60 focus:ring-4 focus:ring-crimson-500/10
                     transition-all duration-200"
        />
      </label>

      <label className="block">
        <span className="block text-[11px] uppercase tracking-[0.24em] text-bone/50 mb-2">
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="w-full rounded-xl bg-ink-900/70 border border-white/8 px-4 py-3 text-bone placeholder:text-bone/30
                     focus:outline-none focus:border-crimson-400/60 focus:ring-4 focus:ring-crimson-500/10
                     transition-all duration-200"
        />
      </label>

      {state && !state.ok && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-crimson-500/30 bg-crimson-500/10 px-3.5 py-3 text-sm text-crimson-200"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full justify-center group disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Signing in…
        </>
      ) : (
        <>
          Sign in
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}

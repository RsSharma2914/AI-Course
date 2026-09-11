// app/auth/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { login, signup } from './actions';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = isSignUp ? await signup(form) : await login(form);
      if (res && 'error' in res && res.error) {
        setMsg({ text: res.error, error: true });
      } else if (res && 'success' in res && res.success) {
        setMsg({ text: res.success, error: false });
      }
    });
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Left Column: Branding & Value Proposition */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-12 lg:flex border-r border-slate-800/80">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/30">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SkillForge Academy</span>
        </div>

        {/* Value Prop Copy */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-sm">
            <span>✨ 100% Free Career Advancement</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Learn high-income tech skills with confidence.
          </h1>
          <p className="text-base leading-relaxed text-slate-400">
            Access on-demand courses, interactive projects, and step-by-step career roadmaps—all directly linked to your personal learning dashboard.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">25+</div>
              <div className="text-xs text-slate-400 mt-0.5">Comprehensive Courses</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">Self-Paced</div>
              <div className="text-xs text-slate-400 mt-0.5">Lifetime Project Access</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500">
          © 2026 SkillForge Systems. All rights reserved.
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Brand View */}
          <div className="flex items-center gap-2 lg:hidden mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-bold text-white text-lg">SkillForge</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {isSignUp
                ? 'Join thousands of developers building their portfolio today.'
                : 'Enter your credentials to continue your lessons.'}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setMsg(null); }}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                !isSignUp
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setMsg(null); }}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                isSignUp
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Feedback Messages */}
          {msg && (
            <div
              className={`flex items-center gap-2 rounded-xl p-3.5 text-xs font-medium border ${
                msg.error
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}
            >
              <span>{msg.error ? '⚠️' : '✅'}</span>
              <span>{msg.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Password
                </label>
              </div>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            >
              {isPending && (
                <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {isPending ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
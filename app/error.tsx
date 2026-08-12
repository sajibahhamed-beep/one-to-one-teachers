"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-[#0D2C4A] p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-100 shadow-xs">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-[#0D2C4A]">কিছু একটা সমস্যা হয়েছে</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            An unexpected error occurred while rendering this page. Please try refreshing or return to the homepage.
          </p>
          {error?.digest && (
            <p className="text-[10px] font-mono text-slate-400 bg-slate-50 p-2 rounded-xl border border-slate-100">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#00A896] text-white font-bold text-xs hover:bg-[#008075] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>আবার চেষ্টা করুন (Retry)</span>
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 text-[#0D2C4A] font-bold text-xs hover:bg-slate-200 transition-all text-center"
          >
            <Home className="w-4 h-4" />
            <span>মূল পাতা (Home)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

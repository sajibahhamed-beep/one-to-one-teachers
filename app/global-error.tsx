"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <html lang="bn">
      <body className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-[#0D2C4A] p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-100 shadow-xs">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#0D2C4A]">সার্ভার ত্রুটি (Application Error)</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              An unexpected system error occurred. Please click below to reload the application.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#00A896] text-white font-bold text-xs hover:bg-[#008075] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>রিলোড করুন (Reload Application)</span>
          </button>
        </div>
      </body>
    </html>
  );
}

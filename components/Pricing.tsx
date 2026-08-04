"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Check, AlertCircle, Sparkles, ArrowRight } from "lucide-react";

interface PricingProps {
  onOpenEnroll: () => void;
}

export default function Pricing({ onOpenEnroll }: PricingProps) {
  const { lang } = useLanguage();
  const [fee, setFee] = useState<number>(1500);

  return (
    <section id="pricing" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00A896] uppercase mb-3 font-bold bg-[#00A896]/10 px-4 py-1.5 rounded-full border border-[#00A896]/20">
            {lang === "bn" ? "প্রাইসিং ও ফি প্যাকেজ" : "Pricing & Fee Packages"}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.65] mb-4">
            {lang === "bn" ? "আপনার জন্য উপযুক্ত প্ল্যান বেছে নিন" : "Choose the Plan That Fits You"}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl mx-auto">
            {lang === "bn"
              ? "কোনো গোপন ফি বা হিডেন চার্জ নেই। প্রতিটি প্ল্যানে বিষয়ভিত্তিক ১-অন-১ শিক্ষক সুনিশ্চিত।"
              : "No hidden charges. Subject wise 1-on-1 teacher guaranteed with every plan."}
          </p>
        </div>

        {/* 2 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* PACKAGE 1: FREE PACKAGE (Currently Unavailable) */}
          <div className="bg-[#F1F5F9] border border-slate-300 rounded-3xl p-8 flex flex-col justify-between relative shadow-sm opacity-90">
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-extrabold text-slate-600 bg-slate-200 px-3.5 py-1 rounded-full border border-slate-300">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === "bn" ? "currently unavailable now" : "currently unavailable now"}</span>
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {lang === "bn" ? "স্পন্সরড ট্র্যাক" : "Sponsored Track"}
                </span>
              </div>

              <h3 className="font-sans text-2xl font-bold text-slate-700 mb-2">
                {lang === "bn" ? "ফ্রি স্পন্সরড প্যাকেজ" : "Free Sponsored Package"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                {lang === "bn"
                  ? "নিম্ন আয়ের অসচ্ছল পরিবারের শিক্ষার্থীদের জন্য ডোনার-ফান্ডেড ১০০% ফ্রি বিষয়ভিত্তিক ১-অন-১ শিক্ষক।"
                  : "100% Donor-funded free subject wise 1-on-1 teachers for low-income background learners."}
              </p>

              {/* Price Display */}
              <div className="bg-slate-200/60 rounded-2xl p-4 text-center mb-6 border border-slate-300/60">
                <div className="text-4xl font-extrabold text-slate-700">
                  ৳০{" "}
                  <span className="text-xs font-normal text-slate-500 font-sans">
                    /{lang === "bn" ? "মাস" : "month"}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 block mt-1">
                  {lang === "bn" ? "(নতুন ডোনার রেজিস্ট্রেশন মুলতুবি)" : "(Donor allocation pending)"}
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8 text-xs sm:text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="font-bold text-slate-800">
                    {lang === "bn" ? "বিষয়ভিত্তিক ১-অন-১ শিক্ষক (Subject Wise Teacher)" : "Subject Wise 1-on-1 Teacher"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{lang === "bn" ? "সাপ্তাহিক ১-অন-১ লাইভ ক্লাস সেশন" : "Weekly Live 1-on-1 Class Sessions"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{lang === "bn" ? "অভিভাবকদের নিয়মিত প্রোগ্রেস নোট" : "Monthly Progress Notes"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{lang === "bn" ? "অডিও-অনলি লো ডাটা সাপোর্ট" : "Low Data Audio-Only Support"}</span>
                </div>
              </div>
            </div>

            {/* Disabled Button */}
            <button
              disabled
              className="w-full py-4 rounded-full bg-slate-300 text-slate-600 font-extrabold text-sm cursor-not-allowed flex items-center justify-center gap-2 border border-slate-400/40"
            >
              <span>{lang === "bn" ? "currently unavailable now" : "currently unavailable now"}</span>
            </button>
          </div>

          {/* PACKAGE 2: CURRENT SLIDING SCALE PACKAGE (Subject Wise Teacher Feature) */}
          <div className="bg-white border-2 border-[#00A896] rounded-3xl p-8 flex flex-col justify-between relative shadow-xl">
            {/* Top Popular Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00A896] text-white px-4 py-1 rounded-full text-xs font-extrabold uppercase font-mono tracking-wider shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{lang === "bn" ? "জনপ্রিয় প্ল্যান" : "Most Popular"}</span>
            </div>

            <div>
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-6 pt-2">
                <span className="font-mono text-xs uppercase font-extrabold text-[#00A896] bg-[#00A896]/10 px-3.5 py-1 rounded-full border border-[#00A896]/20">
                  {lang === "bn" ? "সাধ্যমত ফি প্ল্যান" : "Sliding Scale Plan"}
                </span>
                <span className="text-xs text-[#00A896] font-mono font-bold">
                  {lang === "bn" ? "ইনস্ট্যান্ট টিচার ম্যাচিং" : "Instant Teacher Matching"}
                </span>
              </div>

              <h3 className="font-sans text-2xl font-extrabold text-[#0D2C4A] mb-2">
                {lang === "bn" ? "স্ট্যান্ডার্ড ১-অন-১ টিচার প্যাকেজ" : "Standard 1-on-1 Teacher Package"}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] mb-6 leading-relaxed">
                {lang === "bn"
                  ? "আপনার পরিবারের সাধ্য অনুযায়ী ফি নির্ধারণ করুন (প্রতি ধাপে ৫০ টাকা পরিবর্তন, সর্বোচ্চ ৳১০,০০০)।"
                  : "Set fee according to family budget (৳50 step distance, maximum limit ৳10,000)."}
              </p>

              {/* Dynamic Price Display */}
              <div className="bg-[#E6F4F3] rounded-2xl p-4 text-center mb-6 border border-[#00A896]/20">
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0D2C4A]">
                  ৳{fee.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-[#64748B] font-sans">
                    /{lang === "bn" ? "মাস" : "month"}
                  </span>
                </div>
                <p className="text-xs text-[#00A896] font-mono font-bold mt-1">
                  {lang === "bn" ? "আপনার ফি পরিবর্তন করুন (৫০ টাকা প্রতি স্টেপ, সর্বোচ্চ ৳১০,০০০)" : "Change fee (৳50 per step, max ৳10,000)"}
                </p>
              </div>

              {/* Interactive Fee Slider (Max 10,000, Step 50 Taka) */}
              <div className="space-y-3 mb-8 bg-[#F8FAFC] p-4 rounded-2xl border border-[#0D2C4A]/10">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-[#0D2C4A]">
                  <span>{lang === "bn" ? "ফি সিলেক্টর (৫০ টাকা ধাপে):" : "Fee Selector (৳50 step):"}</span>
                  <span className="text-[#00A896]">৳{fee.toLocaleString()} / {lang === "bn" ? "মাস" : "mo"}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={fee}
                  onChange={(e) => setFee(Number(e.target.value))}
                  className="w-full h-3 bg-[#0D2C4A]/10 rounded-lg appearance-none cursor-pointer accent-[#00A896]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
                  <span>৳৫০ ({lang === "bn" ? "সর্বনিম্ন" : "Min"})</span>
                  <span>৳৫,০০০ ({lang === "bn" ? "গড়" : "Avg"})</span>
                  <span>৳১০,০০০ ({lang === "bn" ? "সর্বোচ্চ" : "Max Limit"})</span>
                </div>
              </div>

              {/* Features List with "Subject Wise Teacher" */}
              <div className="space-y-3 mb-8 text-xs sm:text-sm text-[#0D2C4A] font-medium">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                  <span className="font-extrabold text-[#00A896]">
                    {lang === "bn" ? "বিষয়ভিত্তিক ১-অন-১ শিক্ষক (Subject Wise Teacher)" : "Subject Wise 1-on-1 Teacher (BUET/DU/Medical)"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                  <span>{lang === "bn" ? "সপ্তাহে ২-৪ দিন ১-অন-১ লাইভ ক্লাস" : "2-4 Live 1-on-1 Classes Per Week"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                  <span>{lang === "bn" ? "অভিভাবকদের নিয়মিত অগ্রগতি আপডেট" : "Regular Progress Updates to Parents"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                  <span>{lang === "bn" ? "২জি স্লো নেটেও অডিও টিচিং মোড" : "Low Bandwidth Audio-Only Mode Included"}</span>
                </div>
              </div>
            </div>

            {/* Active CTA Button */}
            <button
              onClick={onOpenEnroll}
              className="w-full py-4 rounded-full bg-[#00A896] text-white font-extrabold text-sm hover:bg-[#008075] shadow-lg shadow-[#00A896]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === "bn" ? "আমার শিক্ষক স্পেসিফাই করুন" : "Specify My Teacher"}</span>
              <ArrowRight className="w-4.5 h-4.5 text-white" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

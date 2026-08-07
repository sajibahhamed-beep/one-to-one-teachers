"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Check, AlertCircle, Calendar, Clock, Star } from "lucide-react";

interface PricingProps {
  onOpenEnroll: (planName?: string, fee?: number) => void;
}

export default function Pricing({ onOpenEnroll }: PricingProps) {
  const { lang } = useLanguage();

  // Interactive selectors state
  const [selectedDaysIndex, setSelectedDaysIndex] = useState<number>(2); // Default: 3 days
  const [selectedDurationIndex, setSelectedDurationIndex] = useState<number>(2); // Default: 1 hour

  const daysBn = ["১ দিন", "২ দিন", "৩ দিন", "৪ দিন", "৫ দিন", "৬ দিন", "৭ দিন"];
  const daysEn = ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days", "6 Days", "7 Days"];

  const durationBn = ["৩০ মিনিট", "৪৫ মিনিট", "১ ঘণ্টা", "দেড় ঘণ্টা", "২ ঘণ্টা"];
  const durationEn = ["30 Min", "45 Min", "1 Hour", "1.5 Hours", "2 Hours"];

  const currentDaysList = lang === "bn" ? daysBn : daysEn;
  const currentDurationList = lang === "bn" ? durationBn : durationEn;

  return (
    <section id="pricing" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.35] mb-4">
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
          <div className="bg-[#F1F5F9] border border-slate-300 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative shadow-sm opacity-90">
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
              className="w-full py-4 rounded-2xl bg-slate-300 text-slate-600 font-extrabold text-sm cursor-not-allowed flex items-center justify-center gap-2 border border-slate-400/40"
            >
              <span>{lang === "bn" ? "currently unavailable now" : "currently unavailable now"}</span>
            </button>
          </div>

          {/* PACKAGE 2: ACTIVE CUSTOM PREMIUM PACKAGE */}
          <div className="bg-white border-2 border-[#EAB308] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between relative shadow-xl hover:shadow-2xl transition-all duration-300">
            <div>
              {/* Top Premium Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#92400E] bg-[#FEF3C7] px-4 py-1.5 rounded-full border border-[#FDE68A]">
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span>{lang === "bn" ? "প্রিমিয়াম" : "Premium"}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0D2C4A] mb-4">
                {lang === "bn" ? "কাস্টম প্রিমিয়াম প্যাকেজ" : "Custom Premium Package"}
              </h3>

              {/* Highlighted Yellow Pricing Box */}
              <div className="bg-[#FEFCE8] rounded-2xl p-4 text-center mb-6 border border-[#FDE68A] shadow-sm">
                <div className="flex items-center justify-center gap-2 text-[#92400E] font-extrabold text-sm sm:text-base mb-1">
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B] flex-shrink-0" />
                  <span>
                    {lang === "bn"
                      ? "আপনার পছন্দ অনুযায়ী মূল্য নির্ধারণ করা হবে"
                      : "Pricing will be tailored according to your choice"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#B45309] font-medium italic">
                  {lang === "bn"
                    ? "“অর্থ যেন কোনো শিক্ষার্থীর শিক্ষার পথে বাধা না হয়”"
                    : "“Money should never be a restriction for any student's education”"}
                </p>
              </div>

              {/* Day Selector Section */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D2C4A]">
                    <Calendar className="w-4 h-4 text-[#D97706]" />
                    <span>{lang === "bn" ? "সাপ্তাহিক ক্লাস সংখ্যা বেছে নিন" : "Select Days Per Week"}</span>
                  </div>
                  <span className="text-xs font-bold text-[#92400E] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A]">
                    {currentDaysList[selectedDaysIndex]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentDaysList.map((day, idx) => {
                    const isSelected = idx === selectedDaysIndex;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDaysIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FEF3C7] text-[#92400E] border-2 border-[#F59E0B] font-extrabold shadow-sm scale-105"
                            : "bg-[#F8FAFC] text-[#475569] hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Class Duration Selector Section */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D2C4A]">
                    <Clock className="w-4 h-4 text-[#D97706]" />
                    <span>{lang === "bn" ? "ক্লাসের সময়কাল" : "Class Duration"}</span>
                  </div>
                  <span className="text-xs font-bold text-[#92400E] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A]">
                    {currentDurationList[selectedDurationIndex]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentDurationList.map((dur, idx) => {
                    const isSelected = idx === selectedDurationIndex;
                    return (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setSelectedDurationIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FEF3C7] text-[#92400E] border-2 border-[#F59E0B] font-extrabold shadow-sm scale-105"
                            : "bg-[#F8FAFC] text-[#475569] hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {dur}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-slate-100 my-6" />

              {/* Features List */}
              <div className="space-y-3 mb-8 text-xs sm:text-sm text-[#0D2C4A] font-medium">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4.5 h-4.5 text-[#D97706] flex-shrink-0 stroke-[2.5]" />
                  <span>
                    {lang === "bn" ? "ব্যক্তিগত (One-to-One) অনলাইন শিক্ষা" : "100% Online Personalized (One-to-One) Education"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4.5 h-4.5 text-[#D97706] flex-shrink-0 stroke-[2.5]" />
                  <span>
                    {lang === "bn" ? "অগ্রাধিকারভিত্তিক অনলাইন সময় নির্বাচন" : "Priority Live Schedule Selection"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4.5 h-4.5 text-[#D97706] flex-shrink-0 stroke-[2.5]" />
                  <span>
                    {lang === "bn" ? "ঘরে বসেই ১-অন-১ লাইভ সেশন" : "Flexible Online Sessions from Home"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#92400E] font-semibold bg-[#FEF3C7]/60 p-2 rounded-xl border border-[#FDE68A]/60">
                  <Check className="w-4.5 h-4.5 text-[#D97706] flex-shrink-0 stroke-[2.5]" />
                  <span>
                    {lang === "bn"
                      ? "অর্থ যেন কোনো শিক্ষার্থীর শিক্ষার পথে বাধা না হয়"
                      : "Money should never be a restriction for any student"}
                  </span>
                </div>
              </div>
            </div>

            {/* Active CTA Button */}
            <button
              onClick={() => {
                fetch("/api/pricing-requests", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    planName: "Pay-what-you-can",
                    monthlyFee: 600,
                    duration: currentDurationList[selectedDurationIndex],
                    medium: currentDaysList[selectedDaysIndex],
                  }),
                }).catch(() => {});
                onOpenEnroll("Pay-what-you-can", 600);
              }}
              className="w-full py-4 rounded-2xl bg-[#C05621] hover:bg-[#9C4221] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-[#C05621]/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === "bn" ? "এখনই ভর্তি হন" : "Enroll Now"}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}


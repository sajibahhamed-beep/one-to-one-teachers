"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import PageSectionIcon from "@/components/PageSectionIcon";
import { CustomPage } from "@/lib/db";
import { ShieldCheck, Clock, Headphones } from "lucide-react";

export default function RefundPolicyClient({ initialPage }: { initialPage?: CustomPage | null }) {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [page, setPage] = useState<CustomPage | null>(initialPage || null);

  useEffect(() => {
    fetch("/api/pages?slug=refund-policy")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setPage(data);
        }
      })
      .catch((err) => console.error("Error fetching refund policy page:", err));
  }, []);

  const title = lang === "bn" ? (page?.titleBn || "রিফান্ড পলিসি") : (page?.titleEn || "Refund Policy");
  const subtitle = lang === "bn" ? (page?.subtitleBn || "শিক্ষার্থী ও অভিভাবকদের অধিকার রক্ষায় আমাদের ১০০% স্বচ্ছ ও ঝুঁকিমুক্ত রিফান্ড নীতি।") : (page?.subtitleEn || "Our 100% transparent and risk-free refund policy designed to protect student and parent rights.");
  const lastUpdated = lang === "bn" ? (page?.lastUpdatedBn || "১০ আগস্ট, ২০২৬") : (page?.lastUpdatedEn || "August 10, 2026");
  const sections = page?.sections || [];

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      <Navbar
        onOpenEnroll={() => setEnrollModalOpen(true)}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0D2C4A] via-[#16385C] to-[#00A896] text-white py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-mono mb-2 backdrop-blur-xs border border-white/15">
            <Clock className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? `সর্বশেষ আপডেট: ${lastUpdated}` : `Last Updated: ${lastUpdated}`}</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.35]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 space-y-8">
          {sections.map((sec) => (
            <div key={sec.id} className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4 transition-all hover:border-[#00A896]/30">
              <div className="flex items-center gap-3 text-[#00A896]">
                <PageSectionIcon name={sec.icon || "ShieldCheck"} className="w-6 h-6 flex-shrink-0" />
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
                  {lang === "bn" ? sec.titleBn : (sec.titleEn || sec.titleBn)}
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {lang === "bn" ? sec.contentBn : (sec.contentEn || sec.contentBn)}
              </p>
            </div>
          ))}

          {/* Help Callout */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-3">
            <Headphones className="w-8 h-8 text-[#00A896] mx-auto" />
            <h3 className="text-base sm:text-lg font-bold">
              {lang === "bn" ? "রিফান্ড সংক্রান্ত যেকোনো সহায়তায় আমরা আছি আপনার পাশে" : "Need Assistance with Refund?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              {lang === "bn"
                ? "আমাদের ডেডিকেটেড হেল্পলাইনে সরাসরি ফোন করুন: 01775551325 (সকাল ৯টা - রাত ১০টা) অথবা ইমেইল করুন support@ototeachers.com"
                : "Call our dedicated helpline directly at 01775551325 (9 AM - 10 PM) or email support@ototeachers.com."}
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
      />
      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />
    </main>
  );
}

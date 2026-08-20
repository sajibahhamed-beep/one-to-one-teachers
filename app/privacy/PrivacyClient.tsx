"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import PageSectionIcon from "@/components/PageSectionIcon";
import { CustomPage } from "@/lib/db";
import { ShieldCheck, Clock } from "lucide-react";

export default function PrivacyClient({ initialPage }: { initialPage?: CustomPage | null }) {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [page, setPage] = useState<CustomPage | null>(initialPage || null);

  useEffect(() => {
    if (!initialPage) {
      fetch("/api/pages?slug=privacy")
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            setPage(data);
          }
        })
        .catch((err) => console.error("Error fetching privacy page:", err));
    }
  }, [initialPage]);

  const title = lang === "bn" ? (page?.titleBn || "গোপনীয় নীতি") : (page?.titleEn || "Privacy Policy");
  const subtitle = lang === "bn" ? (page?.subtitleBn || "শিক্ষার্থী ও অভিভাবকদের তথ্যের সর্বোচ্চ সুরক্ষা সুনিশ্চিত করা আমাদের অগ্রাধিকার।") : (page?.subtitleEn || "Protecting student and parent information is our top priority.");
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

          {/* Guarantee Callout */}
          <div className="p-8 rounded-3xl bg-emerald-50/80 border border-emerald-200 text-center space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-base sm:text-lg font-bold text-[#0D2C4A]">
              {lang === "bn" ? "১০০% সুরক্ষিত ডেটা নীতি" : "100% Secure Data Commitment"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              {lang === "bn"
                ? "আমাদের যেকোনো ডেটা সুরক্ষা ও নিরাপত্তা সংক্রান্ত তথ্যের জন্য support@ototeachers.com ঠিকানায় সরাসরি যোগাযোগ করুন।"
                : "For any data security inquiries or assistance, reach out directly at support@ototeachers.com."}
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

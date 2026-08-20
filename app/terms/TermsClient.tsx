"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import PageSectionIcon from "@/components/PageSectionIcon";
import { CustomPage } from "@/lib/db";
import { Clock } from "lucide-react";

export default function TermsClient({ initialPage }: { initialPage?: CustomPage | null }) {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [page, setPage] = useState<CustomPage | null>(initialPage || null);

  useEffect(() => {
    if (!initialPage) {
      fetch("/api/pages?slug=terms")
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            setPage(data);
          }
        })
        .catch((err) => console.error("Error fetching terms page:", err));
    }
  }, [initialPage]);

  const title = lang === "bn" ? (page?.titleBn || "টার্মস অ্যান্ড কন্ডিশনস") : (page?.titleEn || "Terms and Conditions");
  const subtitle = lang === "bn" ? (page?.subtitleBn || "ওয়ান-টু-ওয়ান টিচার্স (OTOTeachers) প্ল্যাটফর্ম ব্যবহারের নিয়মমালা ও সেবা গ্রহণের শর্তসমূহ।") : (page?.subtitleEn || "Rules and terms governing the use of One-to-One Teachers (OTOTeachers) platform.");
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
                <PageSectionIcon name={sec.icon || "BookOpen"} className="w-6 h-6 flex-shrink-0" />
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
                  {lang === "bn" ? sec.titleBn : (sec.titleEn || sec.titleBn)}
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {lang === "bn" ? sec.contentBn : (sec.contentEn || sec.contentBn)}
              </p>
            </div>
          ))}
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

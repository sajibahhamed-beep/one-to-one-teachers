"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const { lang } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [apiFaqs, setApiFaqs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setApiFaqs(data);
        }
      })
      .catch(() => {});
  }, []);

  const items = apiFaqs.map((f) => ({
    q: lang === "bn" ? f.qBn || f.qEn : f.qEn || f.qBn,
    a: lang === "bn" ? f.aBn || f.aEn : f.aEn || f.aBn,
  }));

  return (
    <section id="faq" className="py-24 md:py-32 bg-white font-sans border-b border-[#0D2C4A]/10 scroll-mt-24">
      <div className="max-w-[860px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A896]/10 text-[#00A896] text-xs font-mono font-bold uppercase tracking-wider">
            <span>{lang === "bn" ? "সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions"}</span>
          </span>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.35] tracking-tight">
            {lang === "bn" ? "সাধারণ জিজ্ঞাসা ও উত্তর (FAQ)" : "Frequently Asked Questions"}
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal max-w-xl mx-auto">
            {lang === "bn"
              ? "ব্যক্তিগত অনলাইন শিক্ষক প্ল্যাটফর্ম সম্পর্কে সবচেয়ে বেশি জিজ্ঞেস করা প্রশ্নগুলোর বিস্তারিত উত্তর।"
              : "Answers to the most common questions about our affordable 1-on-1 online tutoring platform."}
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-[#00A896]/40 shadow-[0_8px_30px_-8px_rgba(0,168,150,0.20)]"
                    : "border-[#0D2C4A]/12 hover:border-[#00A896]/30 shadow-sm hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-base sm:text-lg font-bold text-[#0D2C4A] leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-[#00A896] text-white rotate-180"
                        : "bg-[#0D2C4A]/8 text-[#0D2C4A]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#475569] leading-[1.85] font-normal border-t border-[#0D2C4A]/8">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bottom */}
        <div className="mt-14 text-center bg-gradient-to-br from-[#0D2C4A] to-[#00A896] rounded-3xl p-8 sm:p-10 space-y-4 shadow-xl">
          <p className="text-white font-sans text-lg sm:text-xl font-bold leading-snug">
            {lang === "bn"
              ? "আরও প্রশ্ন আছে? সরাসরি WhatsApp-এ জিজ্ঞেস করুন।"
              : "Still have questions? Ask us directly on WhatsApp."}
          </p>
          <a
            href="https://wa.me/8801775551325"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm px-7 py-3.5 rounded-full shadow-lg shadow-[#25D366]/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>{lang === "bn" ? "WhatsApp-এ মেসেজ করুন" : "Message on WhatsApp"}</span>
          </a>
        </div>

      </div>
    </section>
  );
}

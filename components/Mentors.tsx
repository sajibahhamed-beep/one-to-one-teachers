"use client";

import { useLanguage } from "../context/LanguageContext";
import { Quote, CheckCircle2, Award } from "lucide-react";

interface MentorsProps {
  onOpenEnroll?: () => void;
}

import { useState, useEffect } from "react";

interface MentorsProps {
  onOpenEnroll?: () => void;
}

export default function Mentors({ onOpenEnroll }: MentorsProps) {
  const { t, lang } = useLanguage();
  const [teacherList, setTeacherList] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/teachers")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeacherList(data);
        }
      })
      .catch(() => {});
  }, []);

  const defaultMentors = [
    {
      name: lang === "bn" ? "নুসরাত জাহান" : "Nusrat Jahan",
      university: lang === "bn" ? "বুয়েট (সিএসই)" : "BUET (CSE)",
      subject: lang === "bn" ? "গণিত ও আইসিটি শিক্ষক" : "Math & ICT Tutor",
      students: lang === "bn" ? "৩ জন শিক্ষার্থী" : "3 Students",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: lang === "bn" ? "আরিফুর রহমান" : "Arifur Rahman",
      university: lang === "bn" ? "ঢাকা বিশ্ববিদ্যালয় (পদার্থবিজ্ঞান)" : "Dhaka University (Physics)",
      subject: lang === "bn" ? "পদার্থবিজ্ঞান ও রসায়ন শিক্ষক" : "Physics & Chemistry Tutor",
      students: lang === "bn" ? "৪ জন শিক্ষার্থী" : "4 Students",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: lang === "bn" ? "ডাঃ তাসনিম ফারহানা" : "Dr. Tasnim Farhana",
      university: lang === "bn" ? "ঢাকা মেডিকেল কলেজ (এমবিবিএস)" : "Dhaka Medical College (MBBS)",
      subject: lang === "bn" ? "জীববিজ্ঞান ও স্বাস্থ্য শিক্ষা" : "Biology & Health Science",
      students: lang === "bn" ? "৫ জন শিক্ষার্থী" : "5 Students",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const displayMentors =
    teacherList.length > 0
      ? teacherList.map((t) => ({
          name: lang === "bn" ? t.nameBn || t.nameEn : t.nameEn || t.nameBn,
          university: lang === "bn" ? t.universityBn || t.universityEn : t.universityEn || t.universityBn,
          subject: lang === "bn" ? t.subjectBn || t.subjectEn : t.subjectEn || t.subjectBn,
          students: lang === "bn" ? "যাচাইকৃত ১-অন-১ শিক্ষক" : "Verified 1-on-1 Tutor",
          img: t.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        }))
      : defaultMentors;

  return (
    <section id="mentors" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-[#0D2C4A]/10 font-sans">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-[780px] mx-auto mb-20 space-y-4">
          <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00A896] uppercase mb-3 font-bold bg-[#00A896]/10 px-4 py-1.5 rounded-full border border-[#00A896]/20">
            {t.mentorEyebrow}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.65] tracking-normal mb-4">
            {t.mentorTitle}
          </h2>
        </div>

        {/* Featured Mentor Spotlight Quote */}
        <div className="bg-[#0D2C4A] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-white/10">
          <div className="absolute top-6 right-8 opacity-15">
            <Quote className="w-32 h-32 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#00A896] text-white px-3.5 py-1 rounded-full text-xs font-mono font-bold">
              <Award className="w-4 h-4 text-white" />
              <span>{lang === "bn" ? "সেরা শিক্ষক সম্মাননা ২০২৪" : "Top Tutor Award 2024"}</span>
            </div>

            <p className="font-sans text-lg sm:text-2xl font-semibold leading-[1.7] text-white italic">
              {t.mentorQuote}
            </p>

            <div className="pt-2">
              <strong className="block font-sans text-lg font-bold text-[#38BDF8]">
                {t.mentorName}
              </strong>
              <span className="text-xs text-white/80 font-mono">
                {t.mentorSub}
              </span>
            </div>
          </div>
        </div>

        {/* Mentors Grid with spacious layout & hover elevation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayMentors.map((m, i) => (
            <div
              key={i}
              onClick={() => onOpenEnroll?.()}
              className="bg-white border border-[#0D2C4A]/12 rounded-3xl p-7 shadow-[0_4px_20px_-4px_rgba(13,44,74,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(13,44,74,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-5 group cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#00A896]/30 group-hover:scale-105 transition-transform duration-300 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#00A896] text-white p-1 rounded-full shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="space-y-1.5 min-w-0">
                <h3 className="font-sans text-lg font-extrabold text-[#0D2C4A] leading-snug truncate group-hover:text-[#00A896] transition-colors">
                  {m.name}
                </h3>
                <p className="text-xs font-bold text-[#00A896] truncate">
                  {m.university}
                </p>
                <p className="text-xs text-[#475569] leading-relaxed truncate">
                  {m.subject}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0D2C4A]/70 pt-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#00A896]"></span>
                  <span>{m.students}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

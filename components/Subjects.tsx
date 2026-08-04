"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  Search,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface SubjectItem {
  id: string;
  category: "board" | "english" | "science" | "ict";
  title: string;
  tag: string;
  desc: string;
  mentorInfo: string;
  img: string;
  syllabus: string[];
}

export default function Subjects({ onOpenEnroll }: { onOpenEnroll: () => void }) {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(null);

  const subjectList: SubjectItem[] = [
    {
      id: "math",
      category: "board",
      tag: lang === "bn" ? "এসএসসি · এইচএসসি গণিত" : "SSC · HSC Math",
      title: lang === "bn" ? "উচ্চতর গণিত ১-অন-১ মেন্টরিং" : "Higher Math 1-on-1 Mentorship",
      mentorInfo: lang === "bn" ? "মেন্টর: বুয়েট ও কয়েট গ্র্যাজুয়েট" : "Tutors: BUET & KUET Graduates",
      desc:
        lang === "bn"
          ? "বীজগণিত, জ্যামিতি ও ক্যালকুলাসের গাণিতিক সমস্যা ধরে ধরে ১-অন-১ সমাধান।"
          : "Personalized 1-on-1 problem solving from basic algebra to calculus.",
      img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
      syllabus:
        lang === "bn"
          ? [
              "ব্যক্তিগত দূর্বলতা চিহ্নিতকরণ ও ১-অন-১ ক্লাস",
              "দ্বিঘাত সমীকরণ ও ত্রিকোণমিতিক প্রমাণ",
              "স্থানাঙ্ক জ্যামিতি ও ভেক্টর শর্টকাট",
              "সাপ্তাহিক ২ মিনিটের আত্ম-মূল্যায়ন কুইজ",
            ]
          : [
              "1-on-1 diagnostic assessment of weak areas",
              "Quadratic equations & trigonometric proofs",
              "Coordinate geometry & vector shortcuts",
              "Weekly self-assessment quizzes",
            ],
    },
    {
      id: "english",
      category: "english",
      tag: lang === "bn" ? "ইংরেজি ও স্পোকেন" : "English & Spoken",
      title: lang === "bn" ? "ইংরেজি ব্যাকরণ ও স্পোকেন ইংলিশ" : "English Grammar & Spoken English",
      mentorInfo: lang === "bn" ? "মেন্টর: ঢাবি ও জবি ইংরেজি বিভাগ" : "Tutors: DU & JnU English Dept",
      desc:
        lang === "bn"
          ? "ভীতি দূর করে আত্মবিশ্বাসের সাথে সাবলীল ইংরেজিতে কথা বলা ও ফ্রি-হ্যান্ড রাইটিং।"
          : "Overcome fear and build fluent English speaking and writing confidence.",
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
      syllabus:
        lang === "bn"
          ? [
              "দৈনন্দিন ১-অন-১ স্পোকেন ইংলিশ প্র্যাকটিস",
              "ইংরেজি ব্যাকরণ ও ফ্রি-হ্যান্ড রাইটিং দক্ষতা",
              "ভোকাবুলারি ও উচ্চারণ শুদ্ধিকরণ সেশন",
              "বোর্ড পরীক্ষার ইংরেজি প্রশ্ন সমাধান",
            ]
          : [
              "Daily 1-on-1 spoken English practice",
              "English grammar & freehand writing skills",
              "Vocabulary & pronunciation correction",
              "Board exam English question solving",
            ],
    },
    {
      id: "science",
      category: "science",
      tag: lang === "bn" ? "পদার্থ · রসায়ন · জীব" : "Physics · Chem · Bio",
      title: lang === "bn" ? "সায়েন্স অল-ইন-ওয়ান ১-অন-১ টিচিং" : "Science All-in-One 1-on-1 Teaching",
      mentorInfo: lang === "bn" ? "মেন্টর: বুয়েট ও মেডিকেল স্টুডেন্ট" : "Tutors: BUET & Medical Tutors",
      desc:
        lang === "bn"
          ? "পদার্থবিজ্ঞান, রসায়ন ও জীববিজ্ঞানের জটিল থিওরি ও অংক সহজ ভাষায় ১-অন-১ বোঝা।"
          : "Master complex physics, chemistry & biology concepts with 1-on-1 guidance.",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      syllabus:
        lang === "bn"
          ? [
              "পদার্থবিজ্ঞান: গতি, বল ও বিদ্যুৎ গাণিতিক অংক",
              "রসায়ন: রাসায়নিক সমীকরণ ও পর্যায় সারণি",
              "জীববিজ্ঞান: চিত্র ও মানবদেহের অঙ্গসংস্থান",
              "বোর্ড পরীক্ষার প্রশ্ন সমাধান অনুশীলন",
            ]
          : [
              "Physics: Motion, force & electricity math problems",
              "Chemistry: Chemical equations & periodic table",
              "Biology: Diagram practice & human anatomy",
              "Board question solving guidance",
            ],
    },
    {
      id: "ict",
      category: "ict",
      tag: lang === "bn" ? "আইসিটি ও কম্পিউটার" : "ICT & Computer",
      title: lang === "bn" ? "আইসিটি ও ডিজিটাল স্কিল মেন্টর" : "ICT & Digital Skills Mentor",
      mentorInfo: lang === "bn" ? "মেন্টর: সাস্ট ও সিএসই গ্র্যাজুয়েট" : "Tutors: SUST CSE Graduates",
      desc:
        lang === "bn"
          ? "এইচএসসি আইসিটি সিলেবাস, এইচটিএমএল ওয়েব কোডিং ও বেসিক প্রোগ্রামিং।"
          : "Learn HSC ICT syllabus, HTML/CSS coding, and basic C programming.",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      syllabus:
        lang === "bn"
          ? [
              "এইচএসসি আইসিটি ১ম থেকে ৬ষ্ঠ অধ্যায় কভার",
              "এইচটিএমএল ওয়েব ডিজাইন লাইভ কোডিং",
              "সি প্রোগ্রামিং বেসিক লজিক শিক্ষা",
              "ইন্টারনেট নিরাপত্তা ও ডিজিটাল দক্ষতা",
            ]
          : [
              "HSC ICT chapters 1 through 6 covered",
              "HTML web design live coding sessions",
              "C programming logic fundamentals",
              "Internet safety & digital skills",
            ],
    },
  ];

  const categories = [
    { id: "all", label: t.subjFilterAll },
    { id: "board", label: t.subjFilterBoard },
    { id: "english", label: t.subjFilterEnglish },
    { id: "science", label: t.subjFilterScience },
    { id: "ict", label: t.subjFilterIct },
  ];

  const filteredSubjects = subjectList.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="subjects" className="py-20 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-[700px] space-y-3">
            <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00A896] uppercase mb-2 font-bold bg-[#00A896]/10 px-4 py-1.5 rounded-full border border-[#00A896]/20">
              {t.subjEyebrow}
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.4] tracking-tight mb-3">
              {t.subjTitle}
            </h2>
            <p className="text-base sm:text-lg text-[#475569] leading-[1.8] font-normal pt-1">
              {t.subjDesc}
            </p>
          </div>

          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-[#0D2C4A]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.topbarSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-[#0D2C4A]/15 text-sm text-[#0D2C4A] placeholder-[#0D2C4A]/40 outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/20 shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#0D2C4A] text-white shadow-md"
                  : "bg-white text-[#0D2C4A] border border-[#0D2C4A]/15 hover:bg-[#00A896]/10 hover:text-[#00A896]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Cards (Exact 2:56 PM State: gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-3xl border border-[#0D2C4A]/10 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="font-mono text-xs font-bold uppercase text-[#00A896] bg-[#00A896]/10 px-3.5 py-1 rounded-full border border-[#00A896]/20">
                    {subject.tag}
                  </span>
                  <span className="text-xs font-mono text-[#475569] font-bold">
                    {subject.mentorInfo}
                  </span>
                </div>

                <h3 className="font-sans text-2xl font-extrabold text-[#0D2C4A] leading-[1.4] mb-3">
                  {subject.title}
                </h3>

                <p className="text-sm sm:text-base text-[#475569] leading-[1.8] mb-6 font-normal">
                  {subject.desc}
                </p>

                <div className="space-y-2.5 mb-8 bg-[#F8FAFC] p-5 rounded-2xl border border-[#0D2C4A]/10">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#0D2C4A] mb-3 tracking-wider">
                    {lang === "bn" ? "১-অন-১ কোর্স সিলেবাস ও সুবিধা:" : "1-on-1 Syllabus & Highlights:"}
                  </h4>
                  {subject.syllabus.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0D2C4A]">
                      <CheckCircle2 className="w-4 h-4 text-[#00A896] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[#0D2C4A]/10">
                <button
                  onClick={onOpenEnroll}
                  className="flex-1 py-3.5 rounded-full bg-[#00A896] text-white font-extrabold text-xs sm:text-sm hover:bg-[#008075] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.subjEnrollBtn}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => setSelectedSubject(subject)}
                  className="px-5 py-3.5 rounded-full bg-white text-[#0D2C4A] border border-[#0D2C4A]/20 font-bold text-xs sm:text-sm hover:bg-[#F8FAFC] transition-colors"
                >
                  {t.subjLearnMore}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syllabus Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 relative border border-[#00A896]/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#0D2C4A]/10">
              <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                {selectedSubject.title}
              </h3>
              <button
                onClick={() => setSelectedSubject(null)}
                className="w-8 h-8 rounded-full bg-[#F8FAFC] text-[#0D2C4A] flex items-center justify-center hover:bg-[#0D2C4A]/10 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              {selectedSubject.desc}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-[#00A896] tracking-wider">
                {lang === "bn" ? "বিস্তারিত ১-অন-১ বিষয়সূচি:" : "Detailed 1-on-1 Syllabus:"}
              </h4>
              {selectedSubject.syllabus.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-[#0D2C4A] bg-[#F8FAFC] p-3 rounded-xl border border-[#0D2C4A]/5">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#00A896] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedSubject(null);
                onOpenEnroll();
              }}
              className="w-full py-4 rounded-full bg-[#00A896] text-white font-extrabold text-sm hover:bg-[#008075] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.subjEnrollBtn}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

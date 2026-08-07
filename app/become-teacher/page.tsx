"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, Award, CheckCircle2, UserPlus, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

export default function BecomeTeacherPage() {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      <Navbar
        onOpenEnroll={() => setEnrollModalOpen(true)}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0D2C4A] via-[#16385C] to-[#00A896] text-white py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center max-w-3xl space-y-5">
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.35]">
            {lang === "bn"
              ? "শিক্ষার্থী গড়ে তোলার আলো ছড়ান — ১-অন-১ শিক্ষক হিসেবে যুক্ত হন"
              : "Become a 1-on-1 Mentor & Empower Learners Nationwide"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {lang === "bn"
              ? "আপনি কি বুয়েট, ঢাবি, মেডিকেল বা নামকরা বিশ্ববিদ্যালয়ের শিক্ষার্থী বা শিক্ষক? আপনার বিষয়ভিত্তিক মেধা দিয়ে ১-অন-১ পড়াশোনায় প্রভাব ফেলুন।"
              : "Are you a student or graduate from BUET, DU, Medical, or top universities? Share your knowledge in direct 1-on-1 mentoring."}
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setMentorModalOpen(true)}
              className="px-8 py-4 rounded-full bg-[#00A896] text-white font-extrabold text-base hover:bg-[#008075] shadow-lg shadow-[#00A896]/30 flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5 transition-all"
            >
              <UserPlus className="w-5 h-5 text-white" />
              <span>{lang === "bn" ? "টিচার আবেদন ফর্ম পূরণ করুন" : "Apply as a 1-on-1 Tutor"}</span>
              <ArrowRight className="w-4.5 h-4.5 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1140px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#0D2C4A]">
              {lang === "bn" ? "কেন আলো শিক্ষায় শিক্ষক হিসেবে যুক্ত হবেন?" : "Why Join Alo Shikkha as a Mentor?"}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {lang === "bn"
                ? "আমাদের ১-অন-১ প্ল্যাটফর্মে শিক্ষকরা পান ফ্লেক্সিবল সময়সূচি, সম্মানী এবং সামাজিক প্রভাবের অনন্য সুযোগ।"
                : "Enjoy flexible hours, prompt Honorarium, and the satisfaction of changing lives."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
              <div className="p-3 bg-[#00A896]/10 rounded-2xl w-fit text-[#00A896]">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-[#0D2C4A]">
                {lang === "bn" ? "সরাসরি ১-অন-১ প্রভাব" : "Direct 1-on-1 Impact"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {lang === "bn"
                  ? "একজন শিক্ষার্থীর দুর্বলতা দূর করে তার সফলতার সোপান তৈরিতে ভূমিকা রাখুন।"
                  : "Focus on one student at a time, addressing individual weaknesses effectively."}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
              <div className="p-3 bg-[#00A896]/10 rounded-2xl w-fit text-[#00A896]">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-[#0D2C4A]">
                {lang === "bn" ? "নিয়মিত সময়সূচি ও সম্মানজনক ফি" : "Flexible Hours & Fair Pay"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {lang === "bn"
                  ? "আপনার সুবিধামতো সান্ধ্যকালীন বা ছুটির দিনে ক্লাস নিন এবং ক্লাসের যথাযথ সম্মানী পান।"
                  : "Choose classes that fit your university schedule and receive timely compensation."}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
              <div className="p-3 bg-[#00A896]/10 rounded-2xl w-fit text-[#00A896]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-xl text-[#0D2C4A]">
                {lang === "bn" ? "অনলাইন ও অডিও টিচিং অপশন" : "Online & Audio Teaching Modes"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {lang === "bn"
                  ? "সারা বাংলাদেশের দূরদূরান্তের শিক্ষার্থীদের সাথে বাসা থেকেই যুক্ত হতে পারেন।"
                  : "Teach remotely from your hall or home to students across all 64 districts."}
              </p>
            </div>
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

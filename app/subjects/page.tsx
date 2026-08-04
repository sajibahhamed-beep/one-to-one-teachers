"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Subjects from "@/components/Subjects";
import HowItWorks from "@/components/HowItWorks";
import Mentors from "@/components/Mentors";
import SuccessStories from "@/components/SuccessStories";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";

export default function SubjectTeachersPage() {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pay-what-you-can");
  const [selectedFee, setSelectedFee] = useState(600);

  const handleOpenEnroll = (planName = "Pay-what-you-can", fee = 600) => {
    setSelectedPlan(planName);
    setSelectedFee(fee);
    setEnrollModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Top Sticky Header */}
      <Navbar
        onOpenEnroll={() => handleOpenEnroll()}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* Subject Teachers Page Hero Banner */}
      <section className="bg-gradient-to-b from-[#0D2C4A] via-[#16385C] to-[#00A896] text-white py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#38BDF8] bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
            <GraduationCap className="w-4 h-4 text-[#00A896]" />
            <span>{lang === "bn" ? "বিষয়ভিত্তিক ১-অন-১ টিচার্স ডিরেক্টরি" : "1-on-1 Subject Tutors Directory"}</span>
          </span>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {lang === "bn"
              ? "আপনার সন্তানের প্রিয় বিষয়ের জন্য ১-অন-১ শিক্ষক"
              : "Dedicated 1-on-1 Tutors for Every Subject"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {lang === "bn"
              ? "গণিত, ইংরেজি, পদার্থবিজ্ঞান, রসায়ন বা আইসিটি — প্রতিটি বিষয়ে বুয়েট, ঢাবি ও মেডিকেলের অভিজ্ঞ শিক্ষক থেকে ১-অন-১ টিচিং নিন।"
              : "Get personalized 1-on-1 guidance in Math, English, Physics, Chemistry & ICT from BUET, DU & Medical graduates."}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleOpenEnroll()}
              className="px-8 py-3.5 rounded-full bg-[#00A896] text-white font-bold text-sm hover:bg-[#008075] shadow-lg shadow-[#00A896]/30 flex items-center gap-2 cursor-pointer"
            >
              <span>{lang === "bn" ? "আমার শিক্ষক রিকোয়েস্ট করুন" : "Request My Tutor"}</span>
              <ArrowRight className="w-4.5 h-4.5 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 1: Subject Wise Teachers Directory */}
      <Subjects onOpenEnroll={() => handleOpenEnroll()} />

      {/* Section 2: How We Teach (আমরা কীভাবে পড়াই) */}
      <HowItWorks />

      {/* Section 3: About Our Teachers (আমাদের শিক্ষকবৃন্দ) */}
      <Mentors />

      {/* Section 4: Testimonials (টেস্টিমোনিয়াল) */}
      <SuccessStories />

      {/* Footer */}
      <Footer />

      {/* Request Teacher Modal */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialPlan={selectedPlan}
        initialFee={selectedFee}
      />

      {/* Become a Teacher Modal */}
      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />
    </main>
  );
}

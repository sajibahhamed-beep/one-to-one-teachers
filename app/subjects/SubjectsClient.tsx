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
import { ArrowRight } from "lucide-react";

export default function SubjectsClient() {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Student Request");
  const [selectedFee, setSelectedFee] = useState(0);

  const handleOpenEnroll = (planName?: string | any, fee?: number | any) => {
    const validPlan = typeof planName === "string" ? planName : "Student Request";
    const validFee = typeof fee === "number" ? fee : 0;
    setSelectedPlan(validPlan);
    setSelectedFee(validFee);
    setEnrollModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Top Sticky Header */}
      <Navbar
        onOpenEnroll={(plan) => handleOpenEnroll(plan || "Student Request")}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* Subject Teachers Page Hero Banner */}
      <section className="bg-gradient-to-b from-[#0D2C4A] via-[#16385C] to-[#00A896] text-white py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center max-w-3xl space-y-4">
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.35] mb-4">
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

      {/* Section 1: How 1-on-1 Teaching Works */}
      <HowItWorks />

      {/* Section 2: Subject Wise Teachers Directory */}
      <Subjects onOpenEnroll={() => handleOpenEnroll()} />

      {/* Section 3: About Our Teachers */}
      <Mentors onOpenEnroll={() => handleOpenEnroll()} />

      {/* Section 4: Testimonials */}
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

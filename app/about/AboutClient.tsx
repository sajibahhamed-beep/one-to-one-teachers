"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProblemSection from "@/components/ProblemSection";
import ImpactSection from "@/components/ImpactSection";
import Mentors from "@/components/Mentors";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";

interface AboutClientProps {
  initialTeachers?: any[];
  initialSettings?: any;
  initialPages?: any[];
}

export default function AboutClient({
  initialTeachers,
  initialSettings,
  initialPages,
}: AboutClientProps = {}) {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Student Request");

  const handleOpenEnroll = (plan = "Student Request") => {
    setSelectedPlan(plan);
    setEnrollModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      <Navbar
        onOpenEnroll={(plan) => handleOpenEnroll(plan || "Student Request")}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0D2C4A] via-[#16385C] to-[#00A896] text-white py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center max-w-3xl space-y-4">
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.35]">
            {lang === "bn"
              ? "আমাদের সম্পর্কে — ১-অন-১ শিক্ষা সবার জন্য"
              : "About Us — One-to-One Teacher for All"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {lang === "bn"
              ? "আমরা কোনো গণ-কোচিং সুবিধা নই। প্রতিটি শিক্ষার্থীর মেধা ও দুর্বলতার দিকে লক্ষ্য রেখে একজন বুয়েট, ঢাবি বা মেডিকেল শিক্ষককে সরাসরি ১-অন-১ মিলিয়ে দেয় আমাদের সামাজিক শিক্ষা কার্যক্রম।"
              : "We aren't a traditional coaching center. We connect students directly with verified mentors for individualized 1-on-1 education."}
          </p>
        </div>
      </section>

      {/* Problem & Educational Gap Section */}
      <ProblemSection onOpenEnroll={() => handleOpenEnroll("Student Request")} />

      {/* Impact Section */}
      <ImpactSection />

      {/* Verified Mentors Spotlight */}
      <Mentors
        onOpenEnroll={() => handleOpenEnroll("Student Request")}
        initialTeachers={initialTeachers}
      />

      <Footer initialSettings={initialSettings} initialPages={initialPages} />

      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialPlan={selectedPlan}
      />
      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />
    </main>
  );
}

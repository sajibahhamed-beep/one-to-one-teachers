"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import SubjectMarquee from "../components/SubjectMarquee";
import ProblemSection from "../components/ProblemSection";
import HowItWorks from "../components/HowItWorks";
import Subjects from "../components/Subjects";
import BatchSchedule from "../components/BatchSchedule";
import SuccessStories from "../components/SuccessStories";
import Mentors from "../components/Mentors";
import Pricing from "../components/Pricing";
import ImpactSection from "../components/ImpactSection";
import EnrollModal from "../components/EnrollModal";
import MentorModal from "../components/MentorModal";
import Footer from "../components/Footer";
import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";

export default function Home() {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("Pay-what-you-can");
  const [selectedFee, setSelectedFee] = useState<number>(600);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleOpenEnroll = (plan = "Pay-what-you-can", fee = 600) => {
    setSelectedPlan(plan);
    setSelectedFee(fee);
    setEnrollModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EF]">
      {/* Navbar with mentors.com.bd Topbar & Language Switcher */}
      <Navbar
        onOpenEnroll={() => handleOpenEnroll("Pay-what-you-can", 600)}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* Hero Visual Section */}
      <Hero onOpenEnroll={() => handleOpenEnroll("Pay-what-you-can", 600)} />

      {/* Category Icons Grid (mentors.com.bd style) */}
      <CategoryGrid onOpenEnroll={() => handleOpenEnroll("Pay-what-you-can", 600)} />

      {/* Marquee Ticker */}
      <SubjectMarquee />

      {/* Educational Gap & Vision */}
      <ProblemSection />

      {/* How it works */}
      <HowItWorks />

      {/* Subjects & Syllabus Gallery */}
      <Subjects onOpenEnroll={() => handleOpenEnroll("Pay-what-you-can", 600)} />

      {/* Live Batch Schedule (mentors.com.bd style) */}
      <BatchSchedule onOpenEnroll={() => handleOpenEnroll("Pay-what-you-can", 600)} />

      {/* Student Success Stories & Scorecards */}
      <SuccessStories />

      {/* Mentor Spotlight */}
      <Mentors />

      {/* Flexible Fee & Sliding Scale Calculator */}
      <Pricing onOpenEnroll={handleOpenEnroll} />

      {/* Impact Statistics */}
      <ImpactSection />

      {/* Call to Action */}
      <section className="cta-final bg-[#12213D] text-[#FBF7EF] text-center py-24 relative overflow-hidden">
        <div className="wrap max-w-[1160px] mx-auto px-6 md:px-8 relative z-10">
          <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#FFB627] uppercase mb-4">
            <Sparkles className="w-4 h-4" /> {lang === "bn" ? "আপনি প্রস্তুত যখনই" : "Ready when you are"}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FBF7EF] max-w-2xl mx-auto mb-6 leading-[1.65]">
            {lang === "bn" ? "আপনার সন্তানের মেন্টর মাত্র একটি ফরম দূরে।" : "Your child's mentor is one form away."}
          </h2>
          <p className="text-base sm:text-lg text-[#FBF7EF]/75 max-w-lg mx-auto mb-10 leading-relaxed">
            {lang === "bn"
              ? "সাইন আপ করতে মাত্র ৪ মিনিট সময় লাগবে। প্রথম সেশনটি সম্পূর্ণ ফ্রি!"
              : "Four minutes to sign up. A match within 48 hours. The first session is always free."}
          </p>
          <div className="hero-actions flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleOpenEnroll("Pay-what-you-can", 600)}
              className="btn btn-gold flex items-center gap-2 px-7 py-4 rounded-full bg-[#FFB627] text-[#12213D] font-bold text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              <span>{lang === "bn" ? "ফ্রি ট্রায়াল সেশনে শুরু করুন" : "Start with a free first session"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMentorModalOpen(true)}
              className="btn btn-outline flex items-center gap-2 px-7 py-4 rounded-full border border-[#FBF7EF]/30 text-[#FBF7EF] font-semibold text-sm hover:bg-[#FBF7EF]/10 transition-colors"
            >
              <HeartHandshake className="w-4 h-4 text-[#FFB627]" />
              <span>{lang === "bn" ? "মেন্টর হতে আবেদন করুন" : "Become a mentor instead"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Student Registration Modal */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialPlan={selectedPlan}
        initialFee={selectedFee}
      />

      {/* Mentor Application Modal */}
      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />
    </div>
  );
}

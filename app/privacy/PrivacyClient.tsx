"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import { EyeOff, ShieldCheck, Database } from "lucide-react";

export default function PrivacyClient() {
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
      <section className="bg-gradient-to-b from-[#0D2C4A] via-[#16385C] to-[#00A896] text-white py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center max-w-3xl space-y-4">
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.35]">
            {lang === "bn" ? "গোপনীয় নীতি" : "Privacy Policy"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {lang === "bn"
              ? "শিক্ষার্থী ও অভিভাবকদের তথ্যের সর্বোচ্চ সুরক্ষা সুনিশ্চিত করা আমাদের অগ্রাধিকার।"
              : "Protecting student and parent information is our top priority."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 space-y-8">
          
          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-[#00A896]">
              <Database className="w-6 h-6 flex-shrink-0" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
                {lang === "bn" ? "১. সংগৃহীত তথ্যের বিবরণ" : "1. Information We Collect"}
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === "bn"
                ? "শিক্ষার্থী রেজিস্ট্রেশনের সময় নাম, শ্রেণি, বিষয়, যোগাযোগের ফোন নম্বর এবং জেলা সম্পর্কিত তথ্য কেবল ১-অন-১ শিক্ষক মেলানোর উদ্দেশ্যে সংগ্রহ করা হয়।"
                : "During registration, we collect learner name, grade, subject preferences, phone number, and district solely for matching with an appropriate 1-on-1 tutor."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-[#00A896]">
              <EyeOff className="w-6 h-6 flex-shrink-0" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
                {lang === "bn" ? "২. তৃতীয় পক্ষের সাথে তথ্য শেয়ার না করা" : "2. Zero Third-Party Sharing"}
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === "bn"
                ? "আপনার ব্যক্তিগত তথ্য কোনো বাণিজ্যিক প্রতিষ্ঠান, বিজ্ঞাপন সংস্থা বা তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করা হয় না।"
                : "Your personal data is strictly confidential. We never sell, trade, or share student contact details with third-party advertisers."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-[#00A896]">
              <ShieldCheck className="w-6 h-6 flex-shrink-0" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
                {lang === "bn" ? "৩. ডেটা নিরাপত্তা ও এনক্রিপশন" : "3. Data Security & Encryption"}
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === "bn"
                ? "আমাদের সকল সার্ভার ও ডাটাবেস এনক্রিপ্টেড প্রটোকলে সংরক্ষিত থাকে যাতে অননুমোদিত প্রবেশ প্রতিহত করা যায়।"
                : "All backend infrastructure is secured with standard encryption protocols to prevent unauthorized access."}
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

"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  ChevronDown,
} from "lucide-react";

export default function FemaleTutorsClient() {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const femaleFeatures = [
    {
      titleBn: "১০০% নিরাপদ ও ঘরোয়া পরিবেশ",
      titleEn: "100% Safe Home Environment",
      descBn: "বাসায় অপরিচিত গৃহশিক্ষক রাখার ঝুঁকি ও অস্বস্তি নেই। সম্পূর্ণ ডিজিটাল মাধ্যমে ঘরের নিরাপদ পরিবেশে ক্লাস।",
      descEn: "No home intrusion risks. Learn comfortably from the safety of your own room.",
      icon: Lock,
    },
    {
      titleBn: "দ্বিধাহীন প্রশ্ন করার পূর্ণ স্বাধীনতা",
      titleEn: "Ask Questions Without Hesitation",
      descBn: "নারী শিক্ষিকার কাছে যেকোনো কঠিন পড়া বা দুর্বলতা সংকোচ ছাড়াই খুলে বলার মানসিক স্বাচ্ছন্দ্য।",
      descEn: "Zero shyness. Female students can freely discuss learning gaps with relatable mentors.",
      icon: HeartHandshake,
    },
    {
      titleBn: "বুয়েট, ঢাবি ও মেডিকেলের শিক্ষিকা",
      titleEn: "BUET, DU & Medical Mentors",
      descBn: "দেশের শীর্ষ বিশ্ববিদ্যালয়ের মেধাবী ছাত্রীদের পাঠদান ও অনুপ্রেরণামূলক মেন্টরিং।",
      descEn: "Learn directly from high-achieving female scholars who inspire academic ambition.",
      icon: Award,
    },
    {
      titleBn: "কঠোর ব্যাকগ্রাউন্ড ও আইডি ভেরিফিকেশন",
      titleEn: "Rigorous Background Verification",
      descBn: "জাতীয় পরিচয়পত্র, একাডেমিক সনদ ও বিশ্ববিদ্যালয়ের আইডি কার্ড ১০০% যাচাই করা হয়।",
      descEn: "National ID and academic credential verification for every onboarded female educator.",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      q: "অনলাইন নারী শিক্ষকদের যোগ্যতা ও ব্যাকগ্রাউন্ড কীভাবে যাচাই করা হয়?",
      a: "আমাদের সকল নারী শিক্ষক বুয়েট, ঢাকা বিশ্ববিদ্যালয়, সরকারি মেডিকেল কলেজ বা শীর্ষ পাবলিক বিশ্ববিদ্যালয়ের ছাত্রী। তাঁদের জাতীয় পরিচয়পত্র, একাডেমিক সনদ ও বিশ্ববিদ্যালয়ের আইডি কার্ড পুঙ্খানুপুঙ্খ যাচাই করা হয়।",
    },
    {
      q: "অভিভাবকরা কি ক্লাসের সময় উপস্থিত থাকতে পারেন?",
      a: "হ্যাঁ, সম্পূর্ণ স্বচ্ছতার জন্য অভিভাবকরা সবসময় ক্লাসের পাশে থাকতে পারেন বা প্রোগ্রেস নোট পর্যবেক্ষণ করতে পারেন।",
    },
    {
      q: "কোন কোন বিষয়ের জন্য নারী শিক্ষক পাওয়া যায়?",
      a: "গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, ইংরেজি, আইসিটি এবং স্কুল-কলেজের সকল বিষয়ের জন্য অভিজ্ঞ নারী শিক্ষক রয়েছে।",
    },
    {
      q: "প্রথম ট্রায়াল ক্লাসে কীভাবে যুক্ত হব?",
      a: "সহজ ফরমটি পূরণ করুন। আমরা আপনার সুবিধা অনুযায়ী একজন উপযুক্ত নারী শিক্ষক নির্ধারণ করে প্রথম ফ্রি সেশনের ব্যবস্থা করে দেব।",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      <Navbar
        onOpenEnroll={() => setEnrollModalOpen(true)}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0D2C4A] via-[#16385C] to-[#00A896] text-white py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono font-bold border border-white/20">
            <ShieldCheck className="w-4 h-4 text-[#FFB627]" />
            <span>{lang === "bn" ? "ভেরিফাইড নারী শিক্ষক নেটওয়ার্ক" : "Verified Female Mentor Network"}</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.3]">
            {lang === "bn"
              ? "মেয়ে শিক্ষার্থীদের জন্য ভেরিফাইড অনলাইন শিক্ষিকা ও নিরাপদ পড়াশোনা"
              : "Verified Female Online Tutors — Safe & Empowering Learning for Girls"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {lang === "bn"
              ? "বুয়েট, ঢাবি ও সরকারি মেডিকেলের অভিজ্ঞ শিক্ষিকাদের নিবিড় তত্ত্বাবধানে ঘরে বসেই মেয়েদের স্বাচ্ছন্দ্যপূর্ণ শিক্ষা। ১০০% নিরাপত্তা, ব্যক্তিগত মনোযোগ ও প্রথম ক্লাস ফ্রি।"
              : "Dedicated female tutors from top universities in Bangladesh. Complete safety, zero hesitation, and personalized 1-on-1 guidance."}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setEnrollModalOpen(true)}
              className="px-8 py-4 rounded-full bg-[#FFB627] text-[#0D2C4A] font-extrabold text-sm sm:text-base hover:bg-[#F59E0B] shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{lang === "bn" ? "ফ্রি ট্রায়াল ক্লাস বুক করুন" : "Book Free Trial Class"}</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setMentorModalOpen(true)}
              className="px-7 py-4 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 border border-white/25 transition-all cursor-pointer"
            >
              {lang === "bn" ? "শিক্ষিকা হিসেবে আবেদন" : "Apply as Female Tutor"}
            </button>
          </div>
        </div>
      </section>

      {/* Safety & Value Cards */}
      <section className="py-20 md:py-24 max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-[#00A896]">
            {lang === "bn" ? "নিরাপত্তা ও বিশ্বাস" : "Safety & Trust"}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#0D2C4A]">
            {lang === "bn" ? "কেন অভিভাবকরা আমাদের নারী শিক্ষকদের বেছে নেন?" : "Why Parents Choose Our Verified Female Tutors"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === "bn"
              ? "মেয়েদের পড়াশোনায় মানসিক প্রশান্তি ও সর্বোচ্চ একাগ্রতা নিশ্চিত করার প্রতিশ্রুতি।"
              : "Ensuring emotional comfort, privacy, and academic focus for every female learner."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {femaleFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6.5 h-6.5 text-[#00A896]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans text-xl font-bold text-[#0D2C4A]">
                    {lang === "bn" ? feat.titleBn : feat.titleEn}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {lang === "bn" ? feat.descBn : feat.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Parental Transparency Section */}
      <section className="py-16 md:py-20 bg-[#0D2C4A] text-white">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold uppercase text-[#FFB627]">
                {lang === "bn" ? "অভিভাবকদের জন্য পূর্ণ স্বচ্ছতা" : "Parental Peace of Mind"}
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold leading-[1.35]">
                {lang === "bn"
                  ? "ঘরে বসেই পড়াশোনা: রাস্তায় যানজট ও নিরাপত্তার চিন্তা থেকে মুক্তি"
                  : "Zero Commute Fatigue & 100% Home Safety for Your Daughter"}
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {lang === "bn"
                  ? "কোচিংয়ে যাতায়াতের সময় নষ্ট বা ক্লান্তির বদলে মেয়ে শিক্ষার্থীরা তাদের পুরো শক্তি পড়াশোনায় কাজে লাগাতে পারে।"
                  : "Save hours spent in traffic. Let your daughter study with high energy under the direct guidance of inspiring female university scholars."}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "অভিভাবক সরাসরি ক্লাসের অগ্রগতি ও ফিডব্যাক দেখতে পারেন",
                  "Zoom, Google Meet বা লো-ডাটা অডিও মোডে ক্লাস করার সুযোগ",
                  "সপ্তাহে দিন ও সময়সূচি নিজেরা নির্ধারণের স্বাধীনতা",
                  "পছন্দমতো যে কোনো বিষয়ে শিক্ষিকা পরিবর্তনের নিশ্চয়তা",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm sm:text-base text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#00A896] flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-3xl p-8 border border-white/20 backdrop-blur-sm space-y-6">
              <h3 className="font-sans text-2xl font-bold text-white">
                {lang === "bn" ? "প্রথম ফ্রি ট্রায়াল সেশন নিন" : "Book Your Free 1-on-1 Trial Session"}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {lang === "bn"
                  ? "আপনার মেয়ের পড়াশোনার জন্য একজন উপযুক্ত বুয়েট, ঢাবি বা মেডিকেল শিক্ষিকার সাথে ফ্রি সেশনে কথা বলুন।"
                  : "Connect with a verified female tutor today. No credit card or advance payment required."}
              </p>
              <button
                onClick={() => setEnrollModalOpen(true)}
                className="w-full py-4 rounded-full bg-[#00A896] text-white font-extrabold text-sm sm:text-base hover:bg-[#008075] transition-all shadow-lg cursor-pointer"
              >
                {lang === "bn" ? "নারী শিক্ষক নির্বাচন করুন" : "Select Female Tutor"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 md:py-24 max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-[#00A896]">
            {lang === "bn" ? "সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions"}
          </span>
          <h2 className="font-sans text-3xl font-extrabold text-[#0D2C4A]">
            {lang === "bn" ? "নারী শিক্ষক ও নিরাপত্তা সংক্রান্ত জিজ্ঞাসা" : "Female Tutoring FAQs"}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#0D2C4A] hover:text-[#00A896] transition-colors"
              >
                <span className="text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    openFaq === idx ? "rotate-180 text-[#00A896]" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialPlan="Pay-what-you-can"
        initialFee={600}
      />
      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />
    </main>
  );
}

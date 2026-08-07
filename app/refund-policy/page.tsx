"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, RefreshCw, HelpCircle, FileText, CheckCircle2 } from "lucide-react";

export default function RefundPolicyPage() {
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
            {lang === "bn" ? "রিফান্ড পলিসি" : "Refund Policy"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {lang === "bn"
              ? "শিক্ষার্থী ও অভিভাবকদের অধিকার রক্ষায় আমাদের ১০০% স্বচ্ছ ও ঝুঁকিমুক্ত রিফান্ড নীতি।"
              : "Our 100% transparent and risk-free refund policy designed to protect student and parent rights."}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 space-y-10">
          
          {/* Box 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-[#00A896]">
              <ShieldCheck className="w-6 h-6 flex-shrink-0" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
                {lang === "bn" ? "১. প্রথম সেশন ১০০% ফ্রি ট্রায়াল" : "1. 100% Free First Trial Session"}
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === "bn"
                ? "আমাদের যেকোনো বিষয়ভিত্তিক ১-অন-১ শিক্ষকের প্রথম ডেমো/ট্রায়াল ক্লাস সম্পূর্ণ বিনামূল্যে প্রদান করা হয়। প্রথম সেশন দেখার পরই অভিভাবক বা শিক্ষার্থী চূড়ান্ত ভর্তির সিদ্ধান্ত নিতে পারেন।"
                : "Every subject 1-on-1 mentor matching comes with an initial free trial class. Parents and learners only finalize enrollment after experiencing the first live session."}
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-[#00A896]">
              <RefreshCw className="w-6 h-6 flex-shrink-0" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
                {lang === "bn" ? "২. শিক্ষক পরিবর্তনের সুযোগ ও রিফান্ড" : "2. Tutor Replacement & Refund Options"}
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === "bn"
                ? "ভর্তির পর যদি শিক্ষকের পড়ানোর ধরণ শিক্ষার্থীর সাথে সামঞ্জস্যপূর্ণ না হয়, তবে ৪৮ ঘণ্টার মধ্যে সম্পূর্ণ নতুন শিক্ষক বরাদ্দ দেওয়া হবে। কোনো কারণে অভিভাবক যদি সেবা স্থগিত করতে চান, তবে অব্যবহৃত ক্লাসের সম্পূর্ণ ফি ফেরত প্রদান করা হবে।"
                : "If a assigned tutor does not fit your learning pace, we will replace the mentor within 48 hours. If you wish to discontinue, unutilized class session fees will be refunded pro-rata."}
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-[#00A896]">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
                {lang === "bn" ? "৩. রিফান্ড আবেদনের নিয়মাবলী" : "3. Refund Request Process"}
              </h2>
            </div>
            <ul className="space-y-3 text-slate-600 text-sm sm:text-base">
              <li className="flex items-start gap-2.5">
                <span className="text-[#00A896] font-bold">•</span>
                <span>
                  {lang === "bn"
                    ? "আমাদের সাপোর্ট ইমেইলে (support@aloshikkha.org) অথবা হটলাইনে (01775551325) যোগাযোগ করে রিফান্ড রিকোয়েস্ট পাঠান।"
                    : "Send your refund request to our official support email (support@aloshikkha.org) or hotline (01775551325)."}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#00A896] font-bold">•</span>
                <span>
                  {lang === "bn"
                    ? "আবেদন অনুমোদনের ৩ থেকে ৭ কর্মদিবসের মধ্যে আপনার বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে অর্থ ফেরত পাঠানো হবে।"
                    : "Refunds will be processed to your bKash, Nagad, or bank account within 3 to 7 working days upon verification."}
                </span>
              </li>
            </ul>
          </div>

          {/* Help Callout */}
          <div className="bg-[#FEFCE8] border border-[#FDE68A] rounded-2xl p-6 text-center space-y-2">
            <h3 className="font-bold text-[#92400E] text-base sm:text-lg">
              {lang === "bn" ? "কোনো প্রশ্ন বা সাহায্য প্রয়োজন?" : "Have Questions or Need Help?"}
            </h3>
            <p className="text-sm text-[#B45309]">
              {lang === "bn"
                ? "আমাদের সাপোর্ট টিম আপনাকে সাহায্য করতে প্রস্তুত: support@aloshikkha.org | 01775551325"
                : "Our support team is ready to assist you: support@aloshikkha.org | 01775551325"}
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

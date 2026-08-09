"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsClient() {
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
            {lang === "bn" ? "টার্মস অ্যান্ড কন্ডিশনস" : "Terms and Conditions"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {lang === "bn"
              ? "ওয়ান-টু-ওয়ান টিচার্স (OTOTeachers) প্ল্যাটফর্ম ব্যবহারের নিয়মমালা ও সেবা গ্রহণের শর্তসমূহ।"
              : "Rules and terms governing the use of One-to-One Teachers (OTOTeachers) platform."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 space-y-8">
          
          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
              {lang === "bn" ? "১. সেবা এবং প্ল্যাটফর্মের ভূমিকা" : "1. Platform Scope & Services"}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === "bn"
                ? "OTOTeachers একটি ১-অন-১ শিক্ষাদান সংযোগ প্ল্যাটফর্ম। আমরা অসচ্ছল ও যেকোনো পরিবারের শিক্ষার্থীদের বুয়েট, ঢাবি, মেডিকেলসহ নামকরা বিশ্ববিদ্যালয়ের যাচাইকৃত শিক্ষকদের সাথে বিষয়ভিত্তিক পড়াশোনার জন্য সংযুক্ত করি।"
                : "OTOTeachers connects learners directly with verified subject tutors from top universities (BUET, DU, Medical) for 1-on-1 personalized academic sessions."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
              {lang === "bn" ? "২. শিক্ষার্থী ও অভিভাবকের দায়িত্ব" : "2. Student & Parent Responsibilities"}
            </h2>
            <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-[#00A896] font-bold">•</span>
                <span>
                  {lang === "bn"
                    ? "নিবন্ধন ফর্মে সঠিক তথ্য (শ্রেণি, বিষয়, যোগাযোগের নম্বর) প্রদান করতে হবে।"
                    : "Provide accurate student details during registration."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00A896] font-bold">•</span>
                <span>
                  {lang === "bn"
                    ? "নির্ধারিত লাইভ ক্লাস সময়ে ইন্টারনেটের সংযোগ নিশ্চিত করা ও ক্লাসে নিয়মিত উপস্থিত থাকা।"
                    : "Ensure reliable internet connectivity during scheduled live 1-on-1 sessions."}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
              {lang === "bn" ? "৩. শিক্ষক কোড অফ কন্ডাক্ট" : "3. Tutor Code of Conduct"}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === "bn"
                ? "সকল শিক্ষক জাতীয় পরিচয়পত্র ও বিশ্ববিদ্যালয় আইডি যাচাই সাপেক্ষে প্ল্যাটফর্মে যুক্ত হন। শিক্ষার্থীবৃন্দের মর্যাদা, নিরাপত্তা ও উপযুক্ত পঠন-পাঠনের পরিবেশ রক্ষায় আমাদের জিরো-টলারেন্স নীতি বলবৎ রয়েছে।"
                : "All mentors undergo national identity and university credential verification. We maintain strict safety and professionalism standards across all 1-on-1 live interactions."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#0D2C4A]/10 shadow-sm space-y-4">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#0D2C4A]">
              {lang === "bn" ? "৪. যোগাযোগ ও সহায়তা" : "4. Support & Modifications"}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === "bn"
                ? "শর্তাবলী সংক্রান্ত যেকোনো অনুসন্ধানের জন্য আমাদের ইমেইল support@ototeachers.com বা ফোন 01775551325 এ যোগাযোগ করা যাবে।"
                : "For questions regarding our terms, reach out at support@ototeachers.com or hotline 01775551325."}
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

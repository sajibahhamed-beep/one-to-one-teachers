"use client";

import { useLanguage } from "../context/LanguageContext";
import { Star, MapPin, CheckCircle } from "lucide-react";

export default function SuccessStories() {
  const { t, lang } = useLanguage();

  const reviews = [
    {
      name: lang === "bn" ? "মো: শফিকুল ইসলাম (অভিভাবক)" : "Md. Shafiqul Islam (Parent)",
      location: lang === "bn" ? "রংপুর সদর" : "Rangpur Sadar",
      quote:
        lang === "bn"
          ? "আমার ছেলে গণিতে খুবই দুর্বল ছিল। আলো শিক্ষার বুয়েট মেন্টরের ৬ মাসের ১-অন-১ গাইডে সে টেস্ট পরীক্ষায় জিপিএ-৫ পেয়েছে।"
          : "My son was struggling in Math. With 6 months of 1-on-1 tutoring from a BUET teacher, he achieved GPA-5 in test exams.",
      grade: lang === "bn" ? "অংকে অ গ্রেড অর্জন" : "Achieved A Grade in Math",
      rating: 5,
    },
    {
      name: lang === "bn" ? "সামিয়া আক্তার (শিক্ষার্থী)" : "Samia Akter (Student)",
      location: lang === "bn" ? "যমুনার চর এলাকা, বগুড়া" : "Jamuna Char Lands, Bogura",
      quote:
        lang === "bn"
          ? "আমাদের চরে কোনো কোচিং বা প্রাইভেট টিচার নেই। অডিও মোডে সপ্তাহে ৩ দিন ১-অন-১ স্যারের ক্লাসে ইংরেজি স্পোকেন এখন অনেক সহজ।"
          : "We have no coaching centers in our remote char land. Audio 1-on-1 classes 3 days a week made English speaking natural for me.",
      grade: lang === "bn" ? "এসএসসি বোর্ড প্রস্তুতি সম্পন্ন" : "SSC Board Prep Completed",
      rating: 5,
    },
    {
      name: lang === "bn" ? "রেজাউল করিম (অভিভাবক)" : "Rezaul Karim (Parent)",
      location: lang === "bn" ? "কুড়িগ্রাম" : "Kurigram",
      quote:
        lang === "bn"
          ? "সাধ্যমত ফি দেওয়ার সুযোগ থাকায় আমি একজন নিম্ন আয়ের বাবা হয়েও আমার মেয়েকে ঢাবির অভিজ্ঞ ১-অন-১ শিক্ষকের কাছে পড়াতে পারছি।"
          : "Thanks to the sliding scale fee model, as a low-income father I can afford a dedicated DU tutor for my daughter.",
      grade: lang === "bn" ? "এইচএসসি বোর্ড প্রস্তুতি" : "HSC Board Prep",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#F8FAFC] font-sans border-b border-[#0D2C4A]/10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-[780px] mx-auto mb-20 space-y-4">
          <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00A896] uppercase mb-3 font-bold bg-[#00A896]/10 px-4 py-1.5 rounded-full border border-[#00A896]/20">
            {t.successEyebrow}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.65] tracking-normal mb-4">
            {t.successTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-[1.9] font-normal pt-1">
            {t.successDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#0D2C4A]/10 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-[#00A896]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#00A896]" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00A896] bg-[#00A896]/10 px-3 py-1 rounded-full">
                    {rev.grade}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#0D2C4A]/85 leading-[1.85] italic font-normal">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#0D2C4A]/10 mt-6 flex items-center justify-between">
                <div>
                  <strong className="block font-sans text-sm font-extrabold text-[#0D2C4A]">
                    {rev.name}
                  </strong>
                  <div className="flex items-center gap-1 text-xs text-[#64748B] font-mono pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00A896]" />
                    <span>{rev.location}</span>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-[#00A896]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

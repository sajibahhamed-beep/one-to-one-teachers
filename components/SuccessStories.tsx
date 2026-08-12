"use client";

import Image from "next/image";
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
          ? "আমার ছেলে গণিতে খুবই দুর্বল ছিল। ototeachers.com-এর বুয়েট শিক্ষকের ৬ মাসের ব্যক্তিগত নিবিড় তত্ত্বাবধানে সে টেস্ট পরীক্ষায় জিপিএ-৫ পেয়েছে।"
          : "My son was struggling in Math. With 6 months of 1-on-1 tutoring from a BUET teacher, he achieved GPA-5 in test exams.",
      grade: lang === "bn" ? "অংকে অ গ্রেড অর্জন" : "Achieved A Grade in Math",
      rating: 5,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: lang === "bn" ? "সামিয়া আক্তার (শিক্ষার্থী)" : "Samia Akter (Student)",
      location: lang === "bn" ? "যমুনার চর এলাকা, বগুড়া" : "Jamuna Char Lands, Bogura",
      quote:
        lang === "bn"
          ? "আমাদের চরে কোনো কোচিং বা প্রাইভেট টিচার নেই। অডিও মোডে সপ্তাহে ৩ দিন স্যারের সাথে ব্যক্তিগত ক্লাসে ইংরেজি স্পোকেন এখন অনেক সহজ।"
          : "We have no coaching centers in our remote char land. Audio 1-on-1 classes 3 days a week made English speaking natural for me.",
      grade: lang === "bn" ? "এসএসসি বোর্ড প্রস্তুতি সম্পন্ন" : "SSC Board Prep Completed",
      rating: 5,
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: lang === "bn" ? "রেজাউল করিম (অভিভাবক)" : "Rezaul Karim (Parent)",
      location: lang === "bn" ? "কুড়িগ্রাম" : "Kurigram",
      quote:
        lang === "bn"
          ? "সাধ্যমত ফি দেওয়ার সুযোগ থাকায় আমি একজন নিম্ন আয়ের বাবা হয়েও আমার মেয়েকে ঢাবির অভিজ্ঞ শিক্ষকের কাছে ব্যক্তিগতভাবে পড়াতে পারছি।"
          : "Thanks to the sliding scale fee model, as a low-income father I can afford a dedicated DU tutor for my daughter.",
      grade: lang === "bn" ? "এইচএসসি বোর্ড প্রস্তুতি" : "HSC Board Prep",
      rating: 5,
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#F8FAFC] font-sans border-b border-[#0D2C4A]/10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-[780px] mx-auto mb-20 space-y-4">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.35] tracking-normal mb-4">
            {t.successTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-[1.9] font-normal pt-1">
            {t.successDesc}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="relative bg-white border border-[#0D2C4A]/12 rounded-3xl p-7 sm:p-8 shadow-[0_4px_20px_-4px_rgba(13,44,74,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(13,44,74,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Badge — top right corner */}
              <span className="absolute top-5 right-5 text-xs font-mono font-bold text-[#0D2C4A] bg-[#F0FDF9] px-3 py-1 rounded-full border border-[#00A896]/25">
                {rev.grade}
              </span>

              <div className="space-y-4 pt-2">
                {/* Stars — yellow */}
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#0D2C4A]/90 leading-relaxed italic font-normal">
                  "{rev.quote}"
                </p>
              </div>

              {/* Footer — guardian photo + name + location */}
              <div className="pt-6 border-t border-[#0D2C4A]/10 mt-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Guardian / Student Image */}
                  <Image
                    src={rev.img}
                    alt={rev.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#00A896]/30 flex-shrink-0 shadow-sm"
                  />
                  <div className="min-w-0">
                    <strong className="block font-sans text-sm font-extrabold text-[#0D2C4A] truncate">
                      {rev.name}
                    </strong>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-mono pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00A896] flex-shrink-0" />
                      <span className="truncate">{rev.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-1.5 rounded-full bg-[#00A896]/10 text-[#00A896] flex-shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

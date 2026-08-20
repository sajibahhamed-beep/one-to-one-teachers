"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, Clock, User, CheckCircle2, ArrowRight } from "lucide-react";

interface BatchScheduleProps {
  onOpenEnroll: () => void;
}

export default function BatchSchedule({ onOpenEnroll }: BatchScheduleProps) {
  const { t, lang } = useLanguage();

  const slots = [
    {
      id: "b1",
      subject: lang === "bn" ? "উচ্চতর গণিত ও বীজগণিত মেন্টর" : "Higher Math & Algebra Tutor",
      mentor: lang === "bn" ? "নুসরাত জাহান (বুয়েট সিএসই)" : "Nusrat Jahan (BUET CSE)",
      schedule: lang === "bn" ? "প্রতি মঙ্গলবার ও বৃহস্পতিবার · সন্ধ্যা ৭:০০" : "Tue & Thu · 7:00 PM",
      startDate: lang === "bn" ? "চলতি সপ্তাহে শুরু" : "Starts This Week",
      seats: lang === "bn" ? "২টি শিক্ষার্থী স্লট খালি" : "2 Learner Slots Open",
      track: lang === "bn" ? "বোর্ড মেন্টরিং" : "Board Mentorship",
      img: "/hero/hero-teacher.webp",
    },
    {
      id: "b2",
      subject: lang === "bn" ? "স্পোকেন ও ফ্লুয়েন্ট ইংলিশ মেন্টর" : "Spoken & Fluent English Mentor",
      mentor: lang === "bn" ? "তানভীর হাসান (ঢাবি আইবিএ)" : "Tanvir Hasan (DU IBA)",
      schedule: lang === "bn" ? "প্রতি সোম ও বুধবার · রাত ৮:৩০" : "Mon & Wed · 8:30 PM",
      startDate: lang === "bn" ? "প্রতি সপ্তাহে নতুন স্লট" : "Weekly New Slots",
      seats: lang === "bn" ? "১টি শিক্ষার্থী স্লট খালি" : "1 Learner Slot Open",
      track: lang === "bn" ? "স্পোকেন মেন্টরিং" : "Spoken Mentorship",
      img: "/hero/hero-student-boy.webp",
    },
    {
      id: "b3",
      subject: lang === "bn" ? "পদার্থবিজ্ঞান গাণিতিক অংক মেন্টর" : "Physics Problem Solving Mentor",
      mentor: lang === "bn" ? "রাকিবুল ইসলাম (ঢাকা মেডিকেল)" : "Rakibul Islam (DMC)",
      schedule: lang === "bn" ? "প্রতি শনি ও রবিবার · বিকেল ৪:০০" : "Sat & Sun · 4:00 PM",
      startDate: lang === "bn" ? "চলতি সপ্তাহে শুরু" : "Starts This Week",
      seats: lang === "bn" ? "৩টি শিক্ষার্থী স্লট খালি" : "3 Learner Slots Open",
      track: lang === "bn" ? "সায়েন্স মেন্টরিং" : "Science Mentorship",
      img: "/hero/hero-student-girl.webp",
    },
    {
      id: "b4",
      subject: lang === "bn" ? "আইসিটি ও এইচএসসি প্রোগ্রামিং মেন্টর" : "ICT & Programming Mentor",
      mentor: lang === "bn" ? "ফারহানা করিম (সাস্ট সিএসই)" : "Farhana Karim (SUST CSE)",
      schedule: lang === "bn" ? "প্রতি শুক্র ও শনিবার · সন্ধ্যা ৬:৩০" : "Fri & Sat · 6:30 PM",
      startDate: lang === "bn" ? "প্রতি সপ্তাহে নতুন স্লট" : "Weekly New Slots",
      seats: lang === "bn" ? "২টি শিক্ষার্থী স্লট খালি" : "2 Learner Slots Open",
      track: lang === "bn" ? "আইসিটি মেন্টরিং" : "ICT Mentorship",
      img: "/images/online-teaching-meeting.webp",
    },
  ];

  return (
    <section id="batches" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="mb-12">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.35] mb-4">
              {t.batchTitle}
            </h2>
            <p className="text-base text-[#475569] leading-relaxed max-w-xl">
              {t.batchDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="bg-white border border-[#0D2C4A]/12 rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(13,44,74,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(13,44,74,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Slot Header Image Banner (Clean, no badges overlaying) */}
                <div className="relative h-44 sm:h-48 w-full mb-5 rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={slot.img}
                    alt={slot.subject}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Badges placed cleanly under the image */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#00A896]/10 text-[#00A896] border border-[#00A896]/20">
                    {slot.track}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#00A896]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {slot.seats}
                  </span>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[#0D2C4A] leading-snug mb-4 group-hover:text-[#00A896] transition-colors">
                  {slot.subject}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-[#0D2C4A]/85 mb-6 bg-[#F8FAFC] p-4 sm:p-5 rounded-2xl border border-[#0D2C4A]/10">
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                    <span>
                      <strong className="text-[#0D2C4A]">{lang === "bn" ? "ডেডিকেটেড মেন্টর:" : "Assigned Mentor:"}</strong> {slot.mentor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                    <span>
                      <strong className="text-[#0D2C4A]">{lang === "bn" ? "সাপ্তাহিক সময়:" : "Weekly Slot:"}</strong> {slot.schedule}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#00A896] flex-shrink-0" />
                    <span>
                      <strong className="text-[#0D2C4A]">{lang === "bn" ? "মেন্টরিং শুরু:" : "Mentorship Starts:"}</strong> {slot.startDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#0D2C4A]/10 pt-4 mt-2">
                <span className="text-xs text-[#64748B] font-mono font-semibold">
                  {lang === "bn" ? "ব্যক্তিগত লাইভ সেশন" : "1-on-1 Live Session"}
                </span>
                <button
                  onClick={onOpenEnroll}
                  className="px-5 py-2.5 rounded-full bg-[#00A896] text-white font-extrabold text-xs hover:bg-[#008075] transition-all shadow-md shadow-[#00A896]/20 hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <span>{t.batchJoinNow}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


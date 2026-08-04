"use client";

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
      mentor: lang === "bn" ? "নুসরাত জাহান (বুয়েট)" : "Nusrat Jahan (BUET)",
      schedule: lang === "bn" ? "প্রতি মঙ্গলবার ও বৃহস্পতিবার · সন্ধ্যা ৭:০০" : "Tue & Thu · 7:00 PM",
      startDate: lang === "bn" ? "১০ আগস্ট, ২০২৬" : "August 10, 2026",
      seats: lang === "bn" ? "২টি শিক্ষার্থী স্লট খালি" : "2 Learner Slots Open",
      track: lang === "bn" ? "বোর্ড মেন্টরিং" : "Board Mentorship",
    },
    {
      id: "b2",
      subject: lang === "bn" ? "স্পোকেন ও ফ্লুয়েন্ট ইংলিশ মেন্টর" : "Spoken & Fluent English Mentor",
      mentor: lang === "bn" ? "তানভীর হাসান (ঢাবি আইবিএ)" : "Tanvir Hasan (DU IBA)",
      schedule: lang === "bn" ? "প্রতি সোম ও বুধবার · রাত ৮:৩০" : "Mon & Wed · 8:30 PM",
      startDate: lang === "bn" ? "১২ আগস্ট, ২০২৬" : "August 12, 2026",
      seats: lang === "bn" ? "১টি শিক্ষার্থী স্লট খালি" : "1 Learner Slot Open",
      track: lang === "bn" ? "স্পোকেন মেন্টরিং" : "Spoken Mentorship",
    },
    {
      id: "b3",
      subject: lang === "bn" ? "পদার্থবিজ্ঞান গাণিতিক অংক মেন্টর" : "Physics Problem Solving Mentor",
      mentor: lang === "bn" ? "রাকিবুল ইসলাম (ঢাকা মেডিকেল)" : "Rakibul Islam (DMC)",
      schedule: lang === "bn" ? "প্রতি শনি ও রবিবার · বিকেল ৪:০০" : "Sat & Sun · 4:00 PM",
      startDate: lang === "bn" ? "১৫ আগস্ট, ২০২৬" : "August 15, 2026",
      seats: lang === "bn" ? "৩টি শিক্ষার্থী স্লট খালি" : "3 Learner Slots Open",
      track: lang === "bn" ? "সায়েন্স মেন্টরিং" : "Science Mentorship",
    },
    {
      id: "b4",
      subject: lang === "bn" ? "আইসিটি ও এইচএসসি প্রোগ্রামিং মেন্টর" : "ICT & Programming Mentor",
      mentor: lang === "bn" ? "ফারহানা করিম (সাস্ট সিএসই)" : "Farhana Karim (SUST CSE)",
      schedule: lang === "bn" ? "প্রতি শুক্র ও শনিবার · সন্ধ্যা ৬:৩০" : "Fri & Sat · 6:30 PM",
      startDate: lang === "bn" ? "১৮ আগস্ট, ২০২৬" : "August 18, 2026",
      seats: lang === "bn" ? "২টি শিক্ষার্থী স্লট খালি" : "2 Learner Slots Open",
      track: lang === "bn" ? "আইসিটি মেন্টরিং" : "ICT Mentorship",
    },
  ];

  return (
    <section id="batches" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="eyebrow inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00A896] uppercase mb-3 font-bold bg-[#00A896]/10 px-3 py-1 rounded-full border border-[#00A896]/20">
              {t.batchEyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0D2C4A]">
              {t.batchTitle}
            </h2>
            <p className="mt-2 text-sm text-[#0D2C4A]/70 max-w-xl">
              {t.batchDesc}
            </p>
          </div>
          <button
            onClick={onOpenEnroll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D2C4A] text-white font-semibold text-xs hover:bg-[#16385C] transition-colors"
          >
            <span>{lang === "bn" ? "সব মেন্টর স্লট দেখুন" : "View All Mentor Slots"}</span>
            <ArrowRight className="w-4 h-4 text-[#00A896]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="bg-white border border-[#0D2C4A]/12 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-[#00A896]/10 text-[#00A896]">
                    {slot.track}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#00A896] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {slot.seats}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#0D2C4A] mb-3">
                  {slot.subject}
                </h3>

                <div className="space-y-2 text-xs text-[#0D2C4A]/80 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00A896]" />
                    <span>
                      <b>{lang === "bn" ? "ডেডিকেটেড মেন্টর:" : "Assigned Mentor:"}</b> {slot.mentor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00A896]" />
                    <span>
                      <b>{lang === "bn" ? "সাপ্তাহিক সময়:" : "Weekly Slot:"}</b> {slot.schedule}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00A896]" />
                    <span>
                      <b>{lang === "bn" ? "মেন্টরিং শুরু:" : "Mentorship Starts:"}</b> {slot.startDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#0D2C4A]/10 pt-4 mt-2">
                <span className="text-xs text-[#0D2C4A]/60 font-mono">
                  {lang === "bn" ? "১-অন-১ লাইভ সেশন" : "1-on-1 Live Session"}
                </span>
                <button
                  onClick={onOpenEnroll}
                  className="btn btn-teal px-5 py-2 rounded-full bg-[#00A896] text-white font-bold text-xs hover:bg-[#008075] transition-all"
                >
                  {t.batchJoinNow}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { X, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, UserCheck } from "lucide-react";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  initialFee?: number;
}

export default function EnrollModal({
  isOpen,
  onClose,
  initialPlan = "Pay-what-you-can",
  initialFee = 600,
}: EnrollModalProps) {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("Class IX");
  const [district, setDistrict] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Mathematics"]);
  const [preferredTime, setPreferredTime] = useState("7:00 PM Evening");
  const [medium, setMedium] = useState("Bangla Medium");
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [fee, setFee] = useState(initialFee);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitted(false);
      setSelectedPlan(initialPlan);
      setFee(initialFee);
    }
  }, [isOpen, initialPlan, initialFee]);

  if (!isOpen) return null;

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          phone,
          grade,
          district,
          selectedSubjects,
          preferredTime,
          medium,
          selectedPlan,
          fee,
        }),
      });
    } catch (err) {
      console.error("Enrollment POST error", err);
    }
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      onClick={resetForm}
      className="fixed inset-0 z-[9999] bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFFFF] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-[#0D2C4A]/10 my-8 animate-in zoom-in-95 duration-200 cursor-default"
      >
        <button
          onClick={resetForm}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#0D2C4A]/10 text-[#0D2C4A] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00A896] uppercase tracking-wider mb-2 font-bold">
                <Sparkles className="w-4 h-4 text-[#00A896]" />
                <span>
                  {lang === "bn"
                    ? `ধাপ ${step} (মোট ৪) — ব্যক্তিগত শিক্ষক রিকোয়েস্ট`
                    : `Step ${step} of 4 — Request 1-on-1 Mentor`}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0D2C4A]">
                {step === 1 && (lang === "bn" ? "শিক্ষার্থীর তথ্য দিন" : "Tell us about the learner")}
                {step === 2 && (lang === "bn" ? "কোন বিষয়ের মেন্টর প্রয়োজন?" : "Which subject mentor do you need?")}
                {step === 3 && (lang === "bn" ? "সাপ্তাহিক সময়সূচি ও মাধ্যম" : "Preferred schedule & medium")}
                {step === 4 && (lang === "bn" ? "মেন্টর ম্যাচিং নিশ্চিত করুন" : "Confirm mentor matching")}
              </h3>
            </div>

            <div className="w-full bg-[#0D2C4A]/10 h-1.5 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-[#00A896] h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-1.5">
                      {lang === "bn" ? "শিক্ষার্থীর পূর্ণ নাম *" : "Student's Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === "bn" ? "যেমন: সুমাইয়া আক্তার / তানভীর আহমেদ" : "e.g. Sumaiya Akter / Tanvir Ahmed"}
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#0D2C4A]/20 bg-[#F8FAFC] text-sm focus:outline-none focus:border-[#00A896]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-1.5">
                        {lang === "bn" ? "শ্রেণি / ক্লাসরুম *" : "Class / Grade *"}
                      </label>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#0D2C4A]/20 bg-[#F8FAFC] text-sm focus:outline-none focus:border-[#00A896]"
                      >
                        <option>Class VI – VIII</option>
                        <option>Class IX (SSC Prep)</option>
                        <option>Class X (SSC Prep)</option>
                        <option>HSC 1st Year</option>
                        <option>HSC 2nd Year</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-1.5">
                        {lang === "bn" ? "নিজ জেলা *" : "Home District *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === "bn" ? "যেমন: রংপুর / কুড়িগ্রাম / ঢাকা" : "e.g. Rangpur / Kurigram"}
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#0D2C4A]/20 bg-[#F8FAFC] text-sm focus:outline-none focus:border-[#00A896]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-1.5">
                      {lang === "bn" ? "অভিভাবকের মোবাইল / হোয়াটসঅ্যাপ নম্বর *" : "Parent Mobile / WhatsApp Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01700000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#0D2C4A]/20 bg-[#F8FAFC] text-sm focus:outline-none focus:border-[#00A896]"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-xs text-[#0D2C4A]/70 mb-4">
                    {lang === "bn"
                      ? "যে যে বিষয়ে আপনার মেন্টর প্রয়োজন তা নির্বাচন করুন:"
                      : "Select subjects where you need a dedicated tutor:"}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      lang === "bn" ? "গণিত ও বীজগণিত" : "Mathematics",
                      lang === "bn" ? "ইংরেজি ব্যাকরণ" : "English Grammar",
                      lang === "bn" ? "স্পোকেন ইংলিশ" : "Spoken English",
                      lang === "bn" ? "পদার্থবিজ্ঞান" : "Physics",
                      lang === "bn" ? "রসায়ন" : "Chemistry",
                      lang === "bn" ? "জীববিজ্ঞান" : "Biology",
                      lang === "bn" ? "আইসিটি ও কম্পিউটার" : "ICT & Computer",
                      lang === "bn" ? "হিসাববিজ্ঞান" : "Accounting",
                    ].map((subject) => {
                      const isSelected = selectedSubjects.includes(subject);
                      return (
                        <button
                          type="button"
                          key={subject}
                          onClick={() => toggleSubject(subject)}
                          className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-[#0D2C4A] text-[#FFFFFF] border-[#0D2C4A] shadow-sm"
                              : "bg-[#F8FAFC] border-[#0D2C4A]/15 text-[#0D2C4A]/80 hover:bg-[#0D2C4A]/5"
                          }`}
                        >
                          <span>{subject}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00A896]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-2">
                      {lang === "bn" ? "পড়ালেখার মাধ্যম" : "Medium of Instruction"}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        lang === "bn" ? "বাংলা মাধ্যম" : "Bangla Medium",
                        lang === "bn" ? "ইংরেজি ভার্সন" : "English Version",
                      ].map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => setMedium(m)}
                          className={`p-3 rounded-xl border text-xs font-medium ${
                            medium === m
                              ? "bg-[#00A896] text-white border-[#00A896]"
                              : "bg-[#F8FAFC] border-[#0D2C4A]/20 text-[#0D2C4A]"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-2">
                      {lang === "bn" ? "পছন্দের সাপ্তাহিক মেন্টরিং সময়" : "Preferred Weekly Slot"}
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#0D2C4A]/20 bg-[#F8FAFC] text-sm"
                    >
                      <option>{lang === "bn" ? "সন্ধ্যা ৭:০০ (সুপারিশকৃত)" : "7:00 PM Evening (Recommended)"}</option>
                      <option>{lang === "bn" ? "বিকেল ৪:০০" : "4:00 PM Afternoon"}</option>
                      <option>{lang === "bn" ? "রাত ৮:৩০" : "8:30 PM Night"}</option>
                      <option>{lang === "bn" ? "সকাল ১০:০০ (ছুটির দিন)" : "10:00 AM Weekend"}</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#0D2C4A]/15">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono text-[#00A896] uppercase font-bold">
                        {lang === "bn" ? "নির্বাচিত প্ল্যান:" : "Selected Plan:"}
                      </span>
                      <span className="text-sm font-bold text-[#0D2C4A]">
                        {selectedPlan}
                      </span>
                    </div>
                    <div className="text-2xl font-serif font-bold text-[#0D2C4A] mb-1">
                      ৳{fee} <span className="text-xs font-normal text-[#0D2C4A]/60">/{lang === "bn" ? "মাস" : "month"}</span>
                    </div>
                    <p className="text-xs text-[#0D2C4A]/70">
                      {lang === "bn"
                        ? "৪৮ ঘণ্টার মধ্যে বুয়েট/ঢাবি মেন্টর বরাদ্দ ও প্রথম সেশন ১০০% ফ্রি।"
                        : "Includes 1-on-1 dedicated mentor match within 48h & first session free."}
                    </p>
                  </div>

                  <div className="bg-[#00A896]/10 p-4 rounded-2xl text-xs text-[#00A896] space-y-1 font-semibold">
                    <p className="font-bold">{lang === "bn" ? "✨ পরবর্তী ধাপ কী?" : "✨ Next Steps"}</p>
                    <p>
                      {lang === "bn"
                        ? `আমাদের মেন্টর সমন্বয়কারী আপনার সাথে হোয়াটসঅ্যাপে (${phone || "আপনার নম্বর"}) ৪৮ ঘণ্টার মধ্যে যোগাযোগ করবেন।`
                        : `Our match coordinator will contact you on WhatsApp at ${phone || "your number"} within 48 hours.`}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#0D2C4A]/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#0D2C4A]/70 hover:text-[#0D2C4A]"
                  >
                    <ArrowLeft className="w-4 h-4" /> {lang === "bn" ? "পেছনে" : "Back"}
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && (!studentName || !district || !phone)) {
                        alert(lang === "bn" ? "দয়া করে নাম, জেলা এবং ফোন নম্বর লিখুন।" : "Please fill in student name, district, and contact number.");
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="btn btn-primary flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0D2C4A] text-white text-sm font-semibold hover:bg-[#16385C]"
                  >
                    {lang === "bn" ? "পরবর্তী ধাপ" : "Next Step"} <ArrowRight className="w-4 h-4 text-[#00A896]" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-teal flex items-center gap-2 px-8 py-3 rounded-full bg-[#00A896] text-white font-bold text-sm hover:bg-[#008075] transition-all shadow-md"
                  >
                    {lang === "bn" ? "মেন্টর রিকোয়েস্ট জমা দিন" : "Submit Mentor Request"} <UserCheck className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#00A896] text-[#FFFFFF] mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-3xl font-semibold text-[#0D2C4A]">
              {lang === "bn" ? "মেন্টর রিকোয়েস্ট গৃহীত হয়েছে!" : "Mentor Request Received!"}
            </h3>
            <p className="text-sm text-[#0D2C4A]/75 max-w-md mx-auto leading-relaxed">
              {lang === "bn"
                ? `ধন্যবাদ, ${studentName}! আমাদের মেন্টর সমন্বয়কারী ৪৮ ঘণ্টার মধ্যে ${phone} নম্বরে যোগাযোগ করবেন।`
                : `Thank you, ${studentName}! Our matching coordinator will reach out to ${phone} within 48 hours.`}
            </p>
            <button
              onClick={resetForm}
              className="btn btn-primary px-8 py-3 rounded-full bg-[#0D2C4A] text-white font-semibold text-sm mt-4"
            >
              {lang === "bn" ? "সম্পন্ন" : "Done"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

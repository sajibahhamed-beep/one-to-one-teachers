"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  UserCheck,
  Check,
} from "lucide-react";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  initialFee?: number;
}

export default function EnrollModal({
  isOpen,
  onClose,
  initialPlan = "Student Request",
  initialFee = 0,
}: EnrollModalProps) {
  const { lang } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("Class IX (SSC Prep)");
  const [medium, setMedium] = useState("Bangla Medium");
  const [district, setDistrict] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Mathematics"]);
  const [preferredTime, setPreferredTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

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

  const handleNextFromStep1 = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!studentName.trim()) {
      alert(lang === "bn" ? "দয়া করে শিক্ষার্থীর নাম লিখুন।" : "Please enter student's full name.");
      return;
    }
    if (!district.trim()) {
      alert(lang === "bn" ? "দয়া করে নিজ জেলা লিখুন।" : "Please enter home district.");
      return;
    }
    if (!phone.trim()) {
      alert(lang === "bn" ? "দয়া করে অভিভাবকের মোবাইল নম্বর লিখুন।" : "Please enter parent's contact number.");
      return;
    }
    setStep(2);
  };

  const handleNextFromStep2 = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedSubjects.length === 0) {
      alert(lang === "bn" ? "দয়া করে অন্তত একটি বিষয় নির্বাচন করুন।" : "Please select at least one subject.");
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitting(true);
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
          selectedPlan: initialPlan || "Student Request",
          fee: initialFee || 0,
        }),
      });
    } catch (err) {
      console.error("Enrollment POST error", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      onClick={resetForm}
      className="fixed inset-0 z-[9999] bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFFFF] rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-[#0D2C4A]/10 my-8 animate-in zoom-in-95 duration-200 cursor-default"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={resetForm}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#0D2C4A]/10 text-[#0D2C4A] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header Steps Badge */}
            <div className="mb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00A896] uppercase tracking-wider mb-1 font-bold">
                <Sparkles className="w-4 h-4 text-[#00A896]" />
                <span>
                  {lang === "bn"
                    ? `ধাপ ${step} (মোট ৩) — ব্যক্তিগত শিক্ষক রিকোয়েস্ট`
                    : `Step ${step} of 3 — Request 1-on-1 Mentor`}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0D2C4A]">
                {step === 1 && (lang === "bn" ? "শিক্ষার্থীর তথ্য দিন" : "Tell us about the learner")}
                {step === 2 && (lang === "bn" ? "কোন বিষয়ের মেন্টর প্রয়োজন?" : "Which subject mentor do you need?")}
                {step === 3 && (lang === "bn" ? "সাপ্তাহিক সময়সূচি ও মাধ্যম" : "Preferred schedule & medium")}
              </h3>
            </div>

            {/* Sleek Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-[#00A896] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <div>
              {/* STEP 1: Student Information (Clean: Name, Class with Others, District, Phone. NO Medium field) */}
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
                      <option>Others</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-1.5">
                        {lang === "bn" ? "নিজ জেলা *" : "Home District *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === "bn" ? "যেমন: রংপুর / ঢাকা" : "e.g. Rangpur / Dhaka"}
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#0D2C4A]/20 bg-[#F8FAFC] text-sm focus:outline-none focus:border-[#00A896]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-1.5">
                        {lang === "bn" ? "মোবাইল / হোয়াটসঅ্যাপ *" : "Mobile / WhatsApp *"}
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
                </div>
              )}

              {/* STEP 2: Subject Selection */}
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
                      lang === "bn" ? "অন্যান্য" : "Others",
                    ].map((subject) => {
                      const isSelected = selectedSubjects.includes(subject);
                      return (
                        <button
                          type="button"
                          key={subject}
                          onClick={() => toggleSubject(subject)}
                          className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
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

              {/* STEP 3: Preferred Schedule & Medium Selection (Strictly 2 medium choices) */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-2">
                      {lang === "bn" ? "পড়ালেখার মাধ্যম (২টি অপশন) *" : "Medium of Instruction (2 Choices) *"}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "Bangla Medium", labelBn: "বাংলা মাধ্যম", labelEn: "Bangla Medium" },
                        { id: "English Version", labelBn: "ইংরেজি ভার্সন", labelEn: "English Version" },
                      ].map((opt) => {
                        const isSelected = medium === opt.id || medium === opt.labelBn || medium === opt.labelEn;
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => setMedium(opt.id)}
                            className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? "bg-[#0D2C4A] text-[#FFFFFF] border-[#0D2C4A] shadow-md ring-2 ring-[#00A896]"
                                : "bg-[#F8FAFC] border-[#0D2C4A]/15 text-[#0D2C4A]/80 hover:bg-[#0D2C4A]/5"
                            }`}
                          >
                            <span>{lang === "bn" ? opt.labelBn : opt.labelEn}</span>
                            {isSelected && <Check className="w-5 h-5 text-[#00A896]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#0D2C4A]/80 mb-1.5">
                      {lang === "bn" ? "পছন্দের সাপ্তাহিক সময় ও দিন *" : "Preferred Weekly Time & Days *"}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        lang === "bn"
                          ? "যেমন: প্রতিদিন সন্ধ্যা ৭:০০ / শুক্র ও শনিবার সকাল ১০:০০"
                          : "e.g. Daily 7:00 PM / Friday & Saturday 10:00 AM / Flexible"
                      }
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#0D2C4A]/20 bg-[#F8FAFC] text-sm focus:outline-none focus:border-[#00A896]"
                    />
                  </div>

                  <div className="bg-[#00A896]/10 p-3.5 rounded-2xl text-xs text-[#00A896] font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>
                      {lang === "bn"
                        ? "১ম লাইভ ট্রায়াল ক্লাস সম্পূর্ণ ফ্রি। সাবমিট করার পর আমাদের টিম ৪৮ ঘণ্টার মধ্যে যোগাযোগ করবে।"
                        : "Your 1st live trial session is 100% free. We will reach out within 48 hours."}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#0D2C4A]/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setStep(step - 1);
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#0D2C4A]/70 hover:text-[#0D2C4A] py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> {lang === "bn" ? "পেছনে" : "Back"}
                  </button>
                ) : (
                  <div />
                )}

                {step === 1 && (
                  <button
                    type="button"
                    onClick={handleNextFromStep1}
                    className="btn btn-primary flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0D2C4A] text-white text-sm font-semibold hover:bg-[#16385C] transition-all shadow-sm cursor-pointer"
                  >
                    {lang === "bn" ? "পরবর্তী ধাপ" : "Next Step"} <ArrowRight className="w-4 h-4 text-[#00A896]" />
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="button"
                    onClick={handleNextFromStep2}
                    className="btn btn-primary flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0D2C4A] text-white text-sm font-semibold hover:bg-[#16385C] transition-all shadow-sm cursor-pointer"
                  >
                    {lang === "bn" ? "পরবর্তী ধাপ" : "Next Step"} <ArrowRight className="w-4 h-4 text-[#00A896]" />
                  </button>
                )}

                {step === 3 && (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="btn btn-teal flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#00A896] text-white font-bold text-sm hover:bg-[#008075] transition-all shadow-lg hover:scale-105 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting
                      ? (lang === "bn" ? "জমা হচ্ছে..." : "Submitting...")
                      : (lang === "bn" ? "✓ মেন্টর রিকোয়েস্ট জমা দিন" : "✓ Submit Mentor Request")}
                    <UserCheck className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Final Confirmation / Success Screen */
          <div className="text-center py-6 sm:py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#00A896] text-[#FFFFFF] mx-auto flex items-center justify-center shadow-lg animate-in zoom-in-75 duration-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D2C4A]">
                {lang === "bn" ? "মেন্টর রিকোয়েস্ট গৃহীত হয়েছে!" : "Mentor Request Received!"}
              </h3>
              <p className="text-sm text-[#0D2C4A]/70 mt-1">
                {lang === "bn"
                  ? `ধন্যবাদ, ${studentName || "শিক্ষার্থী"}! আপনার আবেদন সফলভাবে সম্পন্ন হয়েছে।`
                  : `Thank you, ${studentName || "Learner"}! Your request has been successfully submitted.`}
              </p>
            </div>

            {/* Prominently Highlighted 48-Hour Contact Notice */}
            <div className="bg-gradient-to-br from-[#00A896]/10 to-[#0D2C4A]/5 border-2 border-[#00A896]/30 rounded-2xl p-5 text-left max-w-md mx-auto shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#00A896] font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{lang === "bn" ? "পরবর্তী পদক্ষেপ" : "Next Step"}</span>
              </div>
              <p className="text-base sm:text-lg font-extrabold text-[#0D2C4A] leading-snug">
                {lang === "bn"
                  ? `আমাদের মেন্টর সমন্বয়কারী আগামী ৪৮ ঘণ্টার মধ্যে আপনার সাথে সরাসরি যোগাযোগ করবেন।`
                  : `Our matching coordinator will reach out to you within 48 hours.`}
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#00A896] flex items-center gap-1.5 pt-1">
                <span>📱 {phone ? (lang === "bn" ? `যোগাযোগের নম্বর: ${phone}` : `Contact Phone: ${phone}`) : (lang === "bn" ? "হোয়াটসঅ্যাপ বা ফোনের মাধ্যমে" : "Via WhatsApp / Phone")}</span>
              </p>
            </div>

            <p className="text-xs text-[#0D2C4A]/60 max-w-sm mx-auto">
              {lang === "bn"
                ? "✨ আপনার ১ম ১-অন-১ লাইভ ট্রায়াল ক্লাস ১০০% ফ্রি — অগ্রিম কোনো পেমেন্ট লাগবে না।"
                : "✨ Your 1st 1-on-1 live trial class is 100% free with no upfront payment."}
            </p>

            <button
              type="button"
              onClick={resetForm}
              className="btn btn-primary px-10 py-3.5 rounded-full bg-[#0D2C4A] text-white font-bold text-base hover:bg-[#16385C] transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              {lang === "bn" ? "সম্পন্ন (Done)" : "Done"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

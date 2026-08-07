"use client";

import { useState } from "react";
import { X, CheckCircle2, ArrowRight, ArrowLeft, HeartHandshake, Award } from "lucide-react";

interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MentorModal({ isOpen, onClose }: MentorModalProps) {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [subjectExpertise, setSubjectExpertise] = useState("Mathematics");
  const [hoursPerWeek, setHoursPerWeek] = useState("2-4 hours");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/teacher-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          institution,
          subjectExpertise,
          hoursPerWeek,
          email,
          phone,
        }),
      });
    } catch (err) {
      console.error("Failed to submit tutor application", err);
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
      className="fixed inset-0 z-[9999] bg-[#12213D]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FBF7EF] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-[#12213D]/10 my-8 animate-in zoom-in-95 duration-200 cursor-default"
      >
        <button
          onClick={resetForm}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#12213D]/10 text-[#12213D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#0B4F4A] uppercase tracking-wider mb-2">
                <HeartHandshake className="w-4 h-4 text-[#F2542D]" />
                <span>Join Alo Shikkha as a Mentor</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12213D]">
                {step === 1 && "Personal & Academic Info"}
                {step === 2 && "Teaching Expertise & Availability"}
                {step === 3 && "Contact & Verification"}
              </h3>
            </div>

            <div className="w-full bg-[#12213D]/10 h-1.5 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-[#0B4F4A] h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nusrat Jahan / Shafiqul Islam"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                      University / Institution / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BUET, Dhaka University, NSU, SUST, etc."
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                      Subject You Wish to Teach *
                    </label>
                    <select
                      value={subjectExpertise}
                      onChange={(e) => setSubjectExpertise(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                    >
                      <option>Mathematics (SSC & HSC)</option>
                      <option>English Language & Spoken</option>
                      <option>Physics & Chemistry</option>
                      <option>Biology & Life Science</option>
                      <option>ICT & Web Basics</option>
                      <option>Accounting & Commerce</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                      Weekly Time Commitment *
                    </label>
                    <select
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                    >
                      <option>2-4 hours / week (1-2 students)</option>
                      <option>4-8 hours / week (2-4 students)</option>
                      <option>8+ hours / week</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. mentor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01800000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#12213D]/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#12213D]/70 hover:text-[#12213D]"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && (!fullName || !institution)) {
                        alert("Please fill in your name and institution.");
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="btn btn-primary flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#12213D] text-[#FBF7EF] text-sm font-semibold"
                  >
                    Next step <ArrowRight className="w-4 h-4 text-[#FFB627]" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-gold flex items-center gap-2 px-8 py-3 rounded-full bg-[#FFB627] text-[#12213D] font-bold text-sm hover:shadow-lg transition-all"
                  >
                    Submit Mentor Application <Award className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#0B4F4A] text-[#FBF7EF] mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-[#FFB627]" />
            </div>
            <h3 className="font-serif text-3xl font-semibold text-[#12213D]">
              Welcome to the Mentor Community!
            </h3>
            <p className="text-sm text-[#12213D]/75 max-w-md mx-auto leading-relaxed">
              Thank you, <b>{fullName}</b>! We have received your application. Our mentor onboarding team will review your profile and send training materials to <b>{email}</b> within 24 hours.
            </p>
            <button
              onClick={resetForm}
              className="btn btn-primary px-8 py-3 rounded-full bg-[#12213D] text-[#FBF7EF] font-semibold text-sm mt-4"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

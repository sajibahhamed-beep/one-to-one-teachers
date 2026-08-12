"use client";

import { useState } from "react";
import { X, CheckCircle2, ArrowRight, ArrowLeft, HeartHandshake, Award, Upload, User, Camera, Sparkles } from "lucide-react";

interface MentorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MentorModal({ isOpen, onClose }: MentorModalProps) {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [avatar, setAvatar] = useState("");
  const [subjectExpertise, setSubjectExpertise] = useState("Mathematics (SSC & HSC)");
  const [hoursPerWeek, setHoursPerWeek] = useState("2-4 hours");
  const [experience, setExperience] = useState("২+ বছর টিউশন অভিজ্ঞতা");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/teacher-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          institution,
          department,
          avatar: avatar || "/tutors/tutor-1.png",
          subjectExpertise,
          hoursPerWeek,
          experience,
          bio,
          email,
          phone,
        }),
      });
    } catch (err) {
      console.error("Failed to submit tutor application", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFullName("");
    setInstitution("");
    setDepartment("");
    setAvatar("");
    setBio("");
    setPhone("");
    setEmail("");
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
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#12213D]/10 text-[#12213D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#0B4F4A] uppercase tracking-wider mb-2">
                <HeartHandshake className="w-4 h-4 text-[#F2542D]" />
                <span>Join ototeachers.com as a Teacher</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12213D]">
                {step === 1 && "Personal & Academic Profile"}
                {step === 2 && "Teaching Expertise & Experience"}
                {step === 3 && "Contact & Verification"}
              </h3>
            </div>

            <div className="w-full bg-[#12213D]/10 h-1.5 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-[#0B4F4A] h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <form onSubmit={handleSubmit}>
              {/* STEP 1: Personal Info + Photo Upload */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* Photo Upload Area */}
                  <div className="p-4 bg-white rounded-2xl border border-[#12213D]/15 flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-2xl border-2 border-dashed border-[#0B4F4A]/40 bg-[#FBF7EF] flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                      {avatar ? (
                        <img src={avatar} alt="Profile preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center text-[#0B4F4A]/60">
                          <Camera className="w-7 h-7 mx-auto mb-0.5 text-[#0B4F4A]" />
                          <span className="text-[9px] font-bold block uppercase">Photo</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-mono font-bold uppercase text-[#12213D] mb-1">
                        Teacher Profile Photo *
                      </label>
                      <p className="text-[11px] text-[#12213D]/70 mb-2 leading-tight">
                        Upload your clear headshot (JPG, PNG). This will be displayed on your verified tutor card.
                      </p>
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B4F4A] text-white text-xs font-bold hover:bg-[#083b37] cursor-pointer transition-all shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{avatar ? "Change Photo" : "Upload Your Photo"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                        University / Institution *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BUET, DU, DMC, NSU"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                        Department / Major
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CSE, EEE, MBBS, English"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Teaching Expertise & Experience */}
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
                      <option>Higher Math & Physics</option>
                      <option>Chemistry & Biology</option>
                      <option>English Language & Spoken</option>
                      <option>ICT & Programming Basics</option>
                      <option>Accounting & Business Studies</option>
                      <option>Bangla & General Science</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                        Teaching Experience
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ২+ বছর টিউশন অভিজ্ঞতা"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                        Weekly Commitment *
                      </label>
                      <select
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                      >
                        <option>2-4 hours / week (1-2 students)</option>
                        <option>4-8 hours / week (2-4 students)</option>
                        <option>8+ hours / week (Full-time mentor)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-[#12213D]/80 mb-1.5">
                      Short Bio / Teaching Philosophy
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly describe your teaching method and passion for 1-on-1 mentorship..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#12213D]/20 bg-white text-sm focus:outline-none focus:border-[#0B4F4A]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Contact & Submit */}
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

                  {avatar && (
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
                      <img src={avatar} alt="Profile" className="w-10 h-10 rounded-xl object-cover border border-emerald-300" />
                      <div className="text-xs text-emerald-900">
                        <span className="font-bold block">✓ Photo attached</span>
                        <span className="text-[11px] text-emerald-700">Ready to submit with your application</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#12213D]/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#12213D]/70 hover:text-[#12213D] cursor-pointer"
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
                        alert("Please enter your name and university.");
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="btn btn-primary flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#12213D] text-[#FBF7EF] text-sm font-semibold cursor-pointer"
                  >
                    Next step <ArrowRight className="w-4 h-4 text-[#FFB627]" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-gold flex items-center gap-2 px-8 py-3 rounded-full bg-[#FFB627] text-[#12213D] font-bold text-sm hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"} <Award className="w-4 h-4" />
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
              Application Submitted!
            </h3>
            <p className="text-sm text-[#12213D]/75 max-w-md mx-auto leading-relaxed">
              Thank you, <b>{fullName}</b>! We have received your application with your profile details and photo. Our mentor review team will verify your credentials and send onboarding access to <b>{email}</b> shortly.
            </p>
            <button
              onClick={resetForm}
              className="btn btn-primary px-8 py-3 rounded-full bg-[#12213D] text-[#FBF7EF] font-semibold text-sm mt-4 cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  User,
  BookOpen,
  HelpCircle,
  PhoneCall,
} from "lucide-react";

export default function ContactPage() {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pay-what-you-can");
  const [selectedFee, setSelectedFee] = useState(600);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "tutor-match",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenEnroll = (planName = "Pay-what-you-can", fee = 600) => {
    setSelectedPlan(planName);
    setSelectedFee(fee);
    setEnrollModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Contact submission error", err);
    }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FBF7EF] font-sans text-[#12213D] flex flex-col">
      {/* Top Navbar */}
      <Navbar
        onOpenEnroll={() => handleOpenEnroll()}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* ===== HERO BANNER (Badge removed) ===== */}
      <section className="bg-gradient-to-br from-[#0D2C4A] via-[#12213D] to-[#00A896] text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00A896]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FFB627]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 md:px-8 relative z-10 text-center max-w-3xl">
          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.35] mb-5">
            {lang === "bn" ? "যোগাযোগ করুন" : "Contact Us"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            {lang === "bn"
              ? "১-অন-১ শিক্ষক বুকিং, আবেদন বা যেকোনো তথ্যের জন্য সরাসরি কল করুন অথবা নিচের ফর্মে বার্তা পাঠান।"
              : "Reach out to us for 1-on-1 tutor matching, applications, or inquiries. Call us directly or send a message below."}
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTACT CONTAINER ===== */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-12 md:py-14 flex-grow w-full space-y-8">
        {/* ===== FORM AND SIDEBAR SECTION (Items-stretch for equal height) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Form Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#00A896]">
                {lang === "bn" ? "মেসেজ ফরম" : "Send a Message"}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C4A]">
                {lang === "bn" ? "আমাদের বার্তা পাঠান" : "Get in Touch with Us"}
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                {lang === "bn"
                  ? "নিচের ফরমটি পূরণ করুন, আমাদের প্রতিনিধি খুব শীঘ্রই যোগাযোগ করবেন।"
                  : "Fill out the form below and our support team will reach out promptly."}
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#00A896]/10 border border-[#00A896]/30 rounded-2xl p-8 text-center space-y-4 my-auto">
                <CheckCircle className="w-14 h-14 text-[#00A896] mx-auto" />
                <h3 className="text-xl font-extrabold text-[#0D2C4A]">
                  {lang === "bn" ? "ধন্যবাদ! আপনার বার্তাটি পাঠানো হয়েছে।" : "Thank You! Message Sent."}
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  {lang === "bn"
                    ? "আমাদের টিচার ম্যাচিং টিম আপনার তথ্যানুযায়ী খুব শীঘ্রই কল করবে।"
                    : "Our teacher matching team will review your query and contact you shortly."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#00A896] text-white rounded-full text-xs font-bold hover:bg-[#008075] transition-colors cursor-pointer"
                >
                  {lang === "bn" ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0D2C4A] block">
                      {lang === "bn" ? "আপনার নাম *" : "Your Name *"}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === "bn" ? "যেমন: মো: আরিফুল ইসলাম" : "e.g. Ariful Islam"}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0D2C4A] block">
                      {lang === "bn" ? "ফোন নম্বর *" : "Phone Number *"}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="017XXXXXXXX"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0D2C4A] block">
                      {lang === "bn" ? "ইমেইল (ঐচ্ছিক)" : "Email Address (Optional)"}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@mail.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#0D2C4A] block">
                      {lang === "bn" ? "যোগাযোগের বিষয়" : "Subject of Query"}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896] bg-white"
                    >
                      <option value="tutor-match">
                        {lang === "bn" ? "১-অন-১ শিক্ষক বুকিং" : "1-on-1 Tutor Matching"}
                      </option>
                      <option value="become-tutor">
                        {lang === "bn" ? "টিচার হিসেবে যুক্ত হওয়া" : "Become a Tutor"}
                      </option>
                      <option value="sponsored">
                        {lang === "bn" ? "স্পন্সরড ফ্রি টিচার আবেদন" : "Free Sponsored Track"}
                      </option>
                      <option value="other">
                        {lang === "bn" ? "অন্যান্য অনুসন্ধান" : "Other Inquiry"}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0D2C4A] block">
                    {lang === "bn" ? "আপনার বিস্তারিত বার্তা *" : "Your Detailed Message *"}
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        lang === "bn"
                          ? "আপনার বিষয়, শ্রেণি বা পড়ার চাহিদা সম্পর্কে সংক্ষেপে লিখুন..."
                          : "Write details about student's class, subjects or tutor preference..."
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#00A896] text-white rounded-full font-extrabold text-sm hover:bg-[#008075] active:bg-[#00665E] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>{lang === "bn" ? "পাঠানো হচ্ছে..." : "Sending..."}</span>
                  ) : (
                    <>
                      <span>{lang === "bn" ? "বার্তা পাঠান" : "Submit Message"}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Info & FAQ Sidebar (Combined height equal to form) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 h-full">
            {/* Direct Hotline Box */}
            <div className="bg-[#0D2C4A] text-white rounded-3xl p-7 shadow-xl flex flex-col justify-between space-y-4 flex-1">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2 mb-2">
                  <PhoneCall className="w-5 h-5 text-[#00A896]" />
                  <span>{lang === "bn" ? "তাত্ক্ষণিক ফোন সহায়তা" : "Instant Phone Support"}</span>
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {lang === "bn"
                    ? "আমাদের ফোন লাইন যেকোনো জরুরি সহায়তা ও টিচার ম্যাচিং সহায়তার জন্য খোলা থাকে।"
                    : "Our helpline is available for urgent tutor matching & student assistance."}
                </p>
              </div>

              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#38BDF8] block font-mono">
                    {lang === "bn" ? "হটলাইন নম্বর:" : "Hotline Number:"}
                  </span>
                  <span className="text-base font-mono font-extrabold text-white">
                    01775551325
                  </span>
                </div>
                <a
                  href="tel:01775551325"
                  className="px-4 py-1.5 bg-[#00A896] hover:bg-[#008075] text-white rounded-full text-xs font-bold transition-colors"
                >
                  {lang === "bn" ? "কল দিন" : "Call"}
                </a>
              </div>
            </div>

            {/* Quick Contact FAQ Box */}
            <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-md flex flex-col justify-between space-y-4 flex-1">
              <h4 className="font-extrabold text-base text-[#0D2C4A] flex items-center gap-2 border-b border-gray-100 pb-2">
                <HelpCircle className="w-5 h-5 text-[#00A896]" />
                <span>{lang === "bn" ? "সাধারণ প্রশ্নোত্তর (FAQ)" : "Frequently Asked Questions"}</span>
              </h4>

              <div className="space-y-3 text-xs md:text-sm flex-1 flex flex-col justify-around">
                <div className="space-y-1">
                  <h5 className="font-bold text-[#0D2C4A]">
                    {lang === "bn" ? "১. মেন্টর বরাদ্দ পেতে কত সময় লাগে?" : "1. How long does tutor matching take?"}
                  </h5>
                  <p className="text-gray-600 leading-relaxed text-xs">
                    {lang === "bn"
                      ? "সাধারণত ফরম পুরণের ২৪ থেকে ৪৮ ঘণ্টার মধ্যে পার্সোনালাইজড শিক্ষক বরাদ্দ করা হয়।"
                      : "Usually within 24 to 48 hours after submitting your request."}
                  </p>
                </div>

                <div className="space-y-1 pt-1">
                  <h5 className="font-bold text-[#0D2C4A]">
                    {lang === "bn" ? "২. প্রথম সেশন কি সত্যিই ফ্রি?" : "2. Is the first trial session really free?"}
                  </h5>
                  <p className="text-gray-600 leading-relaxed text-xs">
                    {lang === "bn"
                      ? "হ্যাঁ, প্রথম ১-অন-১ ট্রায়াল সেশনটি সম্পূর্ণ ফ্রি। কোনো অগ্রিম ফি দিতে হয় না।"
                      : "Yes, the first 1-on-1 trial class is 100% free with no advance fee required."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== QUICK CONTACT INFO CARDS (CLOSER TO FORM NOW) ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {/* Card 1: Phone */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center group-hover:bg-[#00A896] group-hover:text-white transition-colors">
                <PhoneCall className="w-5.5 h-5.5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0D2C4A]">
                  {lang === "bn" ? "হটলাইন ও ফোন" : "Hotline & Phone"}
                </h3>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === "bn" ? "সকাল ৯টা - রাত ৯টা" : "9:00 AM - 9:00 PM"}
                </p>
              </div>
              <p className="font-mono text-sm font-extrabold text-[#0D2C4A]">
                01775551325
              </p>
            </div>
            <a
              href="tel:01775551325"
              className="mt-4 inline-flex items-center text-xs font-extrabold text-[#00A896] hover:text-[#008075] transition-colors"
            >
              <span>{lang === "bn" ? "সরাসরি কল করুন" : "Call Now"}</span>
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center group-hover:bg-[#00A896] group-hover:text-white transition-colors">
                <Mail className="w-5.5 h-5.5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0D2C4A]">
                  {lang === "bn" ? "ইমেইল সাপোর্ট" : "Email Support"}
                </h3>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === "bn" ? "২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হয়" : "Response within 24 hours"}
                </p>
              </div>
              <p className="font-mono text-xs md:text-sm font-bold text-[#0D2C4A] truncate">
                support@ototeachers.com
              </p>
            </div>
            <a
              href="mailto:support@ototeachers.com"
              className="mt-4 inline-flex items-center text-xs font-extrabold text-[#00A896] hover:text-[#008075] transition-colors"
            >
              <span>{lang === "bn" ? "ইমেইল পাঠান" : "Send Email"}</span>
            </a>
          </div>

          {/* Card 3: Location */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center group-hover:bg-[#00A896] group-hover:text-white transition-colors">
                <MapPin className="w-5.5 h-5.5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0D2C4A]">
                  {lang === "bn" ? "প্রধান অফিস" : "Main Office"}
                </h3>
                <p className="text-[11px] text-gray-500 font-medium">
                  {lang === "bn" ? "ধানমণ্ডি, ঢাকা" : "Dhanmondi, Dhaka"}
                </p>
              </div>
              <p className="text-xs text-[#0D2C4A] font-medium leading-relaxed">
                {lang === "bn"
                  ? "ধানমণ্ডি ৩২, রোড ৭/এ, ঢাকা ১২০৯, বাংলাদেশ"
                  : "Dhanmondi 32, Road 7/A, Dhaka 1209, Bangladesh"}
              </p>
            </div>
            <span className="mt-4 text-xs font-extrabold text-[#00A896]">
              {lang === "bn" ? "অফিস দেখার সময়: শনি - বৃহঃ" : "Visiting Hours: Sat - Thu"}
            </span>
          </div>

          {/* Card 4: Free Trial Request */}
          <div className="bg-[#0D2C4A] text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#00A896] text-white flex items-center justify-center">
                <BookOpen className="w-5.5 h-5.5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  {lang === "bn" ? "১-অন-১ ট্রায়াল ক্লাস" : "1-on-1 Free Trial"}
                </h3>
                <p className="text-[11px] text-white/70 font-medium">
                  {lang === "bn" ? "প্রথম ক্লাস সম্পূর্ণ ফ্রি" : "First trial 100% free"}
                </p>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                {lang === "bn"
                  ? "বুয়েট, ঢাবি বা মেডিকেলের শিক্ষকের সাথে ট্রায়াল বুক করুন।"
                  : "Match with a verified tutor from BUET, DU or DMC."}
              </p>
            </div>
            <button
              onClick={() => handleOpenEnroll()}
              className="mt-4 py-2 px-4 bg-[#FFB627] text-[#12213D] rounded-full text-xs font-extrabold hover:bg-[#ffa903] transition-colors cursor-pointer text-center"
            >
              {lang === "bn" ? "ট্রায়াল ক্লাস বুক করুন" : "Book Free Trial"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Request Teacher Modal */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialPlan={selectedPlan}
        initialFee={selectedFee}
      />

      {/* Become a Teacher Modal */}
      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />
    </main>
  );
}

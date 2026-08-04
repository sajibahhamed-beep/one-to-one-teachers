"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Send, CheckCircle, Heart, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="bg-[#0A1D33] text-[#F8FAFC]/80 pt-16 pb-8 font-sans border-t border-[#00A896]/20">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        {/* Tahzib Institute Style Newsletter Bar */}
        <div className="bg-[#005B54] text-white rounded-2xl p-6 md:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-sans text-xl md:text-2xl font-bold text-white">
              {t.footNewsletter}
            </h4>
            <p className="text-xs text-white/80 font-normal">
              {lang === "bn"
                ? "১-অন-১ মেন্টরিং ও শিক্ষার নিয়মিত পরামর্শ পেতে আপনার ইমেইল দিন"
                : "Enter your email for regular 1-on-1 teaching updates"}
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                required
                placeholder={lang === "bn" ? "your@mail.com" : "your@mail.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-l-xl bg-white text-[#0D2C4A] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#00A896] text-white rounded-r-xl text-sm font-bold hover:bg-[#008075] transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <span>{lang === "bn" ? "সাবমিট" : "Submit"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-sm text-white font-bold bg-white/20 px-5 py-3 rounded-xl border border-white/30">
              <CheckCircle className="w-5 h-5 text-[#38BDF8]" />
              <span>{lang === "bn" ? "সাবস্ক্রাইব সম্পন্ন হয়েছে!" : "Subscribed!"}</span>
            </div>
          )}
        </div>

        {/* 4-Column Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Col 1: Main Menu */}
          <div>
            <h5 className="font-sans text-lg font-bold text-[#FFFFFF] mb-5 pb-2 border-b border-white/10">
              {lang === "bn" ? "প্রধান মেনু" : "Main Menu"}
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#subjects" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navSubjects}</span>
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navPricing}</span>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navTestimonials}</span>
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navHow}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: About Us */}
          <div>
            <h5 className="font-sans text-lg font-bold text-[#FFFFFF] mb-5 pb-2 border-b border-white/10">
              {lang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#mentors" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.btnBecomeMentor}</span>
                </a>
              </li>
              <li>
                <a href="#batches" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navBatches}</span>
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navImpact}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Other Links */}
          <div>
            <h5 className="font-sans text-lg font-bold text-[#FFFFFF] mb-5 pb-2 border-b border-white/10">
              {lang === "bn" ? "অন্যান্য লিঙ্ক" : "Other Links"}
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "রিফান্ড পলিসি" : "Refund Policy"}</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "টার্মস অ্যান্ড কন্ডিশনস" : "Terms & Conditions"}</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "গোপনীয় নীতি" : "Privacy Policy"}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h5 className="font-sans text-lg font-bold text-[#FFFFFF] mb-5 pb-2 border-b border-white/10">
              {t.navContact}
            </h5>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-2.5 text-[#F8FAFC]/90">
                <Mail className="w-4.5 h-4.5 text-[#00A896] flex-shrink-0" />
                <a href="mailto:support@aloshikkha.org" className="hover:text-[#00A896] transition-colors">
                  support@aloshikkha.org
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#F8FAFC]/90">
                <Phone className="w-4.5 h-4.5 text-[#00A896] flex-shrink-0" />
                <a href="tel:09610883388" className="hover:text-[#00A896] transition-colors">
                  {lang === "bn" ? "০৯৬১০৮৮৩৩৮৮" : "09610883388"}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#F8FAFC]/90">
                <MapPin className="w-4.5 h-4.5 text-[#00A896] flex-shrink-0" />
                <span>{lang === "bn" ? "ধানমণ্ডি, ঢাকা, বাংলাদেশ" : "Dhanmondi, Dhaka, Bangladesh"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/15 text-xs text-[#F8FAFC]/60">
          <span>
            {t.footRights}{" "}
            <Heart className="w-3.5 h-3.5 text-[#00A896] inline mx-1 fill-[#00A896]" />
          </span>
          <span className="font-mono text-xs text-[#38BDF8] font-bold">
            ototeacher — One-to-One Teacher for All
          </span>
        </div>
      </div>
    </footer>
  );
}

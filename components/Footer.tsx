"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { Send, CheckCircle, Heart, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [settings, setSettings] = useState({
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
    phone: "01775551325",
    email: "support@aloshikkha.org",
    addressBn: "ধানমণ্ডি, ঢাকা, বাংলাদেশ",
    addressEn: "Dhanmondi, Dhaka, Bangladesh",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.facebookUrl) {
          setSettings(data);
        }
      })
      .catch(() => {});
  }, []);

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
                <Link href="/subjects" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navSubjects}</span>
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navBlogs || "ব্লগ ও গাইডলাইন"}</span>
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navPricing}</span>
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navTestimonials}</span>
                </Link>
              </li>
              <li>
                <Link href="/subjects#how" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navHow}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: About Us */}
          <div>
            <Link href="/about" className="font-sans text-lg font-bold text-[#FFFFFF] mb-5 pb-2 border-b border-white/10 hover:text-[#00A896] transition-colors block">
              {lang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
            </Link>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/become-teacher" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.btnBecomeMentor}</span>
                </Link>
              </li>
              <li>
                <Link href="/#batches" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navBatches}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navImpact}</span>
                </Link>
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
                <Link href="/refund-policy" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "রিফান্ড পলিসি" : "Refund Policy"}</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "টার্মস অ্যান্ড কন্ডিশনস" : "Terms & Conditions"}</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "গোপনীয় নীতি" : "Privacy Policy"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <Link href="/contact" className="font-sans text-lg font-bold text-[#FFFFFF] mb-5 pb-2 border-b border-white/10 hover:text-[#00A896] transition-colors block">
              {t.navContact}
            </Link>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-2.5 text-[#F8FAFC]/90">
                <Mail className="w-4.5 h-4.5 text-[#00A896] flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#00A896] transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#F8FAFC]/90">
                <Phone className="w-4.5 h-4.5 text-[#00A896] flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#00A896] transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#F8FAFC]/90">
                <MapPin className="w-4.5 h-4.5 text-[#00A896] flex-shrink-0" />
                <span>{lang === "bn" ? settings.addressBn : settings.addressEn}</span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="pt-5 space-y-2.5">
              <span className="text-xs font-bold text-white/90 block font-mono">
                {lang === "bn" ? "সোশ্যাল মিডিয়ায় আমরা:" : "Follow Us:"}
              </span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#1877F2] hover:scale-110 transition-all shadow-sm border border-white/10"
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#833AB4] hover:scale-110 transition-all shadow-sm border border-white/10"
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#FF0000] hover:scale-110 transition-all shadow-sm border border-white/10"
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/15 text-xs text-[#F8FAFC]/60">
          <span>
            {t.footRights}{" "}
            <Heart className="w-3.5 h-3.5 text-[#00A896] inline mx-1 fill-[#00A896]" />
          </span>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#38BDF8] font-bold">
              ototeacher — One-to-One Teacher for All
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

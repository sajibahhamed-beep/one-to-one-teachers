"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { Send, CheckCircle, Heart, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [settings, setSettings] = useState<{
    socialLinks?: any[];
    phone?: string;
    email?: string;
    addressBn?: string;
    addressEn?: string;
    [key: string]: any;
  }>({
    socialLinks: [
      { id: "soc-1", name: "Facebook", iconUrl: "facebook", url: "https://facebook.com" },
      { id: "soc-2", name: "Instagram", iconUrl: "instagram", url: "https://instagram.com" },
      { id: "soc-3", name: "YouTube", iconUrl: "youtube", url: "https://youtube.com" },
      { id: "soc-4", name: "LinkedIn", iconUrl: "linkedin", url: "https://linkedin.com" },
    ],
    phone: "01775551325",
    email: "support@aloshikkha.org",
    addressBn: "ধানমণ্ডি, ঢাকা, বাংলাদেশ",
    addressEn: "Dhanmondi, Dhaka, Bangladesh",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.socialLinks || data.phone || data.email)) {
          setSettings((prev) => ({ ...prev, ...data }));
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
                <Link href="/become-teacher" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span suppressHydrationWarning>{t.btnBecomeMentor}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span suppressHydrationWarning>{t.navAboutUs}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Policy */}
          <div>
            <h5 className="font-sans text-lg font-bold text-[#FFFFFF] mb-5 pb-2 border-b border-white/10">
              {lang === "bn" ? "নীতিমালা ও সাহায্য" : "Policies & Help"}
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "প্রাইভেসি পলিসি" : "Privacy Policy"}</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "টার্মস অফ সার্ভিস" : "Terms of Service"}</span>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "রিফান্ড পলিসি" : "Refund Policy"}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00A896] transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#00A896]" />
                  <span>{t.navContact}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h5 className="font-sans text-lg font-bold text-[#FFFFFF] mb-5 pb-2 border-b border-white/10">
              {lang === "bn" ? "যোগাযোগ করুন" : "Contact Information"}
            </h5>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00A896] shrink-0 mt-0.5" />
                <span>{lang === "bn" ? settings.addressBn : settings.addressEn}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#00A896] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#00A896] transition-colors font-mono font-bold">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#00A896] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#00A896] transition-colors font-mono">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Bio & Social Links */}
          <div>
            <h5 className="font-sans text-lg font-bold text-[#FFFFFF] mb-5 pb-2 border-b border-white/10">
              {lang === "bn" ? "প্ল্যাটফর্ম সোশ্যাল লিংক" : "Follow Platform"}
            </h5>
            <p className="text-xs text-[#F8FAFC]/70 leading-relaxed mb-4">
              {lang === "bn"
                ? "বুয়েট, ঢাবি ও সরকারি মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে ১-অন-১ লাইভ অনলাইন টিউটরিং।"
                : "Dedicated 1-on-1 online tutoring with top tutors from BUET, DU & Medical Colleges."}
            </p>

            {/* Dynamic Custom Social Media Icons */}
            <div className="pt-2 space-y-2.5">
              <span className="text-xs font-bold text-white/90 block font-mono">
                {lang === "bn" ? "সোশ্যাল মিডিয়ায় আমরা:" : "Follow Us:"}
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {(settings.socialLinks && settings.socialLinks.length > 0
                  ? settings.socialLinks
                  : [
                      { id: "soc-1", name: "Facebook", iconUrl: "facebook", url: "https://facebook.com" },
                      { id: "soc-2", name: "Instagram", iconUrl: "instagram", url: "https://instagram.com" },
                      { id: "soc-3", name: "YouTube", iconUrl: "youtube", url: "https://youtube.com" },
                      { id: "soc-4", name: "LinkedIn", iconUrl: "linkedin", url: "https://linkedin.com" },
                    ]
                ).map((item: any, idx: number) => {
                  const nameLower = (item.name || "").toLowerCase();
                  const iconLower = (item.iconUrl || "").toLowerCase();

                  let iconSvg = null;
                  let bgHoverClass = "hover:bg-[#00A896]";

                  if (iconLower.startsWith("http") || iconLower.startsWith("data:")) {
                    return (
                      <a
                        key={item.id || idx}
                        href={item.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                        className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#00A896] hover:scale-110 transition-all shadow-sm border border-white/10 overflow-hidden p-1.5"
                      >
                        <img src={item.iconUrl} alt={item.name} className="w-full h-full object-contain filter invert" />
                      </a>
                    );
                  }

                  if (nameLower.includes("facebook") || iconLower.includes("facebook")) {
                    bgHoverClass = "hover:bg-[#1877F2]";
                    iconSvg = (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    );
                  } else if (nameLower.includes("instagram") || iconLower.includes("instagram")) {
                    bgHoverClass = "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#833AB4]";
                    iconSvg = (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    );
                  } else if (nameLower.includes("youtube") || iconLower.includes("youtube")) {
                    bgHoverClass = "hover:bg-[#FF0000]";
                    iconSvg = (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    );
                  } else if (nameLower.includes("linkedin") || iconLower.includes("linkedin")) {
                    bgHoverClass = "hover:bg-[#0A66C2]";
                    iconSvg = (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    );
                  } else if (nameLower.includes("twitter") || nameLower.includes("x") || iconLower.includes("twitter")) {
                    bgHoverClass = "hover:bg-[#1DA1F2]";
                    iconSvg = (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    );
                  } else if (nameLower.includes("whatsapp") || iconLower.includes("whatsapp")) {
                    bgHoverClass = "hover:bg-[#25D366]";
                    iconSvg = (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    );
                  } else if (nameLower.includes("telegram") || iconLower.includes("telegram")) {
                    bgHoverClass = "hover:bg-[#0088cc]";
                    iconSvg = (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.02 9.51c-.15.68-.55.85-1.12.53l-3.08-2.27-1.49 1.43c-.16.16-.3.3-.61.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.38-.12l-7.05 4.44-3.04-.95c-.66-.21-.67-.66.14-.98l11.88-4.58c.55-.2 1.03.13.85.97z"/>
                      </svg>
                    );
                  } else if (nameLower.includes("tiktok") || iconLower.includes("tiktok")) {
                    bgHoverClass = "hover:bg-black";
                    iconSvg = (
                      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.49A6.27 6.34 0 0 0 15.86 16V8.9a8.27 8.27 0 0 0 4.84 1.55V7a4.85 4.85 0 0 1-1.11-.31z"/>
                      </svg>
                    );
                  } else {
                    iconSvg = <span className="font-extrabold text-xs uppercase">{item.name?.substring(0, 2) || "SO"}</span>;
                  }

                  return (
                    <a
                      key={item.id || idx}
                      href={item.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className={`w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center ${bgHoverClass} hover:scale-110 transition-all shadow-sm border border-white/10`}
                    >
                      {iconSvg}
                    </a>
                  );
                })}
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

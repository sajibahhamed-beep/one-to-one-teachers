"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import { BlogPost, BLOG_CATEGORIES } from "@/lib/blogsData";
import {
  Clock,
  Calendar,
  ArrowLeft,
  Share2,
  CheckCircle,
  Tag,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BookmarkCheck,
  Lightbulb,
} from "lucide-react";

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  const { lang } = useLanguage();

  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pay-what-you-can");
  const [selectedFee, setSelectedFee] = useState(600);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOpenEnroll = (planName = "Pay-what-you-can", fee = 600) => {
    setSelectedPlan(planName);
    setSelectedFee(fee);
    setEnrollModalOpen(true);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const categoryObj = BLOG_CATEGORIES.find((c) => c.id === post.category);
  const categoryLabel = lang === "bn" ? categoryObj?.labelBn || "নিবন্ধ" : categoryObj?.labelEn || "Article";

  const sections = (lang === "bn" ? post.sectionsBn : post.sectionsEn) || [];
  const intro = (lang === "bn" ? post.introBn : post.introEn) || post.excerptBn || "";
  const keyTakeaways = (lang === "bn" ? post.keyTakeawaysBn : post.keyTakeawaysEn) || [];
  const tags = (lang === "bn" ? post.tagsBn : post.tagsEn) || [];

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FBF7EF] font-sans text-[#12213D] flex flex-col">
      {/* Top Navbar */}
      <Navbar
        onOpenEnroll={() => handleOpenEnroll()}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* ===== BREADCRUMB NAVIGATION ===== */}
      <div className="bg-[#0D2C4A] text-white/80 py-3.5 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 flex items-center justify-between text-xs sm:text-sm">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#00A896] hover:text-white font-extrabold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === "bn" ? "সকল নিবন্ধে ফিরে যান" : "Back to Articles"}</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-white/60 font-mono text-xs">
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "bn" ? "হোম" : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link href="/blogs" className="hover:text-white transition-colors">
              {lang === "bn" ? "ব্লগ" : "Blogs"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#00A896] font-bold truncate max-w-[200px]">
              {categoryLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ===== HERO ARTICLE HEADER ===== */}
      <header className="bg-gradient-to-b from-[#0D2C4A] via-[#16385C] to-[#0D2C4A] text-white py-12 md:py-16">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 space-y-6">

          {/* Category Badge & Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#00A896] text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {categoryLabel}
            </span>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-white/75 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#00A896]" />
                <time dateTime="2026-08-01">
                  {lang === "bn" ? post.publishedDateBn : post.publishedDateEn}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#00A896]" />
                {lang === "bn" ? post.readTimeBn : post.readTimeEn}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.35] tracking-tight">
            {lang === "bn" ? post.titleBn : post.titleEn}
          </h1>

          {/* Excerpt */}
          <p className="text-base sm:text-xl text-white/85 leading-relaxed font-normal">
            {lang === "bn" ? post.excerptBn : post.excerptEn}
          </p>

          {/* Author Card & Share Button */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={post.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={lang === "bn" ? post.author?.nameBn : post.author?.nameEn}
                loading="lazy"
                decoding="async"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#00A896] shadow-md"
              />
              <div>
                <strong className="block font-sans text-base font-extrabold text-white">
                  {lang === "bn" ? post.author?.nameBn : post.author?.nameEn}
                </strong>
                <span className="text-xs text-[#38BDF8] font-mono block">
                  {lang === "bn" ? post.author?.roleBn : post.author?.roleEn} ·{" "}
                  {lang === "bn" ? post.author?.institutionBn : post.author?.institutionEn}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 self-start sm:self-auto bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full border border-white/20 transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <CheckCircle className="w-4 h-4 text-[#00A896]" />
                  <span className="text-[#00A896]">
                    {lang === "bn" ? "লিঙ্ক কপি হয়েছে!" : "Link Copied!"}
                  </span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "নিবন্ধ শেয়ার করুন" : "Share Article"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ===== STANDALONE ARTICLE BODY ===== */}
      <article className="py-12 md:py-16">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 space-y-10">
          
          {/* Main Hero Cover Image */}
          {post.image && (
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#0D2C4A]/10 h-[300px] sm:h-[420px] md:h-[500px] w-full bg-slate-100">
              <img
                src={post.image}
                alt={lang === "bn" ? post.titleBn : post.titleEn}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* INTRO SUMMARY BOX */}
          {intro && (
            <div className="bg-gradient-to-r from-[#00A896]/10 via-[#00A896]/5 to-transparent border-l-4 border-[#00A896] p-6 sm:p-8 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-[#00A896] font-mono font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{lang === "bn" ? "মূল বক্তব্য / এক নজরে" : "Executive Summary"}</span>
              </div>
              <p className="font-semibold text-[#0D2C4A] text-base sm:text-xl leading-relaxed">
                {intro}
              </p>
            </div>
          )}

          {/* DETAILED SECTIONS */}
          <div className="bg-white rounded-3xl p-7 sm:p-12 md:p-14 shadow-[0_4px_30px_-4px_rgba(13,44,74,0.08)] border border-[#0D2C4A]/8 space-y-12 text-[#12213D] leading-relaxed">
            
            {sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-6">

                {/* Section H2 Heading */}
                {section.heading && (
                  <div className="space-y-2 border-b border-[#0D2C4A]/10 pb-4">
                    <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D2C4A] tracking-tight leading-snug flex items-center gap-3">
                      <span className="w-2.5 h-8 rounded-full bg-[#00A896] inline-block flex-shrink-0" />
                      <span>{section.heading}</span>
                    </h2>
                    {section.subheading && (
                      <p className="text-sm sm:text-base font-bold text-[#00A896] font-mono pl-5">
                        {section.subheading}
                      </p>
                    )}
                  </div>
                )}

                {/* Section Image Banner */}
                {section.image && (
                  <figure className="my-6 space-y-2.5">
                    <div className="relative rounded-2xl overflow-hidden border border-[#0D2C4A]/10 shadow-lg aspect-[16/9] max-h-[420px] w-full bg-slate-100">
                      <img
                        src={section.image}
                        alt={section.heading || (lang === "bn" ? post.titleBn : post.titleEn)}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                      />
                    </div>
                    {(lang === "bn" ? section.imageCaptionBn : section.imageCaptionEn) && (
                      <figcaption className="text-xs sm:text-sm font-mono text-[#64748B] text-center italic">
                        📷 {lang === "bn" ? section.imageCaptionBn : section.imageCaptionEn}
                      </figcaption>
                    )}
                  </figure>
                )}

                {/* Paragraphs */}
                {section.paragraphs && section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-xl text-[#1E293B] leading-[1.95] font-normal">
                    {p}
                  </p>
                ))}

                {/* Structured Numbered Points Cards */}
                {section.points && section.points.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    {section.points.map((pt, ptIdx) => (
                      <div
                        key={ptIdx}
                        className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-[#0D2C4A]/10 hover:border-[#00A896]/40 hover:shadow-md transition-all space-y-2.5 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-full bg-[#00A896] text-white font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                            {ptIdx + 1}
                          </span>
                          <h3 className="font-sans text-lg sm:text-xl font-extrabold text-[#0D2C4A] leading-snug">
                            {pt.title}
                          </h3>
                        </div>
                        <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-normal pl-12">
                          {pt.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Callout Box */}
                {section.callout && (
                  <div className="p-7 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0D2C4A] to-[#00A896] text-white space-y-3 shadow-xl">
                    <div className="flex items-center gap-2 text-[#FFB627] font-mono font-bold text-xs uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4" />
                      <span>{lang === "bn" ? "বিশেষ পরামর্শ" : "Expert Takeaway"}</span>
                    </div>
                    <p className="font-sans text-lg sm:text-2xl font-bold leading-relaxed text-white">
                      "{section.callout}"
                    </p>
                  </div>
                )}

              </section>
            ))}

            {/* KEY TAKEAWAYS CHECKLIST */}
            {keyTakeaways && keyTakeaways.length > 0 && (
              <div className="pt-8 border-t-2 border-dashed border-[#0D2C4A]/12">
                <div className="bg-[#F0FDF9] border border-[#00A896]/30 rounded-3xl p-7 sm:p-10 space-y-6">
                  <div className="flex items-center gap-2.5 text-[#00A896]">
                    <BookmarkCheck className="w-7 h-7" />
                    <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-[#0D2C4A]">
                      {lang === "bn" ? "নিবন্ধের মূল শিক্ষা (Key Takeaways)" : "Key Takeaways"}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {keyTakeaways.map((takeaway, tkIdx) => (
                      <div key={tkIdx} className="flex items-start gap-3 bg-white p-4.5 rounded-xl border border-[#00A896]/20 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#00A896] flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base font-bold text-[#0D2C4A] leading-snug">
                          {takeaway}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAGS */}
            {tags && tags.length > 0 && (
              <div className="pt-6 border-t border-[#0D2C4A]/10 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-[#00A896]" />
                <span className="text-xs font-mono font-bold text-[#64748B] mr-2">
                  {lang === "bn" ? "ট্যাগসমূহ:" : "Tags:"}
                </span>
                {tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="bg-[#F1F5F9] text-[#0D2C4A] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#0D2C4A]/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* ===== RELATED POSTS ===== */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 bg-[#F8FAFC] border-t border-[#0D2C4A]/10">
          <div className="max-w-[1240px] mx-auto px-6 md:px-8">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#0D2C4A]">
                {lang === "bn" ? "আরও গুরুত্বপূর্ণ নিবন্ধ" : "Related Articles"}
              </h3>
              <Link
                href="/blogs"
                className="text-[#00A896] hover:text-[#0D2C4A] font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{lang === "bn" ? "সবগুলো দেখুন" : "View All"}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <Link
                  key={relPost.id}
                  href={`/blogs/${relPost.slug || relPost.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#0D2C4A]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={relPost.image}
                        alt={lang === "bn" ? relPost.titleBn : relPost.titleEn}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 space-y-2.5">
                      <h4 className="font-sans font-extrabold text-base sm:text-lg text-[#0D2C4A] leading-snug group-hover:text-[#00A896] transition-colors line-clamp-2">
                        {lang === "bn" ? relPost.titleBn : relPost.titleEn}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#64748B] line-clamp-2 font-normal leading-relaxed">
                        {lang === "bn" ? relPost.excerptBn : relPost.excerptEn}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 text-xs font-mono text-[#00A896] font-bold flex items-center gap-1">
                    <span>{lang === "bn" ? "পড়ুন" : "Read Article"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BOTTOM CTA ===== */}
      <section className="bg-[#0D2C4A] text-white py-16 text-center">
        <div className="max-w-[780px] mx-auto px-6 space-y-6">
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-white">
            {lang === "bn"
              ? "আপনার সন্তানের জন্য সেরা ১-অন-১ শিক্ষক নির্বাচন করুন"
              : "Choose the best 1-on-1 teacher for your child"}
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            {lang === "bn"
              ? "প্রথম সেশনটি সম্পূর্ণ ফ্রি! আজই ট্রায়াল ক্লাস বুক করে মান যাচাই করে নিন।"
              : "The first session is completely free. Book your trial class today."}
          </p>
          <button
            onClick={() => handleOpenEnroll()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00A896] text-white font-extrabold text-base hover:bg-[#008075] hover:scale-105 transition-all shadow-xl cursor-pointer"
          >
            <span>{lang === "bn" ? "ফ্রি ট্রায়াল ক্লাস বুক করুন" : "Book Free Trial Session"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialPlan={selectedPlan}
        initialFee={selectedFee}
      />
      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />
    </main>
  );
}

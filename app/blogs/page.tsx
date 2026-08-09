"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blogsData";
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  UserCheck,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function BlogsPage() {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pay-what-you-can");
  const [selectedFee, setSelectedFee] = useState(600);

  // Api posts
  const [apiPosts, setApiPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((b: any) => ({
            id: b.id || b.slug,
            slug: b.slug || b.id,
            titleBn: b.titleBn || "নিবন্ধ",
            titleEn: b.titleEn || "Article",
            category: b.category || "mentorship",
            excerptBn: b.excerptBn || "",
            excerptEn: b.excerptEn || "",
            publishedDateBn: b.publishedDateBn || "০৬ আগস্ট, ২০২৬",
            publishedDateEn: "06 August 2026",
            readTimeBn: "৪ মিনিট পড়া",
            readTimeEn: "4 min read",
            image: b.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
            author: {
              nameBn: "ototeachers.com টিম",
              nameEn: "ototeachers.com Team",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
              roleBn: "পরামর্শক",
              roleEn: "Academic Advisor",
              institutionBn: "বুয়েট ও ঢাবি",
              institutionEn: "BUET & DU",
            },
            tagsBn: ["পড়াশোনা", "পরামর্শ"],
            tagsEn: ["study", "prep"],
          }));
          setApiPosts(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const allPosts = useMemo(() => {
    if (apiPosts.length === 0) return BLOG_POSTS;
    // merge without duplicating IDs
    const existingIds = new Set(apiPosts.map((p) => p.id));
    const staticFiltered = BLOG_POSTS.filter((p) => !existingIds.has(p.id));
    return [...apiPosts, ...staticFiltered];
  }, [apiPosts]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleOpenEnroll = (planName = "Pay-what-you-can", fee = 600) => {
    setSelectedPlan(planName);
    setSelectedFee(fee);
    setEnrollModalOpen(true);
  };

  // Filtered Blog List
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const titleMatch =
        (post.titleBn && post.titleBn.toLowerCase().includes(q)) ||
        (post.titleEn && post.titleEn.toLowerCase().includes(q));
      const excerptMatch =
        (post.excerptBn && post.excerptBn.toLowerCase().includes(q)) ||
        (post.excerptEn && post.excerptEn.toLowerCase().includes(q));

      return matchesCategory && (titleMatch || excerptMatch);
    });
  }, [allPosts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return allPosts.find((p) => p.featured) || allPosts[0];
  }, [allPosts]);

  return (
    <main suppressHydrationWarning className="min-h-screen bg-[#FBF7EF] font-sans text-[#12213D] flex flex-col">
      {/* Top Navbar */}
      <Navbar
        onOpenEnroll={() => handleOpenEnroll()}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* ===== HERO BANNER ===== */}
      <section className="bg-gradient-to-br from-[#0D2C4A] via-[#12213D] to-[#00A896] text-white py-16 md:py-24 relative overflow-hidden">
        {/* Subtle decorative glow shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00A896]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FFB627]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 md:px-8 relative z-10 text-center max-w-4xl">

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.35] mb-6">
            {lang === "bn"
              ? "১-অন-১ শিক্ষাদান, পরীক্ষা প্রস্তুতি ও পড়াশোনার কৌশল"
              : "1-on-1 Tutoring, Exam Secrets & Study Strategies"}
          </h1>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal max-w-2xl mx-auto mb-10">
            {lang === "bn"
              ? "বুয়েট, ঢাবি ও মেডিকেল টিচারদের রিয়েল অভিজ্ঞতা, বোর্ড পরীক্ষার সাজেশন এবং পার্সোনালাইজড পড়াশোনার সব নির্দেশিকা।"
              : "Real insights from BUET, DU, and Medical tutors — board exam prep, subject guides, and effective study techniques."}
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-12 md:py-16 flex-1 w-full">

        {/* ===== FEATURED POST SPOTLIGHT ===== */}
        {featuredPost && !searchQuery && selectedCategory === "all" && (
          <div className="mb-16">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00A896] mb-4">
              <BookOpen className="w-4 h-4" />
              <span>{lang === "bn" ? "বিশেষ নিবন্ধ" : "Featured Article"}</span>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group">
              <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-[380px] overflow-hidden bg-slate-100">
                <img
                  src={featuredPost.image}
                  alt={lang === "bn" ? featuredPost.titleBn : featuredPost.titleEn}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#00A896] text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md">
                    {lang === "bn"
                      ? BLOG_CATEGORIES.find((c) => c.id === featuredPost.category)?.labelBn
                      : BLOG_CATEGORIES.find((c) => c.id === featuredPost.category)?.labelEn}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-3.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#00A896]" />
                      {lang === "bn" ? featuredPost.publishedDateBn : featuredPost.publishedDateEn}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#00A896]" />
                      {lang === "bn" ? featuredPost.readTimeBn : featuredPost.readTimeEn}
                    </span>
                  </div>

                  <Link href={`/blogs/${featuredPost.id}`}>
                    <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0D2C4A] leading-[1.35] group-hover:text-[#00A896] transition-colors">
                      {lang === "bn" ? featuredPost.titleBn : featuredPost.titleEn}
                    </h2>
                  </Link>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                    {lang === "bn" ? featuredPost.excerptBn : featuredPost.excerptEn}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={lang === "bn" ? featuredPost.author.nameBn : featuredPost.author.nameEn}
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#00A896]"
                    />
                    <div>
                      <h4 className="font-bold text-[#0D2C4A] text-sm">
                        {lang === "bn" ? featuredPost.author.nameBn : featuredPost.author.nameEn}
                      </h4>
                      <p className="text-xs text-gray-500 font-mono">
                        {lang === "bn"
                          ? `${featuredPost.author.roleBn} · ${featuredPost.author.institutionBn}`
                          : `${featuredPost.author.roleEn} · ${featuredPost.author.institutionEn}`}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blogs/${featuredPost.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00A896] text-white font-extrabold text-xs sm:text-sm hover:bg-[#008075] transition-all cursor-pointer shadow-md"
                  >
                    <span>{lang === "bn" ? "সম্পূর্ণ পড়ুন" : "Read Full Article"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== CATEGORY FILTER CHIPS ===== */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${isActive
                    ? "bg-[#0D2C4A] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  {lang === "bn" ? cat.labelBn : cat.labelEn}
                </button>
              );
            })}
          </div>

          <div className="text-xs md:text-sm text-gray-500 font-medium">
            {lang === "bn"
              ? `মোট ${filteredPosts.length} টি নিবন্ধ পাওয়া গেছে`
              : `Found ${filteredPosts.length} articles`}
          </div>
        </div>

        {/* ===== BLOG POSTS GRID ===== */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <Link href={`/blogs/${post.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={lang === "bn" ? post.titleBn : post.titleEn}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#0D2C4A]/90 text-white font-semibold text-[11px] px-3 py-1 rounded-full backdrop-blur-md">
                          {lang === "bn"
                            ? BLOG_CATEGORIES.find((c) => c.id === post.category)?.labelBn
                            : BLOG_CATEGORIES.find((c) => c.id === post.category)?.labelEn}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#00A896]" />
                        {lang === "bn" ? post.publishedDateBn : post.publishedDateEn}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00A896]" />
                        {lang === "bn" ? post.readTimeBn : post.readTimeEn}
                      </span>
                    </div>

                    <Link href={`/blogs/${post.id}`}>
                      <h3 className="font-bold text-lg text-[#0D2C4A] hover:text-[#00A896] transition-colors cursor-pointer line-clamp-2 leading-[1.35] mb-3">
                        {lang === "bn" ? post.titleBn : post.titleEn}
                      </h3>
                    </Link>

                    <p className="text-xs md:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {lang === "bn" ? post.excerptBn : post.excerptEn}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={lang === "bn" ? post.author.nameBn : post.author.nameEn}
                        loading="lazy"
                        decoding="async"
                        className="w-8 h-8 rounded-full object-cover border border-[#00A896]"
                      />
                      <div className="text-xs">
                        <p className="font-bold text-[#0D2C4A]">
                          {lang === "bn" ? post.author.nameBn : post.author.nameEn}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          {lang === "bn" ? post.author.institutionBn : post.author.institutionEn}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${post.id}`}
                      className="text-xs font-bold text-[#00A896] hover:text-[#008075] flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                    >
                      <span>{lang === "bn" ? "পড়ুন" : "Read"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-lg mx-auto space-y-4 my-8">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#0D2C4A]">
              {lang === "bn" ? "কোনো নিবন্ধ পাওয়া যায়নি" : "No articles found"}
            </h3>
            <p className="text-sm text-gray-500">
              {lang === "bn"
                ? "আপনার সার্চ কোয়েরি বা ক্যাটাগরি ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।"
                : "Try adjusting your search terms or category filter to find related posts."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-5 py-2 bg-[#00A896] text-white text-xs font-bold rounded-full hover:bg-[#008075] transition-colors cursor-pointer"
            >
              {lang === "bn" ? "ফিল্টার রিসেট করুন" : "Reset Filters"}
            </button>
          </div>
        )}

        {/* ===== CALL TO ACTION SECTION ===== */}
        <div className="mt-20 bg-gradient-to-r from-[#0D2C4A] to-[#00A896] rounded-3xl p-8 md:p-12 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFB627] font-bold">
              {lang === "bn" ? "১-অন-১ ফ্রি ট্রায়াল" : "1-on-1 Free Trial Class"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-[1.35]">
              {lang === "bn"
                ? "আপনার সন্তানের দুর্বল বিষয় মেটাতে ১-অন-১ শিক্ষক খুঁজছেন?"
                : "Looking for a dedicated 1-on-1 tutor for your child?"}
            </h3>
            <p className="text-sm text-white/85 leading-relaxed">
              {lang === "bn"
                ? "প্রথম সেশনটি সম্পূর্ণ ফ্রি! বুয়েট, ঢাবি বা ঢাকা মেডিকেলের যাচাইকৃত শিক্ষকের সাথে আপনার সন্তানকে যুক্ত করে দিন।"
                : "First trial class is completely free! Connect your child with top verified tutors from BUET, DU, and DMC."}
            </p>
          </div>

          <button
            onClick={() => handleOpenEnroll()}
            className="px-8 py-4 bg-[#FFB627] text-[#12213D] rounded-full text-sm font-extrabold hover:bg-[#ffa903] hover:scale-105 transition-all shadow-lg flex-shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === "bn" ? "ফ্রি শিক্ষক রিকোয়েস্ট করুন" : "Request Free Trial Tutor"}</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
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

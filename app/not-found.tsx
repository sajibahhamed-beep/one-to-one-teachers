import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Home, BookOpen, GraduationCap, PhoneCall, ArrowRight } from "lucide-react";

export const metadata = {
  title: "পৃষ্ঠাটি পাওয়া যায়নি (404 Not Found) | OTOTeachers",
  description: "দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা মুছে ফেলা হয়েছে।",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7EF] text-[#12213D] font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8 bg-white p-8 sm:p-14 rounded-3xl border border-[#0D2C4A]/10 shadow-xl">
          <div className="space-y-3">
            <span className="font-mono text-5xl sm:text-7xl font-extrabold text-[#00A896] block tracking-tight">
              404
            </span>
            <h1 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#0D2C4A]">
              পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              দুঃখিত, আপনি যে ওয়েব ঠিকানাটি খুঁজছেন সেটি পরিবর্তিত হয়েছে অথবা বর্তমানে বিদ্যমান নেই। নিচের প্রয়োজনীয় লিংকগুলো ব্যবহার করে এগিয়ে যান।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <Link
              href="/"
              className="flex flex-col items-center p-5 rounded-2xl bg-[#F8FAFC] border border-[#0D2C4A]/10 hover:border-[#00A896] hover:bg-[#00A896]/5 transition-all text-center space-y-2 group"
            >
              <div className="p-3 bg-[#00A896]/10 text-[#00A896] rounded-xl group-hover:bg-[#00A896] group-hover:text-white transition-colors">
                <Home className="w-5 h-5" />
              </div>
              <strong className="text-sm font-bold text-[#0D2C4A]">মূল পাতা</strong>
              <span className="text-xs text-slate-500">হোমপেজে ফিরে যান</span>
            </Link>

            <Link
              href="/subjects"
              className="flex flex-col items-center p-5 rounded-2xl bg-[#F8FAFC] border border-[#0D2C4A]/10 hover:border-[#00A896] hover:bg-[#00A896]/5 transition-all text-center space-y-2 group"
            >
              <div className="p-3 bg-[#00A896]/10 text-[#00A896] rounded-xl group-hover:bg-[#00A896] group-hover:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <strong className="text-sm font-bold text-[#0D2C4A]">বিষয়ভিত্তিক শিক্ষক</strong>
              <span className="text-xs text-slate-500">১-অন-১ টিউটর ব্রাউজ</span>
            </Link>

            <Link
              href="/blogs"
              className="flex flex-col items-center p-5 rounded-2xl bg-[#F8FAFC] border border-[#0D2C4A]/10 hover:border-[#00A896] hover:bg-[#00A896]/5 transition-all text-center space-y-2 group"
            >
              <div className="p-3 bg-[#00A896]/10 text-[#00A896] rounded-xl group-hover:bg-[#00A896] group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <strong className="text-sm font-bold text-[#0D2C4A]">ব্লগ ও গাইডলাইন</strong>
              <span className="text-xs text-slate-500">পরীক্ষার প্রস্তুতি টিপস</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D2C4A] text-white text-xs sm:text-sm font-bold hover:bg-[#16385C] transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#00A896]" />
              <span>সহায়তার জন্য যোগাযোগ করুন</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00A896] text-white text-xs sm:text-sm font-extrabold hover:bg-[#008075] transition-colors"
            >
              <span>হোমে ফিরুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

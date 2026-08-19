import { supabase, isSupabaseConfigured } from "./supabase";
import { BlogPost, BLOG_POSTS } from "./blogsData";

export interface Enrollment {
  id: string;
  studentName: string;
  phone: string;
  grade: string;
  district: string;
  selectedSubjects: string[];
  preferredTime: string;
  medium?: string;
  selectedPlan?: string;
  fee: number;
  status: "Pending" | "Contacted" | "Enrolled" | "Rejected";
  createdAt: string;
}

export interface PricingRequest {
  id: string;
  studentName: string;
  phone: string;
  planName: string;
  duration: string;
  monthlyFee: number;
  status: "Pending" | "Contacted" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Teacher {
  id: string;
  nameBn: string;
  nameEn: string;
  universityBn: string;
  universityEn: string;
  subjectBn: string;
  subjectEn: string;
  avatar: string;
  phone?: string;
  email?: string;
  experienceBn?: string;
  experienceEn?: string;
  bioBn?: string;
  bioEn?: string;
  rating?: string;
}

export interface FAQItem {
  id: string;
  qBn: string;
  qEn: string;
  aBn: string;
  aEn: string;
}

export interface SocialLinkItem {
  id: string;
  name: string;
  iconUrl: string;
  url: string;
}

export interface SettingData {
  socialLinks?: SocialLinkItem[];
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  whatsappPhone?: string;
  whatsappMessageBn?: string;
  whatsappMessageEn?: string;
  phone?: string;
  email?: string;
  addressBn?: string;
  addressEn?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

export interface TeacherApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  institution: string;
  department?: string;
  subjectExpertise: string;
  hoursPerWeek: string;
  experience?: string;
  bio?: string;
  avatar?: string;
  status?: "Pending" | "Reviewed" | "Accepted" | "Approved" | "Rejected";
  createdAt?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  status?: "Pending" | "Contacted" | "Resolved" | string;
  createdAt?: string;
}

export interface Payment {
  id: string;
  studentName: string;
  phone?: string;
  amount: number;
  trxId: string;
  type?: string;
  paymentMethod?: string;
  status?: "Pending" | "Verified" | "Paid" | "Rejected";
  createdAt?: string;
}

export interface PageSection {
  id: string;
  icon?: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  lastUpdatedBn?: string;
  lastUpdatedEn?: string;
  sections: PageSection[];
  metaTitleBn?: string;
  metaTitleEn?: string;
  metaDescriptionBn?: string;
  metaDescriptionEn?: string;
  updatedAt?: string;
}

export interface DBData {
  enrollments: Enrollment[];
  pricingRequests: PricingRequest[];
  contacts: ContactMessage[];
  teachers: Teacher[];
  faqs: FAQItem[];
  blogs: any[];
  settings: SettingData;
  teacherApplications?: TeacherApplication[];
  inquiries?: Inquiry[];
  payments?: Payment[];
  pages?: CustomPage[];
}

export const defaultPages: CustomPage[] = [
  {
    id: "privacy",
    slug: "privacy",
    titleBn: "প্রাইভেসি পলিসি",
    titleEn: "Privacy Policy",
    subtitleBn: "শিক্ষার্থী ও অভিভাবকদের তথ্যের শতভাগ নিরাপত্তা এবং জিরো থার্ড-পার্টি শেয়ারিং নিশ্চয়তা।",
    subtitleEn: "100% data security and zero third-party sharing guarantee for students and guardians.",
    lastUpdatedBn: "১০ আগস্ট, ২০২৬",
    lastUpdatedEn: "August 10, 2026",
    metaTitleBn: "প্রাইভেসি পলিসি | OTOTeachers",
    metaTitleEn: "Privacy Policy | OTOTeachers",
    metaDescriptionBn: "OTOTeachers প্ল্যাটফর্মের গোপনীয়তা নীতি — শিক্ষার্থী ও অভিভাবকদের তথ্যের শতভাগ নিরাপত্তা।",
    metaDescriptionEn: "OTOTeachers Privacy Policy — Complete data security and confidentiality.",
    sections: [
      {
        id: "sec-1",
        icon: "ShieldCheck",
        titleBn: "১. তথ্যের গোপনীয়তা ও সংগ্রহ",
        titleEn: "1. Information Privacy & Collection",
        contentBn: "আমরা শিক্ষার্থীদের নাম, ফোন নম্বর, শ্রেণি এবং বিষয় সংক্রান্ত তথ্য শুধুমাত্র উপযুক্ত শিক্ষক নির্বাচন ও ক্লাস সমন্বয়ের জন্য ব্যবহার করি। কোনো অবস্থাতেই বাণিজ্যিক উদ্দেশ্যে তৃতীয় কোনো পক্ষের সাথে তথ্য শেয়ার করা হয় না।",
        contentEn: "We collect basic student information solely for tutor matching and class coordination. Your data is never sold or shared with third parties."
      },
      {
        id: "sec-2",
        icon: "Lock",
        titleBn: "২. অনলাইন ক্লাস নিরাপত্তা ও এনক্রিপশন",
        titleEn: "2. Live Session Security & Encryption",
        contentBn: "সকল লাইভ ১-অন-১ ক্লাস নিরাপদ সুরক্ষিত চ্যানেলে পরিচালিত হয়। অপ্রাপ্তবয়স্ক শিক্ষার্থীদের ক্লাসে অভিভাবকের সরাসরি উপস্থিত থাকার পূর্ণ স্বাধীনতা রয়েছে।",
        contentEn: "All 1-on-1 live sessions are conducted through secure encrypted channels. Parents are encouraged to observe sessions at any time."
      },
      {
        id: "sec-3",
        icon: "CreditCard",
        titleBn: "৩. পেমেন্ট ও লেনদেন নিরাপত্তা",
        titleEn: "3. Payment & Transaction Security",
        contentBn: "বিকাশ, নগদ বা ব্যাংকের মাধ্যমে সকল ফি লেনদেনের তথ্য এনক্রিপ্টেড থাকে। আমরা কোনো কার্ড নম্বর বা পিন সংরক্ষণ করি না।",
        contentEn: "All transactions made via bKash, Nagad, or bank transfer are strictly encrypted. We do not store sensitive payment credentials."
      },
      {
        id: "sec-4",
        icon: "UserCheck",
        titleBn: "৪. ব্যবহারকারীর অধিকার ও তথ্য মুছে ফেলা",
        titleEn: "4. User Rights & Data Deletion",
        contentBn: "যেকোনো সময় শিক্ষার্থী বা অভিভাবক তাদের তথ্য হালনাগাদ বা ডাটাবেজ থেকে মুছে ফেলার জন্য অনুরোধ জানাতে পারেন।",
        contentEn: "Users retain the right to request deletion or modification of their stored records at any time."
      }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: "terms",
    slug: "terms",
    titleBn: "টার্মস অফ সার্ভিস",
    titleEn: "Terms of Service",
    subtitleBn: "OTOTeachers প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী, অধিকার ও দায়িত্বের পূর্ণাঙ্গ রূপরেখা।",
    subtitleEn: "Complete terms, conditions, rights and responsibilities for using OTOTeachers.",
    lastUpdatedBn: "১০ আগস্ট, ২০২৬",
    lastUpdatedEn: "August 10, 2026",
    metaTitleBn: "টার্মস অফ সার্ভিস | OTOTeachers",
    metaTitleEn: "Terms of Service | OTOTeachers",
    metaDescriptionBn: "OTOTeachers এর ব্যবহার বিধি, শিক্ষার্থী ও শিক্ষকের অধিকার এবং শর্তাবলী।",
    metaDescriptionEn: "Terms and conditions governing students, guardians and tutors on OTOTeachers.",
    sections: [
      {
        id: "sec-1",
        icon: "BookOpen",
        titleBn: "১. সেবার আওতা ও প্ল্যাটফর্ম পরিচিতি",
        titleEn: "1. Scope of Service & Platform Role",
        contentBn: "OTOTeachers একটি ১-অন-১ অনলাইন শিক্ষক মেন্টরিং প্ল্যাটফর্ম, যা শিক্ষার্থী ও যাচাইকৃত টিউটরদের মধ্যে লাইভ ক্লাসের ব্যবস্থা করে থাকে।",
        contentEn: "OTOTeachers is a 1-on-1 personalized online tutoring platform connecting verified mentors with students."
      },
      {
        id: "sec-2",
        icon: "CheckCircle",
        titleBn: "২. শিক্ষার্থী ও অভিভাবকের দায়িত্ব",
        titleEn: "2. Student & Guardian Responsibilities",
        contentBn: "নিবন্ধনের সময় সঠিক তথ্য প্রদান করতে হবে। ক্লাসের নির্ধারিত সময়ে উপস্থিতি ও প্রয়োজনীয় ইন্টারনেট সংযোগ নিশ্চিত করা আবশ্যক।",
        contentEn: "Provide accurate student details during registration. Ensure reliable internet connectivity and punctual attendance."
      },
      {
        id: "sec-3",
        icon: "ShieldCheck",
        titleBn: "৩. শিক্ষক কোড অফ কন্ডাক্ট ও যাচাইকরণ",
        titleEn: "3. Tutor Code of Conduct & Verification",
        contentBn: "সকল শিক্ষক জাতীয় পরিচয়পত্র ও বিশ্ববিদ্যালয় আইডি যাচাই সাপেক্ষে প্ল্যাটফর্মে যুক্ত হন। শিক্ষার উপযুক্ত পরিবেশ রক্ষায় আমাদের জিরো-টলারেন্স নীতি বলবৎ রয়েছে।",
        contentEn: "All mentors undergo identity and university credential verification. We maintain strict safety and professionalism standards."
      },
      {
        id: "sec-4",
        icon: "Clock",
        titleBn: "৪. শিডিউলিং ও ক্লাস রিশিডিউলিং",
        titleEn: "4. Scheduling & Class Rescheduling",
        contentBn: "যেকোনো জরুরি প্রয়োজনে ক্লাস রিশিডিউল করতে চাইলে নির্ধারিত সময়ের অন্তত ৪ ঘণ্টা আগে শিক্ষক বা সাপোর্ট টিমকে অবহিত করতে হবে।",
        contentEn: "Notify the tutor or support team at least 4 hours prior to scheduled class time for emergency rescheduling."
      }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: "refund-policy",
    slug: "refund-policy",
    titleBn: "রিফান্ড পলিসি",
    titleEn: "Refund Policy",
    subtitleBn: "শিক্ষার্থী ও অভিভাবকদের অধিকার রক্ষায় আমাদের ১০০% স্বচ্ছ ও ঝুঁকিমুক্ত রিফান্ড নীতি।",
    subtitleEn: "Our 100% transparent and risk-free refund policy designed to protect student and parent rights.",
    lastUpdatedBn: "১০ আগস্ট, ২০২৬",
    lastUpdatedEn: "August 10, 2026",
    metaTitleBn: "রিফান্ড পলিসি | OTOTeachers",
    metaTitleEn: "Refund Policy | OTOTeachers",
    metaDescriptionBn: "১০০% স্বচ্ছ রিফান্ড পলিসি — ১ম ক্লাস ফ্রি ট্রায়াল এবং অসন্তুষ্টিতে শতভাগ মানিব্যাক গ্যারান্টি।",
    metaDescriptionEn: "100% transparent refund policy — 1st free trial session and risk-free satisfaction guarantee.",
    sections: [
      {
        id: "sec-1",
        icon: "ShieldCheck",
        titleBn: "১. প্রথম সেশন ১০০% ফ্রি ট্রায়াল",
        titleEn: "1. 100% Free First Trial Session",
        contentBn: "আমাদের যেকোনো বিষয়ভিত্তিক ১-অন-১ শিক্ষকের প্রথম ডেমো/ট্রায়াল ক্লাস সম্পূর্ণ বিনামূল্যে প্রদান করা হয়। প্রথম সেশন দেখার পরই অভিভাবক বা শিক্ষার্থী চূড়ান্ত ভর্তির সিদ্ধান্ত নিতে পারেন।",
        contentEn: "Every subject 1-on-1 mentor matching comes with an initial free trial class. Finalize enrollment only after experiencing the first live session."
      },
      {
        id: "sec-2",
        icon: "RefreshCw",
        titleBn: "২. শিক্ষক পরিবর্তনের সুযোগ ও রিফান্ড",
        titleEn: "2. Tutor Replacement & Refund Options",
        contentBn: "ভর্তির পর যদি শিক্ষকের পড়ানোর ধরণ শিক্ষার্থীর সাথে সামঞ্জস্যপূর্ণ না হয়, তবে ৪৮ ঘণ্টার মধ্যে সম্পূর্ণ নতুন শিক্ষক বরাদ্দ দেওয়া হবে। কোনো কারণে অভিভাবক যদি সেবা স্থগিত করতে চান, তবে অব্যবহৃত ক্লাসের সম্পূর্ণ ফি ফেরত প্রদান করা হবে।",
        contentEn: "If an assigned tutor does not fit your learning pace, we replace the mentor within 48 hours. Unutilized session fees will be refunded pro-rata."
      },
      {
        id: "sec-3",
        icon: "CheckCircle",
        titleBn: "৩. রিফান্ড আবেদনের নিয়মাবলী",
        titleEn: "3. Refund Request Process",
        contentBn: "আমাদের সাপোর্ট ইমেইলে (support@ototeachers.com) অথবা হটলাইনে (01775551325) যোগাযোগ করে রিফান্ড রিকোয়েস্ট পাঠান। আবেদন অনুমোদনের ৩ থেকে ৭ কর্মদিবসের মধ্যে আপনার বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে অর্থ ফেরত পাঠানো হবে।",
        contentEn: "Send your refund request to support@ototeachers.com or hotline 01775551325. Refunds are processed within 3 to 7 working days."
      },
      {
        id: "sec-4",
        icon: "HelpCircle",
        titleBn: "৪. প্রযুক্তিগত বা শিক্ষক অনুপস্থিতির রিফান্ড",
        titleEn: "4. Technical Issues or Tutor Absence",
        contentBn: "শিক্ষকের ব্যক্তিগত সমস্যা বা বিদ্যুৎ/ইন্টারনেট বিভ্রাটের কারণে কোনো ক্লাস বাতিল হলে অতিরিক্ত মেকআপ ক্লাস নেওয়া হবে অথবা সমপরিমাণ অর্থ সম্পূর্ণ ফেরতযোগ্য হবে।",
        contentEn: "If a class is cancelled due to tutor absence or technical disruption, a replacement makeup session is scheduled or a full refund for that session is issued."
      }
    ],
    updatedAt: new Date().toISOString()
  }
];

export const initialData: DBData = {
  pages: defaultPages,
  enrollments: [
    {
      id: "ENR-1001",
      studentName: "রাকিব হাসান",
      phone: "01711223344",
      grade: "Class X (SSC)",
      district: "ঢাকা",
      selectedSubjects: ["Higher Mathematics", "Physics"],
      preferredTime: "7:00 PM Evening",
      fee: 6000,
      status: "Pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "ENR-1002",
      studentName: "সাবরিনা সুলতানা",
      phone: "01899887766",
      grade: "HSC 2nd Year",
      district: "চট্টগ্রাম",
      selectedSubjects: ["Chemistry", "Biology"],
      preferredTime: "4:00 PM Afternoon",
      fee: 8000,
      status: "Contacted",
      createdAt: new Date().toISOString(),
    },
  ],
  pricingRequests: [
    {
      id: "PRC-2001",
      studentName: "তানজিম আহমেদ",
      phone: "01555443322",
      planName: "সাশ্রয়ী ২-বিষয় প্যাক",
      duration: "৬ মাস",
      monthlyFee: 5500,
      status: "Pending",
      createdAt: new Date().toISOString(),
    },
  ],
  contacts: [
    {
      id: "MSG-3001",
      name: "মাহমুদুল হাসান",
      email: "mahmud@gmail.com",
      phone: "01911223344",
      subject: "১-অন-১ ক্লাস সিডিউল প্রশ্ন",
      message: "আসসালামু আলাইকুম, এসএসসি গাণিতিক বিষয়ের জন্য টিউটর সিডিউল কিভাবে নির্ধারণ করা হয়?",
      createdAt: new Date().toISOString(),
    },
  ],
  teachers: [
    {
      id: "tch-1",
      nameBn: "রাফাত তানভীর",
      nameEn: "Rafat Tanvir",
      universityBn: "বুয়েট (সিএসই)",
      universityEn: "BUET (CSE)",
      subjectBn: "উচ্চতর গণিত ও পদার্থবিজ্ঞান",
      subjectEn: "Higher Math & Physics",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "tch-2",
      nameBn: "নুসরাত সুলতানা",
      nameEn: "Nusrat Sultana",
      universityBn: "ঢাকা বিশ্ববিদ্যালয় (রসায়ন)",
      universityEn: "Dhaka University (Chemistry)",
      subjectBn: "রসায়ন ও জীববিজ্ঞান",
      subjectEn: "Chemistry & Biology",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "tch-3",
      nameBn: "আরিফুল ইসলাম",
      nameEn: "Ariful Islam",
      universityBn: "ঢাকা মেডিকেল কলেজ (এমবিবিএস)",
      universityEn: "DMC (MBBS)",
      subjectBn: "বায়োলজি ও মেডিকেল এডমিশন",
      subjectEn: "Biology & Medical Prep",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "tch-4",
      nameBn: "ফারজানা ইয়াসমিন",
      nameEn: "Farzana Yasmin",
      universityBn: "বুয়েট (ইইই)",
      universityEn: "BUET (EEE)",
      subjectBn: "পদার্থবিজ্ঞান ও আইসিটি",
      subjectEn: "Physics & ICT",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      qBn: "১-অন-১ লাইভ ক্লাস কিভাবে পরিচালিত হয়?",
      qEn: "How are 1-on-1 live classes conducted?",
      aBn: "আমাদের ১-অন-১ ক্লাস গুগল মিট ও জুমের মাধ্যমে সরাসরি টিউটর এবং শিক্ষার্থীর মধ্যে অনুষ্ঠিত হয়, যেখানে সম্পূর্ণ ব্যক্তিগত মনোযোগ দেওয়া হয়।",
      aEn: "Our 1-on-1 classes are held directly between tutor and student via Google Meet and Zoom with full personalized attention.",
    },
    {
      id: "faq-2",
      qBn: "শিক্ষকগণ কোন বিশ্ববিদ্যালয় থেকে যুক্ত?",
      qEn: "Which universities are the tutors from?",
      aBn: "আমাদের সকল শিক্ষক বুয়েট (BUET), ঢাকা বিশ্ববিদ্যালয় (DU), এবং শীর্ষ সরকারি মেডিকেল কলেজের অভিজ্ঞ মেধা তালিকার শিক্ষার্থী।",
      aEn: "All our tutors are top merit rankers from BUET, Dhaka University (DU), and Medical Colleges.",
    },
    {
      id: "faq-3",
      qBn: "ক্লাসের সময়সূচী কিভাবে নির্ধারিত হয়?",
      qEn: "How is the class schedule determined?",
      aBn: "শিক্ষার্থী এবং অভিভাবকের পছন্দের সুবিধাজনক সময়ে ক্লাস নির্ধারণ করা হয়।",
      aEn: "Class schedules are flexibly customized based on student and guardian availability.",
    },
    {
      id: "faq-4",
      qBn: "ফ্রি ট্রায়াল ক্লাসের সুবিধা আছে কি?",
      qEn: "Is there a free trial class available?",
      aBn: "হ্যাঁ, যেকোনো বিষয়ে ভর্তি হওয়ার পূর্বে ১ম ফ্রি ডেমো ক্লাস বুক করতে পারবেন।",
      aEn: "Yes, you can book a free 1st demo trial class before confirming enrollment.",
    },
  ],
  blogs: [...BLOG_POSTS],
  settings: {
    socialLinks: [
      { id: "soc-1", name: "Facebook", iconUrl: "facebook", url: "https://facebook.com" },
      { id: "soc-2", name: "Instagram", iconUrl: "instagram", url: "https://instagram.com" },
      { id: "soc-3", name: "YouTube", iconUrl: "youtube", url: "https://youtube.com" },
      { id: "soc-4", name: "LinkedIn", iconUrl: "linkedin", url: "https://linkedin.com" },
    ],
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
    linkedinUrl: "https://linkedin.com",
    whatsappPhone: "8801775551325",
    whatsappMessageBn: "হ্যালো ototeachers.com টিম, ১-অন-১ অনলাইন শিক্ষক সম্পর্কে জানতে চাই।",
    whatsappMessageEn: "Hello ototeachers.com team, I want to inquire about 1-on-1 online teachers.",
    phone: "01775551325",
    email: "support@ototeachers.com",
    addressBn: "ধানমণ্ডি, ঢাকা, বাংলাদেশ",
    addressEn: "Dhanmondi, Dhaka, Bangladesh",
    metaTitle: "ototeachers.com — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All",
    metaDescription: "বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে।",
    keywords: "ototeachers.com, ototeachers, online teacher Bangladesh, ১-অন-১ শিক্ষক, private tutor Bangladesh",
  },
};

// -------------------------------------------------------------
// In-Memory Data Store (Zero file I/O for serverless Next.js API routes)
// -------------------------------------------------------------
let inMemoryDB: DBData | null = null;

export function getDB(): DBData {
  if (!inMemoryDB) {
    inMemoryDB = JSON.parse(JSON.stringify(initialData)) as DBData;
  }
  if (!inMemoryDB.pages || inMemoryDB.pages.length === 0) {
    inMemoryDB.pages = JSON.parse(JSON.stringify(defaultPages));
  }
  return inMemoryDB;
}

export function saveDB(data: DBData): void {
  inMemoryDB = data;
}

// -------------------------------------------------------------
// Supabase Data Access Operations with Graceful Local Fallbacks
// -------------------------------------------------------------

// --- 1. Enrollments ---
export async function getEnrollments(): Promise<Enrollment[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          studentName: row.student_name,
          phone: row.phone,
          grade: row.grade,
          district: row.district,
          selectedSubjects: row.selected_subjects || [],
          preferredTime: row.preferred_time,
          medium: row.medium || "",
          selectedPlan: row.selected_plan || "",
          fee: Number(row.fee) || 0,
          status: row.status,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.error("Supabase getEnrollments error, falling back to local DB:", e);
    }
  }
  return getDB().enrollments || [];
}

export async function insertEnrollment(enrollment: Enrollment): Promise<Enrollment> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        id: enrollment.id,
        student_name: enrollment.studentName,
        phone: enrollment.phone,
        grade: enrollment.grade,
        district: enrollment.district,
        selected_subjects: enrollment.selectedSubjects,
        preferred_time: enrollment.preferredTime,
        medium: enrollment.medium || "",
        selected_plan: enrollment.selectedPlan || "",
        fee: enrollment.fee,
        status: enrollment.status,
        created_at: enrollment.createdAt,
      };
      const { error } = await supabase.from("enrollments").insert(row);
      if (!error) return enrollment;
      console.error("Supabase insertEnrollment error:", error.message);
    } catch (e) {
      console.error("Supabase insertEnrollment error:", e);
    }
  }
  const db = getDB();
  db.enrollments = db.enrollments || [];
  db.enrollments.unshift(enrollment);
  saveDB(db);
  return enrollment;
}

export async function updateEnrollmentStatus(id: string, status: Enrollment["status"]): Promise<Enrollment | null> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("enrollments")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          studentName: data.student_name,
          phone: data.phone,
          grade: data.grade,
          district: data.district,
          selectedSubjects: data.selected_subjects || [],
          preferredTime: data.preferred_time,
          medium: data.medium || "",
          selectedPlan: data.selected_plan || "",
          fee: Number(data.fee) || 0,
          status: data.status,
          createdAt: data.created_at,
        };
      }
    } catch (e) {
      console.error("Supabase updateEnrollmentStatus error:", e);
    }
  }
  const db = getDB();
  const item = db.enrollments?.find((e) => e.id === id);
  if (item) {
    item.status = status;
    saveDB(db);
    return item;
  }
  return null;
}

export async function deleteEnrollment(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("enrollments").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase deleteEnrollment error:", e);
    }
  }
  const db = getDB();
  if (db.enrollments) {
    db.enrollments = db.enrollments.filter((e) => e.id !== id);
    saveDB(db);
    return true;
  }
  return false;
}

// --- 2. Pricing Requests ---
export async function getPricingRequests(): Promise<PricingRequest[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("pricing_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          studentName: row.student_name,
          phone: row.phone || "",
          planName: row.plan_name,
          duration: row.duration,
          monthlyFee: Number(row.monthly_fee) || 0,
          status: row.status,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.error("Supabase getPricingRequests error:", e);
    }
  }
  return getDB().pricingRequests || [];
}

export async function insertPricingRequest(req: PricingRequest): Promise<PricingRequest> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        id: req.id,
        student_name: req.studentName,
        phone: req.phone || "",
        plan_name: req.planName,
        duration: req.duration,
        monthly_fee: req.monthlyFee,
        status: req.status,
        created_at: req.createdAt,
      };
      const { error } = await supabase.from("pricing_requests").insert(row);
      if (!error) return req;
    } catch (e) {
      console.error("Supabase insertPricingRequest error:", e);
    }
  }
  const db = getDB();
  db.pricingRequests = db.pricingRequests || [];
  db.pricingRequests.unshift(req);
  saveDB(db);
  return req;
}

export async function updatePricingRequestStatus(id: string, status: PricingRequest["status"]): Promise<PricingRequest | null> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("pricing_requests")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          studentName: data.student_name,
          phone: data.phone || "",
          planName: data.plan_name,
          duration: data.duration,
          monthlyFee: Number(data.monthly_fee) || 0,
          status: data.status,
          createdAt: data.created_at,
        };
      }
    } catch (e) {
      console.error("Supabase updatePricingRequestStatus error:", e);
    }
  }
  const db = getDB();
  const item = db.pricingRequests?.find((p) => p.id === id);
  if (item) {
    item.status = status;
    saveDB(db);
    return item;
  }
  return null;
}

export async function deletePricingRequest(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("pricing_requests").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase deletePricingRequest error:", e);
    }
  }
  const db = getDB();
  if (db.pricingRequests) {
    db.pricingRequests = db.pricingRequests.filter((p) => p.id !== id);
    saveDB(db);
    return true;
  }
  return false;
}

// --- 3. Contacts ---
export async function getContacts(): Promise<ContactMessage[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          name: row.name,
          email: row.email || "",
          phone: row.phone || "",
          subject: row.subject,
          message: row.message,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.error("Supabase getContacts error:", e);
    }
  }
  return getDB().contacts || [];
}

export async function insertContact(msg: ContactMessage): Promise<ContactMessage> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        id: msg.id,
        name: msg.name,
        email: msg.email || "",
        phone: msg.phone || "",
        subject: msg.subject,
        message: msg.message,
        created_at: msg.createdAt,
      };
      const { error } = await supabase.from("contacts").insert(row);
      if (!error) return msg;
    } catch (e) {
      console.error("Supabase insertContact error:", e);
    }
  }
  const db = getDB();
  db.contacts = db.contacts || [];
  db.contacts.unshift(msg);
  saveDB(db);
  return msg;
}

export async function deleteContact(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase deleteContact error:", e);
    }
  }
  const db = getDB();
  if (db.contacts) {
    db.contacts = db.contacts.filter((c) => c.id !== id);
    saveDB(db);
    return true;
  }
  return false;
}

// --- 4. Teachers ---
export async function getTeachers(): Promise<Teacher[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("teachers").select("*");
      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          nameBn: row.name_bn,
          nameEn: row.name_en,
          universityBn: row.university_bn,
          universityEn: row.university_en,
          subjectBn: row.subject_bn,
          subjectEn: row.subject_en,
          avatar: row.avatar,
          phone: row.phone,
          email: row.email,
          experienceBn: row.experience_bn,
          experienceEn: row.experience_en,
          bioBn: row.bio_bn,
          bioEn: row.bio_en,
          rating: row.rating,
        }));
      }
    } catch (e) {
      console.error("Supabase getTeachers error:", e);
    }
  }
  return getDB().teachers || [];
}

export async function insertTeacher(teacher: Teacher): Promise<Teacher> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        id: teacher.id,
        name_bn: teacher.nameBn,
        name_en: teacher.nameEn,
        university_bn: teacher.universityBn,
        university_en: teacher.universityEn,
        subject_bn: teacher.subjectBn,
        subject_en: teacher.subjectEn,
        avatar: teacher.avatar,
      };
      const { error } = await supabase.from("teachers").insert(row);
      if (!error) return teacher;
    } catch (e) {
      console.error("Supabase insertTeacher error:", e);
    }
  }
  const db = getDB();
  db.teachers = db.teachers || [];
  db.teachers.unshift(teacher);
  saveDB(db);
  return teacher;
}

export async function updateTeacher(teacher: Teacher): Promise<Teacher | null> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        name_bn: teacher.nameBn,
        name_en: teacher.nameEn,
        university_bn: teacher.universityBn,
        university_en: teacher.universityEn,
        subject_bn: teacher.subjectBn,
        subject_en: teacher.subjectEn,
        avatar: teacher.avatar,
      };
      const { error } = await supabase.from("teachers").update(row).eq("id", teacher.id);
      if (!error) return teacher;
    } catch (e) {
      console.error("Supabase updateTeacher error:", e);
    }
  }
  const db = getDB();
  if (db.teachers) {
    const idx = db.teachers.findIndex((t) => t.id === teacher.id);
    if (idx !== -1) {
      db.teachers[idx] = { ...db.teachers[idx], ...teacher };
      saveDB(db);
      return db.teachers[idx];
    }
  }
  return null;
}

export async function deleteTeacher(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("teachers").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase deleteTeacher error:", e);
    }
  }
  const db = getDB();
  if (db.teachers) {
    db.teachers = db.teachers.filter((t) => t.id !== id);
    saveDB(db);
    return true;
  }
  return false;
}

// --- 5. FAQs ---
export async function getFAQs(): Promise<FAQItem[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("faqs").select("*");
      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          qBn: row.q_bn,
          qEn: row.q_en,
          aBn: row.a_bn,
          aEn: row.a_en,
        }));
      }
    } catch (e) {
      console.error("Supabase getFAQs error:", e);
    }
  }
  return getDB().faqs || [];
}

export async function insertFAQ(faq: FAQItem): Promise<FAQItem> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        id: faq.id,
        q_bn: faq.qBn,
        q_en: faq.qEn,
        a_bn: faq.aBn,
        a_en: faq.aEn,
      };
      const { error } = await supabase.from("faqs").insert(row);
      if (!error) return faq;
    } catch (e) {
      console.error("Supabase insertFAQ error:", e);
    }
  }
  const db = getDB();
  db.faqs = db.faqs || [];
  db.faqs.push(faq);
  saveDB(db);
  return faq;
}

export async function updateFAQ(faq: FAQItem): Promise<FAQItem | null> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        q_bn: faq.qBn,
        q_en: faq.qEn,
        a_bn: faq.aBn,
        a_en: faq.aEn,
      };
      const { data, error } = await supabase
        .from("faqs")
        .update(row)
        .eq("id", faq.id)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          qBn: data.q_bn,
          qEn: data.q_en,
          aBn: data.a_bn,
          aEn: data.a_en,
        };
      }
    } catch (e) {
      console.error("Supabase updateFAQ error:", e);
    }
  }
  const db = getDB();
  if (db.faqs) {
    const idx = db.faqs.findIndex((f) => f.id === faq.id);
    if (idx !== -1) {
      db.faqs[idx] = faq;
      saveDB(db);
      return faq;
    }
  }
  return null;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase deleteFAQ error:", e);
    }
  }
  const db = getDB();
  if (db.faqs) {
    db.faqs = db.faqs.filter((f) => f.id !== id);
    saveDB(db);
    return true;
  }
  return false;
}

// --- 6. Blogs ---
export async function getBlogs(): Promise<BlogPost[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && Array.isArray(data)) {
        return data.map((row: any) => {
          let extra: any = {};
          if (row.content_bn) {
            try {
              extra = JSON.parse(row.content_bn);
            } catch {
              extra = { introBn: row.content_bn };
            }
          }
          return {
            id: row.id || row.slug,
            slug: row.slug || row.id,
            titleBn: row.title_bn,
            titleEn: row.title_en || "",
            category: row.category || "mentorship",
            featured: Boolean(extra.featured !== undefined ? extra.featured : row.featured),
            excerptBn: row.excerpt_bn || "",
            excerptEn: row.excerpt_en || "",
            publishedDateBn: row.published_date_bn || "",
            publishedDateEn: row.published_date_en || "",
            readTimeBn: extra.readTimeBn || row.read_time_bn || "৫ মিনিট পড়া",
            readTimeEn: extra.readTimeEn || row.read_time_en || "5 min read",
            image: row.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
            author: extra.author || (typeof row.author === "object" && row.author ? row.author : {
              nameBn: "OTOTeachers টিম",
              nameEn: "OTOTeachers Team",
              roleBn: "একাডেমিক মেন্টর",
              roleEn: "Academic Mentor",
              institutionBn: "বুয়েট ও ঢাবি",
              institutionEn: "BUET & DU",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            }),
            tagsBn: Array.isArray(extra.tagsBn) ? extra.tagsBn : (Array.isArray(row.tags_bn) ? row.tags_bn : ["১-অন-১ মেন্টরিং", "শিক্ষা পদ্ধতি"]),
            tagsEn: Array.isArray(extra.tagsEn) ? extra.tagsEn : (Array.isArray(row.tags_en) ? row.tags_en : ["1-on-1 Mentoring", "Study Tips"]),
            introBn: extra.introBn || row.intro_bn || row.excerpt_bn || "",
            introEn: extra.introEn || row.intro_en || row.excerpt_en || "",
            sectionsBn: Array.isArray(extra.sectionsBn) && extra.sectionsBn.length > 0 ? extra.sectionsBn : (
              Array.isArray(row.sections_bn) && row.sections_bn.length > 0 ? row.sections_bn : [
                {
                  heading: row.title_bn,
                  paragraphs: [row.excerpt_bn || ""],
                }
              ]
            ),
            sectionsEn: Array.isArray(extra.sectionsEn) && extra.sectionsEn.length > 0 ? extra.sectionsEn : (
              Array.isArray(row.sections_en) && row.sections_en.length > 0 ? row.sections_en : [
                {
                  heading: row.title_en || row.title_bn,
                  paragraphs: [row.excerpt_en || ""],
                }
              ]
            ),
            keyTakeawaysBn: Array.isArray(extra.keyTakeawaysBn) ? extra.keyTakeawaysBn : (Array.isArray(row.key_takeaways_bn) ? row.key_takeaways_bn : []),
            keyTakeawaysEn: Array.isArray(extra.keyTakeawaysEn) ? extra.keyTakeawaysEn : (Array.isArray(row.key_takeaways_en) ? row.key_takeaways_en : []),
          };
        });
      }
    } catch (e) {
      console.error("Supabase getBlogs error, falling back to local DB:", e);
    }
  }
  const db = getDB();
  return db.blogs || [];
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const blogs = await getBlogs();
  const found = blogs.find((b) => b.slug === slug || b.id === slug);
  return found || null;
}

export async function insertBlog(blog: BlogPost): Promise<BlogPost> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const extraData = {
        featured: Boolean(blog.featured),
        author: blog.author,
        readTimeBn: blog.readTimeBn,
        readTimeEn: blog.readTimeEn,
        tagsBn: blog.tagsBn,
        tagsEn: blog.tagsEn,
        introBn: blog.introBn,
        introEn: blog.introEn,
        sectionsBn: blog.sectionsBn,
        sectionsEn: blog.sectionsEn,
        keyTakeawaysBn: blog.keyTakeawaysBn,
        keyTakeawaysEn: blog.keyTakeawaysEn,
      };
      const row = {
        id: blog.id,
        slug: blog.slug,
        title_bn: blog.titleBn,
        title_en: blog.titleEn || "",
        category: blog.category || "mentorship",
        excerpt_bn: blog.excerptBn || "",
        excerpt_en: blog.excerptEn || "",
        published_date_bn: blog.publishedDateBn || "",
        published_date_en: blog.publishedDateEn || "",
        image: blog.image || "",
        content_bn: JSON.stringify(extraData),
        content_en: blog.introEn || "",
      };
      const { error } = await supabase.from("blogs").insert(row);
      if (!error) return blog;
      console.error("Supabase insertBlog error:", error.message);
    } catch (e) {
      console.error("Supabase insertBlog error:", e);
    }
  }
  const db = getDB();
  db.blogs = db.blogs || [];
  db.blogs.unshift(blog);
  saveDB(db);
  return blog;
}

export async function updateBlog(blog: BlogPost): Promise<BlogPost | null> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const extraData = {
        featured: Boolean(blog.featured),
        author: blog.author,
        readTimeBn: blog.readTimeBn,
        readTimeEn: blog.readTimeEn,
        tagsBn: blog.tagsBn,
        tagsEn: blog.tagsEn,
        introBn: blog.introBn,
        introEn: blog.introEn,
        sectionsBn: blog.sectionsBn,
        sectionsEn: blog.sectionsEn,
        keyTakeawaysBn: blog.keyTakeawaysBn,
        keyTakeawaysEn: blog.keyTakeawaysEn,
      };
      const row = {
        slug: blog.slug,
        title_bn: blog.titleBn,
        title_en: blog.titleEn || "",
        category: blog.category || "mentorship",
        excerpt_bn: blog.excerptBn || "",
        excerpt_en: blog.excerptEn || "",
        published_date_bn: blog.publishedDateBn || "",
        published_date_en: blog.publishedDateEn || "",
        image: blog.image || "",
        content_bn: JSON.stringify(extraData),
        content_en: blog.introEn || "",
      };
      const { error } = await supabase
        .from("blogs")
        .update(row)
        .eq("id", blog.id);
      if (!error) return blog;
      console.error("Supabase updateBlog error:", error?.message);
    } catch (e) {
      console.error("Supabase updateBlog error:", e);
    }
  }
  const db = getDB();
  if (db.blogs) {
    const idx = db.blogs.findIndex((b) => b.id === blog.id || b.slug === blog.slug);
    if (idx !== -1) {
      db.blogs[idx] = blog;
      saveDB(db);
      return blog;
    }
  }
  return null;
}

export async function deleteBlog(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("blogs").delete().or(`id.eq.${id},slug.eq.${id}`);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase deleteBlog error:", e);
    }
  }
  const db = getDB();
  if (db.blogs) {
    db.blogs = db.blogs.filter((b) => b.id !== id && b.slug !== id);
    saveDB(db);
    return true;
  }
  return false;
}

// --- 7. Settings ---
export async function getSettings(): Promise<SettingData> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("id", "general_settings")
        .single();
      if (!error && data) {
        return {
          socialLinks: data.social_links || [],
          facebookUrl: data.facebook_url,
          instagramUrl: data.instagram_url,
          youtubeUrl: data.youtube_url,
          linkedinUrl: data.linkedin_url,
          whatsappPhone: data.whatsapp_phone,
          whatsappMessageBn: data.whatsapp_message_bn,
          whatsappMessageEn: data.whatsapp_message_en,
          phone: data.phone,
          email: data.email,
          addressBn: data.address_bn,
          addressEn: data.address_en,
          metaTitle: data.meta_title,
          metaDescription: data.meta_description,
          keywords: data.keywords,
        };
      }
    } catch (e) {
      console.error("Supabase getSettings error:", e);
    }
  }
  return getDB().settings || {};
}

export async function saveSettings(settings: Partial<SettingData>): Promise<SettingData> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const current = await getSettings();
      const updated = { ...current, ...settings };
      const row = {
        id: "general_settings",
        social_links: updated.socialLinks || [],
        facebook_url: updated.facebookUrl,
        instagram_url: updated.instagramUrl,
        youtube_url: updated.youtubeUrl,
        linkedin_url: updated.linkedinUrl,
        whatsapp_phone: updated.whatsappPhone,
        whatsapp_message_bn: updated.whatsappMessageBn,
        whatsapp_message_en: updated.whatsappMessageEn,
        phone: updated.phone,
        email: updated.email,
        address_bn: updated.addressBn,
        address_en: updated.addressEn,
        meta_title: updated.metaTitle,
        meta_description: updated.metaDescription,
        keywords: updated.keywords,
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("settings").upsert(row);
      if (!error) return updated;
    } catch (e) {
      console.error("Supabase saveSettings error:", e);
    }
  }
  const db = getDB();
  db.settings = { ...db.settings, ...settings };
  saveDB(db);
  return db.settings;
}

// --- 8. Teacher Applications ---
export async function getTeacherApplications(): Promise<TeacherApplication[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("teacher_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          fullName: row.full_name,
          phone: row.phone,
          email: row.email || "",
          institution: row.institution,
          subjectExpertise: row.subject_expertise,
          hoursPerWeek: row.hours_per_week,
          status: row.status,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.error("Supabase getTeacherApplications error:", e);
    }
  }
  return getDB().teacherApplications || [];
}

export async function insertTeacherApplication(app: TeacherApplication): Promise<TeacherApplication> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        id: app.id,
        full_name: app.fullName,
        phone: app.phone,
        email: app.email || "",
        institution: app.institution,
        subject_expertise: app.subjectExpertise,
        hours_per_week: app.hoursPerWeek,
        status: app.status || "Pending",
        created_at: app.createdAt || new Date().toISOString(),
      };
      const { error } = await supabase.from("teacher_applications").insert(row);
      if (!error) return app;
    } catch (e) {
      console.error("Supabase insertTeacherApplication error:", e);
    }
  }
  const db = getDB();
  db.teacherApplications = db.teacherApplications || [];
  db.teacherApplications.unshift(app);
  saveDB(db);
  return app;
}

export async function updateTeacherApplicationStatus(
  id: string,
  status: TeacherApplication["status"]
): Promise<TeacherApplication | null> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("teacher_applications")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          fullName: data.full_name,
          phone: data.phone,
          email: data.email || "",
          institution: data.institution,
          subjectExpertise: data.subject_expertise,
          hoursPerWeek: data.hours_per_week,
          status: data.status,
          createdAt: data.created_at,
        };
      }
    } catch (e) {
      console.error("Supabase updateTeacherApplicationStatus error:", e);
    }
  }
  const db = getDB();
  const index = db.teacherApplications?.findIndex((a) => a.id === id) ?? -1;
  if (index !== -1 && db.teacherApplications) {
    db.teacherApplications[index].status = status;
    saveDB(db);
    return db.teacherApplications[index];
  }
  return null;
}

export async function deleteTeacherApplication(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("teacher_applications").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase deleteTeacherApplication error:", e);
    }
  }
  const db = getDB();
  if (db.teacherApplications) {
    db.teacherApplications = db.teacherApplications.filter((a) => a.id !== id);
    saveDB(db);
    return true;
  }
  return false;
}

// --- 9. Inquiries ---
export async function getInquiries(): Promise<Inquiry[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          name: row.name,
          phone: row.phone || "",
          subject: row.subject,
          message: row.message,
          status: row.status,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.error("Supabase getInquiries error:", e);
    }
  }
  return getDB().inquiries || [];
}

export async function insertInquiry(inquiry: Inquiry): Promise<Inquiry> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        id: inquiry.id,
        name: inquiry.name,
        phone: inquiry.phone || "",
        subject: inquiry.subject,
        message: inquiry.message,
        status: inquiry.status || "Pending",
        created_at: inquiry.createdAt || new Date().toISOString(),
      };
      const { error } = await supabase.from("inquiries").insert(row);
      if (!error) return inquiry;
    } catch (e) {
      console.error("Supabase insertInquiry error:", e);
    }
  }
  const db = getDB();
  db.inquiries = db.inquiries || [];
  db.inquiries.unshift(inquiry);
  saveDB(db);
  return inquiry;
}

export async function updateInquiryStatus(id: string, status: string): Promise<Inquiry | null> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          name: data.name,
          phone: data.phone || "",
          subject: data.subject,
          message: data.message,
          status: data.status,
          createdAt: data.created_at,
        };
      }
    } catch (e) {
      console.error("Supabase updateInquiryStatus error:", e);
    }
  }
  const db = getDB();
  const index = db.inquiries?.findIndex((i) => i.id === id) ?? -1;
  if (index !== -1 && db.inquiries) {
    db.inquiries[index].status = status;
    saveDB(db);
    return db.inquiries[index];
  }
  return null;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase deleteInquiry error:", e);
    }
  }
  const db = getDB();
  if (db.inquiries) {
    db.inquiries = db.inquiries.filter((i) => i.id !== id);
    saveDB(db);
    return true;
  }
  return false;
}

// --- 10. Payments ---
export async function getPayments(): Promise<Payment[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          studentName: row.student_name,
          phone: row.phone || "",
          amount: Number(row.amount) || 0,
          trxId: row.trx_id,
          type: row.type || "Fee Collection",
          paymentMethod: row.payment_method || "bKash",
          status: row.status,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.error("Supabase getPayments error:", e);
    }
  }
  return getDB().payments || [];
}

export async function insertPayment(payment: Payment): Promise<Payment> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const row = {
        id: payment.id,
        student_name: payment.studentName,
        phone: payment.phone || "",
        amount: payment.amount,
        trx_id: payment.trxId,
        type: payment.type || "Fee Collection",
        payment_method: payment.paymentMethod || "bKash",
        status: payment.status || "Paid",
        created_at: payment.createdAt || new Date().toISOString(),
      };
      const { error } = await supabase.from("payments").insert(row);
      if (!error) return payment;
    } catch (e) {
      console.error("Supabase insertPayment error:", e);
    }
  }
  const db = getDB();
  db.payments = db.payments || [];
  db.payments.unshift(payment);
  saveDB(db);
  return payment;
}

export async function updatePaymentStatus(id: string, status: Payment["status"]): Promise<Payment | null> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("payments")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          studentName: data.student_name,
          phone: data.phone || "",
          amount: Number(data.amount) || 0,
          trxId: data.trx_id,
          type: data.type || "Fee Collection",
          paymentMethod: data.payment_method || "bKash",
          status: data.status,
          createdAt: data.created_at,
        };
      }
    } catch (e) {
      console.error("Supabase updatePaymentStatus error:", e);
    }
  }
  const db = getDB();
  const index = db.payments?.findIndex((p) => p.id === id) ?? -1;
  if (index !== -1 && db.payments) {
    db.payments[index].status = status;
    saveDB(db);
    return db.payments[index];
  }
  return null;
}

export async function deletePayment(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("payments").delete().eq("id", id);
      if (!error) return true;
    } catch (e) {
      console.error("Supabase deletePayment error:", e);
    }
  }
  const db = getDB();
  if (db.payments) {
    db.payments = db.payments.filter((p) => p.id !== id);
    saveDB(db);
    return true;
  }
  return false;
}

// ============================================================
// Custom Pages Management Helpers
// ============================================================

export async function getCustomPages(): Promise<CustomPage[]> {
  const db = getDB();
  return db.pages || [];
}

export async function getPageBySlug(slug: string): Promise<CustomPage | null> {
  const db = getDB();
  const found = (db.pages || []).find((p) => p.slug === slug || p.id === slug);
  return found || null;
}

export async function saveCustomPage(pageData: Partial<CustomPage> & { id: string; slug: string }): Promise<CustomPage> {
  const db = getDB();
  if (!db.pages) db.pages = [];

  const existingIndex = db.pages.findIndex((p) => p.id === pageData.id || p.slug === pageData.slug);

  const fullPage: CustomPage = {
    id: pageData.id || (existingIndex !== -1 ? db.pages[existingIndex].id : pageData.slug),
    slug: pageData.slug || (existingIndex !== -1 ? db.pages[existingIndex].slug : "custom-page"),
    titleBn: pageData.titleBn || "",
    titleEn: pageData.titleEn || "",
    subtitleBn: pageData.subtitleBn || "",
    subtitleEn: pageData.subtitleEn || "",
    lastUpdatedBn: pageData.lastUpdatedBn || "১০ আগস্ট, ২০২৬",
    lastUpdatedEn: pageData.lastUpdatedEn || "August 10, 2026",
    sections: pageData.sections || [],
    metaTitleBn: pageData.metaTitleBn || pageData.titleBn || "",
    metaTitleEn: pageData.metaTitleEn || pageData.titleEn || "",
    metaDescriptionBn: pageData.metaDescriptionBn || pageData.subtitleBn || "",
    metaDescriptionEn: pageData.metaDescriptionEn || pageData.subtitleEn || "",
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex !== -1) {
    db.pages[existingIndex] = { ...db.pages[existingIndex], ...fullPage };
  } else {
    db.pages.push(fullPage);
  }

  saveDB(db);
  return fullPage;
}

export async function deleteCustomPage(idOrSlug: string): Promise<boolean> {
  const db = getDB();
  if (!db.pages) return false;
  const initialLength = db.pages.length;
  db.pages = db.pages.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
  if (db.pages.length !== initialLength) {
    saveDB(db);
    return true;
  }
  return false;
}

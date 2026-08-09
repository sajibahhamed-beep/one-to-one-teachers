import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "db.json");

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
  subjectExpertise: string;
  hoursPerWeek: string;
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
}

const initialData: DBData = {
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
  blogs: [
    {
      id: "1",
      slug: "hsc-board-prep-guide",
      titleBn: "এইচএসসি বোর্ড পরীক্ষায় ভালো করার বৈজ্ঞানিক টিপস ও ট্রিকস",
      titleEn: "Scientific Tips to Excel in HSC Board Exams",
      category: "board-prep",
      excerptBn: "বুয়েট ও ঢাবি টিউটরদের অভিজ্ঞতা অনুযায়ী পদার্থ ও রসায়নে এ+ পাওয়ার সবচেয়ে কার্যকর পড়ার রুটিন।",
      publishedDateBn: "০৫ আগস্ট, ২০২৬",
    },
    {
      id: "2",
      slug: "ssc-math-fear-elimination",
      titleBn: "এসএসসি সাধারণ ও উচ্চতর গণিতের ভয় দূর করার ৫ কৌশল",
      titleEn: "5 Strategies to Eliminate Math Fear in SSC",
      category: "math-science",
      excerptBn: "গণিতের সূত্রের সহজ প্রয়োগ এবং ১-অন-১ মেন্টরিংয়ের মাধ্যমে সহজেই নিশ্চিত এ+ পাওয়ার পথচিত্র।",
      publishedDateBn: "০৩ আগস্ট, ২০২৬",
    },
  ],
  settings: {
    socialLinks: [
      { id: "soc-1", name: "Facebook", iconUrl: "facebook", url: "https://facebook.com" },
      { id: "soc-2", name: "Instagram", iconUrl: "instagram", url: "https://instagram.com" },
      { id: "soc-3", name: "YouTube", iconUrl: "youtube", url: "https://youtube.com" },
      { id: "soc-4", name: "LinkedIn", iconUrl: "linkedin", url: "https://linkedin.com" },
    ],
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

export function getDB(): DBData {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
      return initialData;
    }

    const content = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading database", error);
    return initialData;
  }
}

export function saveDB(data: DBData): void {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error saving database", error);
  }
}

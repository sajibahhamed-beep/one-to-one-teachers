import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import { getFAQPageSchema, SITE_URL, SITE_NAME, DEFAULT_SEO } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "Affordable One-to-One Online Teachers in Bangladesh | OTOTeachers",
  description:
    "বাংলাদেশে সাশ্রয়ী ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে লাইভ ওয়ান-টু-ওয়ান ক্লাস — ঘরে বসে। প্রথম ট্রায়াল ক্লাস সম্পূর্ণ বিনামূল্যে।",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Affordable One-to-One Online Teachers in Bangladesh | OTOTeachers",
    description: "Connect with verified online tutors from BUET, DU & Medical Colleges for 100% live 1-on-1 classes across Bangladesh. First session free.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
        width: 1200,
        height: 630,
        alt: "Affordable One-to-One Online Teachers in Bangladesh - OTOTeachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affordable One-to-One Online Teachers in Bangladesh | OTOTeachers",
    description: "100% live one-to-one online classes with top university tutors. First session completely free.",
    images: [`${SITE_URL}/Assets/Group%202147229264.png`],
  },
};

const homeFaqs = [
  {
    q: "১-অন-১ অনলাইন ক্লাস কীভাবে কাজ করে?",
    a: "আপনি আপনার পছন্দের বিষয় ও সময় বেছে নেন। আমরা ৪৮ ঘণ্টার মধ্যে আপনার জন্য একজন উপযুক্ত যাচাইকৃত শিক্ষক খুঁজে দিই। ক্লাস হয় সম্পূর্ণ অনলাইনে — Zoom, Google Meet বা WhatsApp Call-এর মাধ্যমে, একদম ঘরে বসে।",
  },
  {
    q: "প্রথম ফ্রি ট্রায়াল ক্লাসটি কীভাবে পাবো?",
    a: "শুধু ফর্মটি পূরণ করুন। আমরা আপনার সাথে যোগাযোগ করব এবং প্রথম সেশনটি সম্পূর্ণ বিনামূল্যে নেওয়ার ব্যবস্থা করব। কোনো কার্ড বা অগ্রিম পেমেন্টের প্রয়োজন নেই।",
  },
  {
    q: "শিক্ষকরা কি সত্যিই বুয়েট, ঢাবি বা মেডিকেলের?",
    a: "হ্যাঁ। আমাদের সকল শিক্ষক বাংলাদেশের শীর্ষস্থানীয় বিশ্ববিদ্যালয়ের ছাত্র বা সদ্য পাস করা গ্র্যাজুয়েট। তাদের একাডেমিক সনদ যাচাই করে তারপরই প্ল্যাটফর্মে যোগ দেওয়ার অনুমতি দেওয়া হয়।",
  },
  {
    q: "ক্লাসের ফি কত? টাকা না থাকলে কী হবে?",
    a: "আমাদের 'যা সাধ্যে কুলায় তাই দাও' (Pay-what-you-can) নীতি অনুযায়ী ফি নির্ধারিত হয়। আর্থিক সংকটে থাকা শিক্ষার্থীরা সম্পূর্ণ বিনামূল্যেও ক্লাস করতে পারবে — কারণ আমরা বিশ্বাস করি, অর্থ যেন কোনো শিক্ষার্থীর শিক্ষার পথে বাধা না হয়।",
  },
  {
    q: "কোন কোন বিষয়ে শিক্ষক পাওয়া যাবে?",
    a: "গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, ইংরেজি (স্পোকেন সহ), বাংলা, আইসিটি, হিসাববিজ্ঞান, এবং বোর্ড পরীক্ষার সকল বিষয়ে আমাদের যাচাইকৃত শিক্ষক রয়েছে।",
  },
  {
    q: "ক্লাসের সময়সূচি কি নিজে ঠিক করা যাবে?",
    a: "হ্যাঁ। শিক্ষার্থী ও শিক্ষক উভয়ের সুবিধামতো সময়ে ক্লাস নির্ধারিত হয়। সকাল, বিকেল বা রাতে — যেকোনো সময়ে নিতে পারবেন।",
  },
  {
    q: "শিক্ষক পছন্দ না হলে কী করব?",
    a: "কোনো সমস্যা নেই। ট্রায়াল ক্লাসের পরে শিক্ষক পছন্দ না হলে আমরা বিনামূল্যে নতুন শিক্ষক ম্যাচ করে দেব। আপনার সন্তুষ্টি আমাদের সর্বোচ্চ অগ্রাধিকার।",
  },
  {
    q: "ঢাকার বাইরে থেকেও কি ক্লাস নেওয়া যাবে?",
    a: "অবশ্যই। ক্লাস সম্পূর্ণ অনলাইনে হওয়ায় বাংলাদেশের যেকোনো জেলা — রংপুর, খুলনা, রাজশাহী, চট্টগ্রাম, বরিশাল যেখান থেকেই হোক — শুধু একটি স্মার্টফোন ও ইন্টারনেট সংযোগ থাকলেই চলবে।",
  },
];

export default function HomePage() {
  const faqSchema = getFAQPageSchema(homeFaqs);

  return (
    <>
      <JsonLd data={faqSchema} />
      <HomeClient />
    </>
  );
}

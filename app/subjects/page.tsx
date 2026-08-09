import type { Metadata } from "next";
import SubjectsClient from "./SubjectsClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, getSubjectCoursesSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "বিষয়ভিত্তিক ১-অন-১ শিক্ষক ডিরেক্টরি — গণিত, ইংরেজি, সায়েন্স ও আইসিটি",
  description: "গণিত, ইংরেজি, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান বা আইসিটি — প্রতিটি বিষয়ে বুয়েট, ঢাবি ও মেডিকেলের অভিজ্ঞ শিক্ষক থেকে ১-অন-১ লাইভ ক্লাসে অংশ নিন।",
  alternates: {
    canonical: `${SITE_URL}/subjects`,
  },
  openGraph: {
    title: "বিষয়ভিত্তিক ১-অন-১ শিক্ষক ডিরেক্টরি | OTOTeachers",
    description: "বুয়েট, ঢাবি ও মেডিকেলের অভিজ্ঞ শিক্ষকদের সাথে আপনার পছন্দের বিষয়ে ১-অন-১ লাইভ ক্লাসে শিখুন।",
    url: `${SITE_URL}/subjects`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
        width: 1200,
        height: 630,
        alt: "Subject Wise 1-on-1 Tutors - OTOTeachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "বিষয়ভিত্তিক ১-অন-১ শিক্ষক ডিরেক্টরি | OTOTeachers",
    description: "গণিত, ইংরেজি, সায়েন্স ও আইসিটিতে ১-অন-১ ডেডিকেটেড অনলাইন শিক্ষক।",
    images: [`${SITE_URL}/Assets/Group%202147229264.png`],
  },
};

export default function SubjectTeachersPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "বিষয়ভিত্তিক শিক্ষক", url: "/subjects" },
  ]);
  const coursesSchema = getSubjectCoursesSchema();

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={coursesSchema} />
      <SubjectsClient />
    </>
  );
}

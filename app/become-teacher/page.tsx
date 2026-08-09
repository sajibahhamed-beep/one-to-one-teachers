import type { Metadata } from "next";
import BecomeTeacherClient from "./BecomeTeacherClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "শিক্ষক হিসেবে যুক্ত হন — ১-অন-১ অনলাইন মেন্টর আবেদন",
  description: "আপনি কি বুয়েট, ঢাবি, মেডিকেল বা নামকরা বিশ্ববিদ্যালয়ের শিক্ষার্থী বা শিক্ষক? OTOTeachers প্ল্যাটফর্মে যুক্ত হয়ে সুবিধাজনক সময়ে ১-অন-১ টিউশন নিন ও সম্মানজনক আয় করুন।",
  alternates: {
    canonical: `${SITE_URL}/become-teacher`,
  },
  openGraph: {
    title: "শিক্ষক হিসেবে যুক্ত হন — ১-অন-১ অনলাইন মেন্টর আবেদন | OTOTeachers",
    description: "আপনার বিষয়ভিত্তিক মেধা দিয়ে ১-অন-১ অনলাইন ক্লাসের মাধ্যমে শিক্ষার্থীদের সহায়তা করুন এবং ফ্লেক্সিবল আয় করুন।",
    url: `${SITE_URL}/become-teacher`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
        width: 1200,
        height: 630,
        alt: "Become a Tutor - OTOTeachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "শিক্ষক হিসেবে যুক্ত হন | OTOTeachers",
    description: "১-অন-১ শিক্ষক হিসেবে যুক্ত হয়ে সুবিধাজনক সময়ে ক্লাস নিন।",
    images: [`${SITE_URL}/Assets/Group%202147229264.png`],
  },
};

export default function BecomeTeacherPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "শিক্ষক হিসেবে যুক্ত হন", url: "/become-teacher" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <BecomeTeacherClient />
    </>
  );
}

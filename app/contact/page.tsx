import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "যোগাযোগ করুন — হটলাইন ও ১-অন-১ শিক্ষক সহায়তা",
  description: "১-অন-১ অনলাইন শিক্ষক বুকিং, আবেদন বা যেকোনো সহায়তার জন্য সরাসরি কল করুন 01775551325 অথবা মেসেজ পাঠান। প্রধান অফিস: ধানমন্ডি ৩২, ঢাকা।",
  keywords: [
    "OTOTeachers যোগাযোগ",
    "অনলাইন শিক্ষক হটলাইন",
    "প্রাইভেট টিউটর ফোন নম্বর",
    "Contact OTOTeachers",
    "Tutor Helpline Bangladesh",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "যোগাযোগ করুন — হটলাইন ও ১-অন-১ শিক্ষক সহায়তা | OTOTeachers",
    description: "১-অন-১ শিক্ষক বুকিং বা যেকোনো প্রশ্নের জন্য সরাসরি কল করুন অথবা মেসেজ পাঠান।",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
        width: 1200,
        height: 630,
        alt: "Contact OTOTeachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "যোগাযোগ করুন | OTOTeachers",
    description: "হটলাইন: 01775551325 | ধানমন্ডি, ঢাকা, বাংলাদেশ।",
    images: [`${SITE_URL}/Assets/Group%202147229264.png`],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "যোগাযোগ", url: "/contact" },
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "যোগাযোগ — OTOTeachers",
    description: "OTOTeachers সাপোর্ট টিম ও ১-অন-১ শিক্ষক ম্যাচিং হটলাইন।",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      telephone: "+8801775551325",
      email: "support@ototeachers.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dhanmondi 32, Road 7/A",
        addressLocality: "Dhaka",
        postalCode: "1209",
        addressCountry: "BD",
      },
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={contactPageSchema} />
      <ContactClient />
    </>
  );
}

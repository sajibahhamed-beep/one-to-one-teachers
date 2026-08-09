/**
 * Centralized SEO Configuration and Schema.org Structured Data Generators
 * Platform: OTOTeachers (https://ototeachers.com)
 */

export const SITE_URL = "https://ototeachers.com";
export const SITE_NAME = "OTOTeachers";
export const DEFAULT_LOCALE = "bn_BD";

export const DEFAULT_SEO = {
  title: "OTOTeachers — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All",
  description:
    "বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে। প্রথম ক্লাস সম্পূর্ণ বিনামূল্যে।",
  keywords: [
    "OTOTeachers",
    "ototeachers.com",
    "online teacher Bangladesh",
    "১-অন-১ শিক্ষক",
    "১-অন-১ অনলাইন শিক্ষক",
    "private tutor Bangladesh",
    "online tutor Bangla",
    "SSC HSC math teacher",
    "buet teacher online",
    "du tutor online",
    "1 on 1 online class Bangladesh",
    "গৃহশিক্ষক অনলাইন",
    "অনলাইন প্রাইভেট টিউটর",
    "স্পোকেন ইংলিশ টিচার",
    "পদার্থবিজ্ঞান প্রাইভেট শিক্ষক",
  ],
  ogImage: `${SITE_URL}/Assets/Group%202147229264.png`,
};

/**
 * Generate Schema.org Organization structured data
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    alternateName: ["OTOTeachers.com", "One-to-One Teachers", "১-অন-১ অনলাইন শিক্ষক"],
    url: SITE_URL,
    logo: `${SITE_URL}/Assets/Group%202147229264.png`,
    description: DEFAULT_SEO.description,
    telephone: "+8801775551325",
    email: "support@ototeachers.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dhanmondi 32, Road 7/A",
      addressLocality: "Dhaka",
      postalCode: "1209",
      addressCountry: "BD",
    },
    sameAs: [
      "https://facebook.com",
      "https://instagram.com",
      "https://youtube.com",
      "https://linkedin.com",
    ],
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
    priceRange: "৳৳",
  };
}

/**
 * Generate Schema.org WebSite structured data with SearchAction
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Schema.org FAQPage structured data
 */
export function getFAQPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Generate Schema.org BreadcrumbList structured data
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate Schema.org BlogPosting / Article structured data
 */
export function getBlogPostingSchema(post: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedDate?: string;
  authorName?: string;
  authorRole?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image || DEFAULT_SEO.ogImage,
    url: post.url.startsWith("http") ? post.url : `${SITE_URL}${post.url}`,
    datePublished: post.publishedDate || "2026-08-01T00:00:00+06:00",
    dateModified: post.publishedDate || "2026-08-01T00:00:00+06:00",
    inLanguage: "bn-BD",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url.startsWith("http") ? post.url : `${SITE_URL}${post.url}`,
    },
    author: {
      "@type": "Person",
      name: post.authorName || "OTOTeachers Academic Team",
      jobTitle: post.authorRole || "Academic Mentor",
      affiliation: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
      },
    },
    keywords: post.tags?.join(", ") || "1-on-1 tutoring, Bangladesh education",
  };
}

/**
 * Generate Schema.org Course / Service structured data for subjects
 */
export function getSubjectCoursesSchema() {
  const subjects = [
    {
      name: "Higher Mathematics & Algebra 1-on-1 Mentoring (উচ্চতর গণিত ১-অন-১)",
      description: "Personalized 1-on-1 problem solving from basic algebra to calculus with BUET graduates.",
      courseCode: "MATH-101",
    },
    {
      name: "English Grammar & Spoken English 1-on-1 (ইংরেজি ও স্পোকেন ইংলিশ)",
      description: "Build fluent English speaking and writing confidence with DU English Department mentors.",
      courseCode: "ENG-101",
    },
    {
      name: "Science All-in-One: Physics, Chemistry & Biology (সায়েন্স ১-অন-১ টিচিং)",
      description: "Master complex physics, chemistry, and biology with BUET and Medical College mentors.",
      courseCode: "SCI-101",
    },
    {
      name: "HSC ICT & Computer Programming 1-on-1 (আইসিটি ও প্রোগ্রামিং)",
      description: "HSC ICT syllabus, C programming, and HTML guidance with CSE graduates.",
      courseCode: "ICT-101",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: subjects.map((subj, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: subj.name,
        description: subj.description,
        provider: {
          "@type": "EducationalOrganization",
          name: SITE_NAME,
          sameAs: SITE_URL,
        },
        courseCode: subj.courseCode,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT1H per session",
          instructor: {
            "@type": "Person",
            name: "Verified University Graduate (BUET/DU/Medical)",
          },
        },
      },
    })),
  };
}

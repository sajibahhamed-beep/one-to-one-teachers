export interface BlogPost {
  id: string;
  slug: string;
  category: "mentorship" | "board-prep" | "math-science" | "english" | "parenting";
  featured?: boolean;
  image: string;
  titleBn: string;
  titleEn: string;
  excerptBn: string;
  excerptEn: string;
  author: {
    nameBn: string;
    nameEn: string;
    roleBn: string;
    roleEn: string;
    institutionBn: string;
    institutionEn: string;
    avatar: string;
  };
  readTimeBn: string;
  readTimeEn: string;
  publishedDateBn: string;
  publishedDateEn: string;
  tagsBn: string[];
  tagsEn: string[];
  
  // Detailed structured content
  introBn: string;
  introEn: string;
  sectionsBn: {
    heading?: string;
    subheading?: string;
    paragraphs?: string[];
    image?: string;
    imageCaptionBn?: string;
    imageCaptionEn?: string;
    points?: { title: string; desc: string }[];
    callout?: string;
  }[];
  sectionsEn: {
    heading?: string;
    subheading?: string;
    paragraphs?: string[];
    image?: string;
    imageCaptionBn?: string;
    imageCaptionEn?: string;
    points?: { title: string; desc: string }[];
    callout?: string;
  }[];
  keyTakeawaysBn: string[];
  keyTakeawaysEn: string[];
}

export const BLOG_CATEGORIES = [
  { id: "all", labelBn: "সব নিবন্ধ", labelEn: "All Posts" },
  { id: "mentorship", labelBn: "১-অন-১ মেন্টরশিপ", labelEn: "1-on-1 Mentorship" },
  { id: "board-prep", labelBn: "বোর্ড পরীক্ষা (SSC/HSC)", labelEn: "Board Prep" },
  { id: "math-science", labelBn: "গণিত ও সায়েন্স", labelEn: "Math & Science" },
  { id: "english", labelBn: "ইংরেজি ও স্পোকেন", labelEn: "English Skills" },
  { id: "parenting", labelBn: "অভিভাবক গাইড", labelEn: "Parenting" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1-on-1-mentorship-vs-coaching",
    slug: "1-on-1-mentorship-vs-coaching",
    category: "mentorship",
    featured: true,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    titleBn: "কমেডি ও বাণিজ্যিক কোচিং নয়: কেন ১-অন-১ ডেডিকেটেড মেন্টরশিপ প্রতিটি শিক্ষার্থীর মূল চাবিকাঠি?",
    titleEn: "Why 1-on-1 Dedicated Mentorship is More Effective Than Large Commercial Coaching",
    excerptBn: "এক ১০০ জন শিক্ষার্থীর ব্যাচে শিক্ষক কখনো প্রতিটি বাচ্চার ইন্ডিভিজুয়াল দুর্বলতা ধরতে পারেন না। ১-অন-১ পার্সোনালাইজড সাপোর্ট যেভাবে শিক্ষার্থীদের গ্রেড দ্বিগুণ বাড়াতে সাহায্য করে।",
    excerptEn: "In a classroom of 100 students, teachers cannot address individual learning gaps. Discover how dedicated 1-on-1 mentorship helps students double their academic performance.",
    author: {
      nameBn: "আরিফুর রহমান",
      nameEn: "Arifur Rahman",
      roleBn: "হেড অব মেন্টরশিপ",
      roleEn: "Head of Mentorship",
      institutionBn: "বুয়েট (সিএসই)",
      institutionEn: "BUET (CSE)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    readTimeBn: "৫ মিনিট পড়া",
    readTimeEn: "5 min read",
    publishedDateBn: "০৪ আগস্ট, ২০২৬",
    publishedDateEn: "Aug 04, 2026",
    tagsBn: ["১-অন-১ মেন্টরিং", "শিক্ষা পদ্ধতি", "ব্যক্তিগত শিক্ষক", "বুয়েট মেন্টর"],
    tagsEn: ["1-on-1 Mentoring", "Learning Methods", "Private Tutor", "BUET Mentor"],
    introBn: "বাংলাদেশের প্রচলিত শিক্ষাব্যবস্থায় অধিকাংশ শিক্ষার্থী বড় বড় কোচিং সেন্টারে ভর্তি হয়। কিন্তু ৫০ থেকে ১০০ জনের এক একটি ক্লাসে কোনো শিক্ষার্থীর নিজস্ব দুর্বলতা দূর হয় না। প্রতিটি শিশুর শেখার গতি, বোঝার ক্ষমতা এবং চিন্তাধারা সম্পূর্ণ আলাদা। এই পার্থক্যকে সম্মান জানিয়েই ১-অন-১ ডেডিকেটেড শিক্ষাদান তৈরি হয়েছে।",
    introEn: "In Bangladesh's conventional academic landscape, most students enroll in overcrowded coaching centers. However, in a class of 50 to 100 students, individual learning gaps remain untouched. Every child learns at a different pace, and 1-on-1 dedicated tutoring is specifically designed to respect and nurture that individuality.",
    sectionsBn: [
      {
        heading: "প্রচলিত বড় ব্যাচের সীমাবদ্ধতা ও মনস্তাত্ত্বিক চাপ",
        subheading: "বড় ক্লাসে কেন শিক্ষার্থীরা প্রশ্ন করতে ভয় পায়?",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
        imageCaptionBn: "বড় বাণিজ্যিক কোচিং সেন্টারে শিক্ষার্থীদের ব্যক্তিকেন্দ্রিক দুর্বলতা মনোযোগ পায় না",
        imageCaptionEn: "Crowded classrooms fail to address individual student learning gaps",
        paragraphs: [
          "একটি সাধারণ কোচিং সেন্টারে শিক্ষক নির্দিষ্ট সময়ের মধ্যে সিলেবাস শেষ করতেই বেশি গুরুত্ব দেন। ফলে কোনো শিক্ষার্থী বীজগণিত বা গণিতের কোনো লাইনে না বুঝলে শিক্ষককে থামানোর সাহস পায় না। সহপাঠীদের সামনে ভুল উত্তর দেওয়ার ভয়ে বা লজ্জায় শিক্ষার্থীরা নীরব থাকে।",
          "পরবর্তীতে এই ছোট ছোট দুর্বলতাই বড় পরীক্ষার আগে জিপিএ কমে যাওয়ার মূল কারণ হয়ে দাঁড়ায়।"
        ]
      },
      {
        heading: "১-অন-১ ডেডিকেটেড মেন্টরশিপের প্রধান ৫টি সুবিধা",
        subheading: "সরাসরি অভিজ্ঞ টিচারের ১০০% ফোকাস ও গাইডলাইন",
        points: [
          {
            title: "১. দুর্বলতা দ্রুত চিহ্নিতকরণ",
            desc: "শিক্ষার্থী ঠিক কোথায় আটকচ্ছে—বীজগণিতের সূত্রে, নাকি রসায়নের সমীকরণে—তা প্রথম ক্লাসেই ১-অন-১ মেন্টর নির্ভুলভাবে ধরে ফেলেন।"
          },
          {
            title: "২. দ্বিধাহীন প্রশ্ন করার স্বাধীনতা",
            desc: "মেন্টরের সাথে সরাসরি অনলাইনে ক্লাসে কোনো সহপাঠীর চাপ থাকে না। যেকোনো ছোট বা সহজ প্রশ্নও শিক্ষার্থী নির্দ্বিধায় যতবার ইচ্ছা জিজ্ঞেস করতে পারে।"
          },
          {
            title: "৩. শিক্ষার্থীর নিজস্ব গতির সাথে ক্লাস পরিচালনা",
            desc: "যে অধ্যায়ে শিক্ষার্থী কাঁচা, সেখানে বেশি সময় দেওয়া হয়। যা দ্রুত বোঝে, তা সহজে রিভিশন দিয়ে পরবর্তী টপিকে যাওয়া হয়।"
          },
          {
            title: "৪. বুয়েট, ঢাবি ও মেডিকেলের মেন্টরদের টেকনিক",
            desc: "বাংলাদেশের শীর্ষ প্রতিষ্ঠানের ছাত্ররা কেবল বই শেখান না, পরীক্ষার হলে কীভাবে দ্রুত উত্তর করতে হয় সেই বাস্তব অভিজ্ঞতা ও শর্টকাট টেকনিক শেয়ার করেন।"
          },
          {
            title: "৫. নিয়মিত ট্র্যাকিং ও অভিভাবক আপডেট",
            desc: "প্রতিটি ক্লাসের শেষে ও সাপ্তাহিক রিপোর্টে অভিভাবক জানতে পারেন সন্তান কোন কোন অধ্যায়ে অগ্রগতি করছে।"
          }
        ]
      },
      {
        heading: "অভিভাবকদের জন্য পরামর্শ: সঠিক মেন্টর নির্বাচন করবেন কীভাবে?",
        paragraphs: [
          "শুধু বিখ্যাত ব্র্যান্ডের পেছনে না ছুটে দেখুন আপনার সন্তান প্রতিদিনের ক্লাসে পড়া বুঝতে পারছে কিনা। একজন ভালো মেন্টর শিক্ষার্থীর আস্থা তৈরি করেন এবং পড়ার প্রতি ভয় দূর করেন।"
        ],
        callout: "ototeachers.com কোনো ভিডিও কোর্স বিক্রি করে না। আমরা আপনার সন্তানের সাথে বুয়েট, ঢাবি বা মেডিকেলের অভিজ্ঞ মেন্টরকে ১-অন-১ ক্লাসে যুক্ত করে দিই।"
      }
    ],
    sectionsEn: [
      {
        heading: "Limitations of Large Commercial Coaching Centers",
        subheading: "Why shy students struggle in group classrooms",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
        imageCaptionBn: "বড় বাণিজ্যিক কোচিং সেন্টারে শিক্ষার্থীদের ব্যক্তিকেন্দ্রিক দুর্বলতা মনোযোগ পায় না",
        imageCaptionEn: "Crowded classrooms fail to address individual student learning gaps",
        paragraphs: [
          "In a traditional coaching center, instructors focus heavily on completing the syllabus within strict deadlines. As a result, if a student gets confused on a mathematical step, they rarely have the opportunity to pause the lecture.",
          "Over time, these unaddressed small doubts accumulate into major academic weaknesses during final board exams."
        ]
      },
      {
        heading: "5 Major Advantages of 1-on-1 Dedicated Mentorship",
        subheading: "100% focused personal guidance from top university tutors",
        points: [
          {
            title: "1. Rapid Gap Identification",
            desc: "A 1-on-1 tutor immediately diagnoses whether the struggle lies in foundational algebra formulas or physics concept application."
          },
          {
            title: "2. Safe Space to Ask Any Question",
            desc: "Without peer pressure, students feel completely relaxed asking even basic questions repeatedly until fully clear."
          },
          {
            title: "3. Customized Pace of Learning",
            desc: "Extra time is allocated to challenging topics, while mastered concepts are reviewed quickly to save study time."
          },
          {
            title: "4. Exam Hacks from Top University Mentors",
            desc: "Tutors from BUET, DU, and Medical colleges share exact exam strategies and time-management shortcuts."
          },
          {
            title: "5. Transparent Parent Progress Reports",
            desc: "Parents receive regular feedback updates regarding class attendance, homework, and weekly mock test scores."
          }
        ]
      },
      {
        heading: "Advice for Parents: Choosing the Right Learning Path",
        paragraphs: [
          "Instead of chasing crowded coaching centers, evaluate whether your child is getting active practice and individualized guidance every day."
        ],
        callout: "ototeachers.com never sells pre-recorded videos. We connect your child directly with verified university tutors for 1-on-1 live interactive sessions."
      }
    ],
    keyTakeawaysBn: [
      "১-অন-১ শিক্ষাদানে ১০০% ব্যক্তিগত মনোযোগ নিশ্চিত হয়।",
      "ভীতি ছাড়া প্রশ্ন করার সুযোগ শিক্ষার্থীদের আত্মবিশ্বাস দ্বিগুণ করে।",
      "বুয়েট/ঢাবি মেন্টররা নিজস্ব অভিজ্ঞতার শর্টকাট টেকনিক শেখান।",
      "অভিভাবকরা প্রতি সপ্তাহের স্পষ্ট অগ্রগতির রিপোর্ট পান।"
    ],
    keyTakeawaysEn: [
      "1-on-1 tutoring guarantees 100% individual attention.",
      "Judgment-free environment builds real academic confidence.",
      "Top university tutors share proven exam strategies.",
      "Parents get weekly progress updates directly from mentors."
    ]
  },
  {
    id: "ssc-hsc-exam-preparation-strategy",
    slug: "ssc-hsc-exam-preparation-strategy",
    category: "board-prep",
    featured: false,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    titleBn: "এসএসসি ও এইচএসসি পরীক্ষায় এ+ নিশ্চিত করার ৫টি কৌশল ও মেন্টর টিপস",
    titleEn: "5 Proven Exam Strategies to Secure GPA 5 in SSC & HSC Board Exams",
    excerptBn: "পরীক্ষার শেষ ৩ মাসে কীভাবে সিলেবাস রিভিশন দেবেন এবং প্রশ্নের সঠিক উপস্থাপনা কীভাবে জিপিএ ৫ অর্জনে সাহায্য করবে—বুয়েট ও ঢাকা বিশ্ববিদ্যালয়ের মেন্টরদের পরামর্শ।",
    excerptEn: "Expert strategies from BUET and Dhaka University mentors on revising syllabus in the final 3 months and presenting answers for top board marks.",
    author: {
      nameBn: "ফারহানা করিম",
      nameEn: "Farhana Karim",
      roleBn: "এইচএসসি সায়েন্স মেন্টর",
      roleEn: "HSC Science Mentor",
      institutionBn: "ঢাকা মেডিকেল কলেজ",
      institutionEn: "Dhaka Medical College",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    readTimeBn: "৬ মিনিট পড়া",
    readTimeEn: "6 min read",
    publishedDateBn: "০২ আগস্ট, ২০২৬",
    publishedDateEn: "Aug 02, 2026",
    tagsBn: ["এসএসসি", "এইচএসসি", "বোর্ড পরীক্ষা", "জিপিএ ৫"],
    tagsEn: ["SSC", "HSC", "Board Exam", "GPA 5"],
    introBn: "এসএসসি ও এইচএসসি বোর্ড পরীক্ষা প্রতিটি শিক্ষার্থীর ভবিষ্যৎ পড়াশোনার ভিত্তি নির্ধারণ করে। তবে শুধু দিনরাত পড়াশোনা করলেই সেরা ফল অর্জন করা সম্ভব হয় না; প্রয়োজন হয় প্রশ্নের নিখুঁত উপস্থাপনা, সঠিক সময় ব্যবস্থাপনা এবং স্ট্র্যাটেজিক রিভিশন প্ল্যান।",
    introEn: "SSC and HSC Board Examinations form the cornerstone of every student's academic future. However, simply studying for long hours isn't enough to guarantee an A+; it demands strategic revision, smart time allocation, and crisp answer presentation.",
    sectionsBn: [
      {
        heading: "বোর্ড পরীক্ষার আগের শেষ ৯০ দিনের বিশেষ রোডম্যাপ",
        subheading: "যেভাবে সিলেবাস ২ বার রিভিশন দেওয়া সম্ভব",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
        imageCaptionBn: "বোর্ড পরীক্ষার আগে বিষয়ভিত্তিক লিখিত উত্তরপত্র ও টেস্ট পেপার রিভিশন",
        imageCaptionEn: "Strategic answer script revision and test paper practice for board examinees",
        paragraphs: [
          "অনেক শিক্ষার্থী পরীক্ষার মাত্র কয়েক সপ্তাহ আগে নতুন অধ্যায় শুরু করতে গিয়ে দুশ্চিন্তায় পড়ে যায়। বোর্ড পরীক্ষার্থীদের প্রথম কাজ হলো পুরো টেস্ট পেপার অ্যানালাইসিস করে গুরুত্বপূর্ণ প্রশ্নগুলো মার্ক করা।"
        ]
      },
      {
        heading: "এ+ অর্জনে মেন্টরদের শীর্ষ ৫টি কৌশল",
        subheading: "বোর্ড খাতা মূল্যায়নে পরীক্ষকের মন জয় করার নিয়ম",
        points: [
          {
            title: "১. বিগত ৫ বছরের বোর্ড প্রশ্ন পুঙ্খানুপুঙ্খ সমাধান",
            desc: "বোর্ড পরীক্ষার প্রায় ৭০% প্রশ্ন বিগত বছরের প্যাটার্ন অনুসরণ করে আসে। টেস্ট পেপার সলভ করার মাধ্যমে প্রশ্নের টাইপ আয়ত্তে আনা সম্ভব।"
          },
          {
            title: "২. বিজ্ঞান বিভাগে স্পষ্ট চিত্র ও সমীকরণের ব্যবহার",
            desc: "পদার্থবিজ্ঞান, জীববিজ্ঞান ও রসায়নে পেন্সিল দিয়ে পরিচ্ছন্ন ডায়াগ্রাম আঁকলে পরীক্ষক পূর্ণ নম্বর দিতে উৎসাহিত হন।"
          },
          {
            title: "৩. টাইমিং মেনে ১-অন-১ মক টেস্ট দেওয়া",
            desc: "পরীক্ষার হলে সময় না পাওয়ার সমস্যা এড়াতে প্রতি সপ্তাহে ঘড়ি ধরে পূর্ণাঙ্গ উত্তরপত্র লিখে ১-অন-১ মেন্টরের কাছে চেক করিয়ে নেওয়া উচিত।"
          },
          {
            title: "৪. সৃজনশীল (CQ) প্রশ্নের ক ও খ অংশ নিখুঁত করা",
            desc: "ক ও খ অংশে পূর্ণ নম্বর পাওয়া সহজ। মেন্টরের সহায়তায় সংজ্ঞা ও মূল পয়েন্টগুলো নির্ভুল মুখস্থ ও প্র্যাকটিস করুন।"
          },
          {
            title: "৫. রিভিশন নোটস ও সূত্র তালিকা প্রস্তুত রাখা",
            desc: "পরীক্ষার আগের রাতে পুরো বই পড়া অসম্ভব। তাই নিজস্ব হাতে লেখা ফর্মুলা শিট ও শর্ট নোটস দেখে রিভিশন শেষ করুন।"
          }
        ]
      },
      {
        heading: "পরীক্ষার হলের মানসিক চাপ নিয়ন্ত্রণের উপায়",
        paragraphs: [
          "প্রশ্নপত্র হাতে পেয়ে প্রথম ৫ মিনিট মনোযোগ দিয়ে সব প্রশ্ন রিডিং পড়ুন। সবচেয়ে সহজ ও ভালো জানা প্রশ্ন দিয়ে উত্তর লেখা শুরু করলে আত্মবিশ্বাস বহুগুণ বেড়ে যায়।"
        ],
        callout: "ototeachers.com-এর ১-অন-১ মেন্টররা শিক্ষার্থীদের জন্য তৈরি করেন ব্যক্তিগত বোর্ড রিভিশন রুটিন এবং প্রতিটি মক টেস্টের লিখিত ফিডব্যাক।"
      }
    ],
    sectionsEn: [
      {
        heading: "The Final 90-Day Roadmap for Board Examinees",
        subheading: "How to complete two full rounds of revision",
        paragraphs: [
          "Many candidates panic by picking up brand new chapters right before exams. The golden rule is to analyze board test papers and identify high-weightage topics first."
        ]
      },
      {
        heading: "5 Core Exam Strategies Recommended by Top Tutors",
        subheading: "How to structure your answer script for maximum marks",
        points: [
          {
            title: "1. Solving 5 Years of Past Board Papers",
            desc: "Nearly 70% of board questions follow established patterns. Solving test papers makes questions familiar and easy."
          },
          {
            title: "2. Clean Diagrams & Chemical Equations",
            desc: "In Physics, Chemistry, and Biology, neat pencil diagrams and balanced equations guarantee full credit from examiners."
          },
          {
            title: "3. Timed 1-on-1 Mock Test Reviews",
            desc: "Simulate real exam timing at home and get your answer script graded 1-on-1 by a university mentor to spot hidden mistakes."
          },
          {
            title: "4. Precision in CQ Parts (A & B)",
            desc: "Parts A & B carry quick marks. Memorize core definitions accurately to ensure full marks early in every question."
          },
          {
            title: "5. Personalized Quick Revision Formula Sheets",
            desc: "Prepare handwritten formula sheets so you can revise key concepts effortlessly the night before the exam."
          }
        ]
      },
      {
        heading: "Managing Exam Hall Anxiety",
        paragraphs: [
          "Spend the first 5 minutes reading the question paper carefully. Start with your strongest answers to build momentum and calm your nerves."
        ],
        callout: "ototeachers.com provides dedicated 1-on-1 mock exam review sessions with personalized feedback for all SSC & HSC candidates."
      }
    ],
    keyTakeawaysBn: [
      "বিগত ৫ বছরের বোর্ড প্রশ্ন সমাধান করা জিপিএ ৫-এর মূল ভিত্তি।",
      "বিজ্ঞান বিভাগের খাতায় স্পষ্ট ডায়াগ্রাম অতিরিক্ত নম্বর এনে দেয়।",
      "ঘড়ি ধরে ১-অন-১ মক টেস্ট দিলে পরীক্ষার হলের ভয় কাটে।",
      "পড়ার পাশাপাশি নিজস্ব শর্ট সামারি নোট তৈরি রাখুন।"
    ],
    keyTakeawaysEn: [
      "Solving 5 years of board papers builds exam confidence.",
      "Neat diagrams and equations attract top marks.",
      "Timed 1-on-1 mock tests prevent exam hall time crunches.",
      "Handwritten formula sheets make final night revision fast."
    ]
  },
  {
    id: "overcoming-math-phobia-tips",
    slug: "overcoming-math-phobia-tips",
    category: "math-science",
    featured: false,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    titleBn: "গণিতের ভয় দূর করার বাস্তব উপায়: বেসিক দুর্বলতা যেভাবে কাটিয়ে উঠবেন",
    titleEn: "Overcoming Math Phobia: How 1-on-1 Tutoring Solves Core Concept Gaps",
    excerptBn: "অনেক শিক্ষার্থী গণিতকে কঠিন মনে করে এর পেছনের লজিক না বোঝার কারণে। বীজগণিত ও জ্যামিতির মৌলিক ধারণা কীভাবে ১-অন-১ শিক্ষকের সাহায্যে সহজ হয়ে যায়।",
    excerptEn: "Math fear often stems from fundamental gaps created in early grades. Learn how step-by-step 1-on-1 guidance rebuilds mathematical confidence.",
    author: {
      nameBn: "সাব্বির হোসেন",
      nameEn: "Sabbir Hossain",
      roleBn: "সিনিয়র গণিত টিচার",
      roleEn: "Senior Math Teacher",
      institutionBn: "বুয়েট (ইইই)",
      institutionEn: "BUET (EEE)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    readTimeBn: "৪ মিনিট পড়া",
    readTimeEn: "4 min read",
    publishedDateBn: "২৮ জুলাই, ২০২৬",
    publishedDateEn: "Jul 28, 2026",
    tagsBn: ["গণিত", "বেসিক শিক্ষা", "বুয়েট মেন্টর", "বীজগণিত"],
    tagsEn: ["Math", "Basic Concepts", "BUET Mentor", "Algebra"],
    introBn: "গণিত কোনো মুখস্থ করার বিষয় নয়; এটি একটি সুন্দর ও যুক্তিনির্ভর ভাষা। অধিকাংশ শিক্ষার্থী গণিতকে ভয় পায় কারণ তাদের পূর্ববর্তী শ্রেণির বেসিক ধারণাগুলোতে গ্যাপ থেকে যায়। ১-অন-১ শিক্ষাদানের মাধ্যমে এই ভীতি খুব সহজেই দূর করা সম্ভব।",
    introEn: "Mathematics is not about memorization; it is a logical and rewarding language. Students fear math primarily because gaps from earlier school years remain unaddressed. 1-on-1 tutoring bridges these gaps systematically.",
    sectionsBn: [
      {
        heading: "গণিতে দুর্বলতার মূল কারণগুলো কী কী?",
        subheading: "বেসিক গ্যাপ কীভাবে শিক্ষার্থীকে পিছিয়ে দেয়?",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
        imageCaptionBn: "বুয়েট মেন্টরের কাছে হাতে-কলমে অংক ও বীজগণিতের বেসিক লজিক সমাধান",
        imageCaptionEn: "BUET tutor explaining fundamental algebraic logic step-by-step",
        paragraphs: [
          "যদি ষষ্ঠ বা সপ্তম শ্রেণিতে ভগ্নাংশের যোগ-বিয়োগ বা সমীকরণের স্থানান্তর না বোঝা যায়, তবে নবম শ্রেণিতে এসে উচ্চতর গণিত এবং পদার্থবিজ্ঞানের অঙ্ক করা অসম্ভব মনে হয়। ক্লাসে শিক্ষক সামনের দিকে এগিয়ে যান, আর শিক্ষার্থী মানসিকভাবে আরও পিছিয়ে পড়ে।"
        ]
      },
      {
        heading: "গণিতের ভয় কাটাতে বুয়েট মেন্টরের ৪টি সহজ ধাপ",
        subheading: "লজিক বুঝে অংক সলভ করার আধুনিক উপায়",
        points: [
          {
            title: "১. রুট কজ ডায়াগনোসিস (গোড়ায় ফিরে যাওয়া)",
            desc: "১-অন-১ মেন্টর শিক্ষার্থীকে সরাসরি থামিয়ে দেখেন সে ঠিক কোন লাইনে বা সূত্রে আটকে যাচ্ছে, এবং পূর্বের শ্রেণির বেসিক পুনরায় বুঝিয়ে দেন।"
          },
          {
            title: "২. মুখস্থ না করে সূত্রের পেছনের লজিক বোঝা",
            desc: "সূত্র কীভাবে তৈরি হলো তা বাস্তব উদাহরণের মাধ্যমে দেখালে অংক বোঝা আনন্দদায়ক হয়ে ওঠে।"
          },
          {
            title: "৩. ছোট ছোট স্টেপে দৈনিক প্র্যাকটিস প্রবলেম সলভ",
            desc: "একসাথে ২০টি কঠিন অংক না করে প্রতিদিন ৫টি করে সহজ থেকে মাঝারি লেভেলের অংক সলভ করে আত্মবিশ্বাস বাড়ানো।"
          },
          {
            title: "৪. তাৎক্ষণিক ভুল সংশোধন ও ১-অন-১ ফিডব্যাক",
            desc: "অংক ভুল হলে মেন্টর সাথে সাথে ধাপে ধাপে কারেকশন করে দেন, ফলে ভুল নিয়ম শিক্ষার্থীর মাথায় স্থায়ী হয় না।"
          }
        ]
      },
      {
        heading: "কীভাবে গণিতে আনন্দ খুঁজে পাবেন?",
        paragraphs: [
          "প্রতিদিন অন্তত ৩০ মিনিট হাতে-কলমে অংক প্র্যাকটিস করুন। উত্তর মিললে নিজেকে পুরস্কৃত করুন। মেন্টরের সহযোগিতা নিয়ে গণিতকে ভয় না পেয়ে জয়ের চ্যালেঞ্জ হিসেবে নিন।"
        ],
        callout: "ototeachers.com-এর বুয়েট ও ঢাবি মেন্টররা ১-অন-১ ক্লাসে গণিতের সব কঠিন বিষয়কে সহজ পানির মতো বুঝিয়ে দিতে পারদর্শী।"
      }
    ],
    sectionsEn: [
      {
        heading: "The Root Causes of Math Anxiety",
        subheading: "How early foundation gaps snowball in higher grades",
        paragraphs: [
          "If a student struggled with basic fraction rules or linear equations in Class 7, Higher Math in Class 9 will naturally feel daunting. In standard classrooms, the teacher moves ahead regardless of individual understanding."
        ]
      },
      {
        heading: "4 Steps to Conquer Math Phobia with a BUET Mentor",
        subheading: "Shifting from memorization to logical problem-solving",
        points: [
          {
            title: "1. Root Cause Diagnosis",
            desc: "A 1-on-1 tutor pauses immediately, identifies the exact line where confusion occurs, and revisits fundamental concepts."
          },
          {
            title: "2. Understanding the Logic Behind Formulas",
            desc: "Instead of memorizing formulas, tutors demonstrate how equations are derived using real-world analogies."
          },
          {
            title: "3. Incremental Practice Problems",
            desc: "Rather than attempting 20 hard questions at once, students solve 5 structured problems daily to build momentum."
          },
          {
            title: "4. Real-time Step-by-Step Corrections",
            desc: "Immediate feedback prevents students from internalizing wrong mathematical methods."
          }
        ]
      },
      {
        heading: "Finding Joy in Mathematics",
        paragraphs: [
          "Dedicate 30 minutes every day to working out problems on paper. With patient 1-on-1 mentoring, math transforms from a scary subject into an engaging puzzle."
        ],
        callout: "ototeachers.com's BUET and DU engineering mentors specialize in turning math fear into academic excellence through patient 1-on-1 guidance."
      }
    ],
    keyTakeawaysBn: [
      "গণিত ভয়ের মূল কারণ বেসিক ধারণায় পূর্বের গ্যাপ।",
      "১-অন-১ মেন্টর তাৎক্ষণিকভাবে ভুলের জায়গা চিনতে পারেন।",
      "সূত্রের পেছনের লজিক বুঝলে অংক মুখস্থ করতে হয় না।",
      "দৈনিক অল্প সময়ে নিবেদিত প্র্যাকটিস আত্মবিশ্বাস আনে।"
    ],
    keyTakeawaysEn: [
      "Math anxiety originates from unaddressed early concept gaps.",
      "1-on-1 tutoring provides immediate error correction.",
      "Understanding formula logic eliminates the need for memorization.",
      "Consistent daily practice builds long-term problem-solving skills."
    ]
  },
  {
    id: "spoken-english-fluency-for-students",
    slug: "spoken-english-fluency-for-students",
    category: "english",
    featured: false,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    titleBn: "ইংরেজিতে সাবলীলভাবে কথা বলার সহজ উপায়: মুখস্থ নয়, ১-অন-১ প্র্যাকটিস",
    titleEn: "How to Build Spoken English Fluency: Why 1-on-1 Live Practice Wins",
    excerptBn: "গ্রামার পড়েও কেন শিক্ষার্থীরা ইংরেজিতে কথা বলতে পারে না? ১-অন-১ অনলাইন স্পোকেন সেশনের মাধ্যমে জড়তা দূর করার আধুনিক গাইড।",
    excerptEn: "Why studying grammar rules alone fails to build spoken confidence, and how 1-on-1 conversational practice breaks hesitations.",
    author: {
      nameBn: "তানজিনা ইসলাম",
      nameEn: "Tanjina Islam",
      roleBn: "ইংরেজি ভাষা মেন্টর",
      roleEn: "English Language Mentor",
      institutionBn: "ঢাকা বিশ্ববিদ্যালয় (ইংরেজি বিভাগ)",
      institutionEn: "Dhaka University (Dept of English)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    readTimeBn: "৫ মিনিট পড়া",
    readTimeEn: "5 min read",
    publishedDateBn: "২৫ জুলাই, ২০২৬",
    publishedDateEn: "Jul 25, 2026",
    tagsBn: ["স্পোকেন ইংলিশ", "ইংরেজি দক্ষতা", "ঢাবি মেন্টর", "গ্রামার"],
    tagsEn: ["Spoken English", "Fluency", "DU Tutor", "Grammar"],
    introBn: "আমাদের দেশের শিক্ষার্থীরা ১২ বছর ধরে বিদ্যালয়ে ইংরেজি পড়ে এবং নিয়মগুলো মুখস্থ করে। তবুও অধিকাংশ শিক্ষার্থী ইংরেজিতে কথা বলতে গেলে তোতলায় বা আটকে যায়। কারণ তারা ইংরেজিকে একটি পরীক্ষার বিষয় হিসেবে দেখে, যোগাযোগের মাধ্যম হিসেবে চর্চা করার সুযোগ পায় না।",
    introEn: "Students in Bangladesh study English for over 12 years in school, memorizing complex grammar rules. Yet most hesitate or freeze when speaking English. This happens because English is taught as an exam paper rather than practiced as a spoken tool.",
    sectionsBn: [
      {
        heading: "কেন শুধু বই পড়ে ইংরেজিতে ফ্লুয়েন্সি আসে না?",
        subheading: "কথা বলার জড়তা ও ভুল করার মানসিক ভয়",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        imageCaptionBn: "১-অন-১ অনলাইন রিয়েল সেশনে নির্দ্বিধায় স্পোকেন ইংলিশ চর্চা",
        imageCaptionEn: "Interactive 1-on-1 spoken conversational practice with DU mentor",
        paragraphs: [
          "স্পোকেন ইংলিশ হলো একটি শারীরিক ও মানসিক অভ্যাস—ঠিক যেমন সাঁতার কাটা বা বাইসাইকেল চালানো। বই পড়ে সাঁতারের নিয়ম জানা যায়, কিন্তু পানিতে না নামলে সাঁতার শেখা যায় না। ক্লাসরুমে সহপাঠীদের সামনে হাসির পাত্র হওয়ার ভয়ে শিক্ষার্থীরা ইংরেজি বলতে চায় না।"
        ]
      },
      {
        heading: "১-অন-১ স্পোকেন প্র্যাকটিসের ৪টি বড় কৌশল",
        subheading: "ঢাবি মেন্টরদের সাথে নির্দ্বিধায় কথা বলার গাইড",
        points: [
          {
            title: "১. ভুল করার ১০০% স্বাধীনতা",
            desc: "১-অন-১ সেশনে মেন্টর ছাড়া আর কেউ থাকে না। ফলে ভুল বাক্য বললেও কোনো সংকোচ তৈরি হয় না।"
          },
          {
            title: "২. রিয়েল-লাইফ কনভারসেশন ও ডায়ালগ",
            desc: "দৈনন্দিন পরিবেশ, শখ, ভ্রমণ বা প্রিয় বিষয় নিয়ে ১৫ মিনিট টানা কথা বলার অভ্যাস তৈরি করা হয়।"
          },
          {
            title: "৩. বন্ধুত্বপূর্ণ উচ্চারণ ও টোন কারেকশন",
            desc: "কথা শেষ করার পর মেন্টর সহানুভূতির সাথে সঠিক প্রনান্সিয়েশন ও শব্দ সাজিয়ে দেন।"
          },
          {
            title: "৪. ভোকাবুলারি প্রয়োগ শেখা",
            desc: "নতুন ইংরেজি শব্দ মুখস্থ না করে সাথে সাথেই বাক্যে ব্যবহার করে মনে রাখার স্থায়ী ব্যবস্থা করা।"
          }
        ]
      },
      {
        heading: "দৈনন্দিন জীবনের সহজ টিপস",
        paragraphs: [
          "ইংরেজি সিনেমা বা পডকাস্ট শুনুন এবং ছোট ছোট বাক্য আয়নার সামনে বা মেন্টরের সাথে বলুন। সপ্তাহে ৩ দিন ১-অন-১ সেশনে অংশ নিলেই ১ মাসের মধ্যে জড়তা কেটে যায়।"
        ],
        callout: "ototeachers.com-এর ঢাকা বিশ্ববিদ্যালয়ের ইংরেজি বিভাগের মেন্টররা শিক্ষার্থীদের জড়তা কাটিয়ে তুলতে অত্যন্ত ধৈর্য ও আন্তরিকতার সাথে ১-অন-১ সেশন পরিচালনা করেন।"
      }
    ],
    sectionsEn: [
      {
        heading: "Why Textbooks Alone Cannot Build Spoken Fluency",
        subheading: "Overcoming peer hesitation and social fear",
        paragraphs: [
          "Spoken English is a practical skill—much like swimming or riding a bicycle. Reading about swimming rules won't keep you afloat; you must get into the water. Similarly, fear of peer judgment stops students from speaking in traditional classrooms."
        ]
      },
      {
        heading: "4 Pillars of 1-on-1 Spoken English Practice",
        subheading: "Building real conversational confidence with DU mentors",
        points: [
          {
            title: "1. 100% Judgment-Free Environment",
            desc: "In a private 1-on-1 session, there are no classmates to laugh at mistakes, allowing complete freedom to speak."
          },
          {
            title: "2. Real-World Contextual Dialogues",
            desc: "Engage in 15-minute natural conversations about daily topics, hobbies, and personal goals."
          },
          {
            title: "3. Gentle Pronunciation & Sentence Tuning",
            desc: "Mentors politely correct sentence structures and pronunciation after the student finishes speaking."
          },
          {
            title: "4. Active Vocabulary Application",
            desc: "Instead of memorizing vocabulary lists, new words are immediately applied in live conversation."
          }
        ]
      },
      {
        heading: "Simple Daily Practices for Students",
        paragraphs: [
          "Listen to English podcasts and repeat key phrases. Just 3 sessions a week with a dedicated 1-on-1 mentor eliminates speech hesitation within 30 days."
        ],
        callout: "ototeachers.com's English Language tutors from Dhaka University create a friendly, encouraging environment where speaking English becomes natural."
      }
    ],
    keyTakeawaysBn: [
      "স্পোকেন ইংলিশের জন্য রিয়েল কনভারসেশন প্র্যাকটিস অপরিহার্য।",
      "১-অন-১ সেশন কোনো সহপাঠী ছাড়া নির্দ্বিধায় কথা বলার সুযোগ দেয়।",
      "ভোকাবুলারি মুখস্থ না করে সরাসরি বাক্যে প্রয়োগ করুন।",
      "সপ্তাহে ৩ দিন ১-অন-১ চর্চায় ১ মাসের মধ্যে জড়তা দূর হয়।"
    ],
    keyTakeawaysEn: [
      "Real conversational practice is essential for spoken fluency.",
      "1-on-1 sessions eliminate peer performance anxiety.",
      "Apply new vocabulary in live dialogues instead of memorizing lists.",
      "3 sessions a week with a mentor removes hesitation within 30 days."
    ]
  },
  {
    id: "parents-role-in-1-on-1-education",
    slug: "parents-role-in-1-on-1-education",
    category: "parenting",
    featured: false,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    titleBn: "সন্তানের পড়ালেখায় অভিভাবকের সঠিক ভূমিকা: চাপ নয়, সঠিক দিকনির্দেশনা",
    titleEn: "Supporting Your Child's Studies: Guidance Over Pressure for Parents",
    excerptBn: "কোচিংয়ের পেছনে দৌড়ানো থামিয়ে সন্তানের মানসিক স্বাস্থ্য ও পড়ার সঠিক পরিবেশ বজায় রাখতে অভিভাবকদের করণীয়।",
    excerptEn: "How parents can foster a healthy home learning environment and partner effectively with 1-on-1 dedicated tutors.",
    author: {
      nameBn: "ড. মাহফুজা বেগম",
      nameEn: "Dr. Mahfuza Begum",
      roleBn: "শিক্ষা ও শিশু মনোবিজ্ঞান পরামর্শদাতা",
      roleEn: "Educational Psychology Consultant",
      institutionBn: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
      institutionEn: "Jahangirnagar University",
      avatar: "https://images.unsplash.com/photo-1580894732413-80f2d59300fa?auto=format&fit=crop&w=200&q=80",
    },
    readTimeBn: "৫ মিনিট পড়া",
    readTimeEn: "5 min read",
    publishedDateBn: "২০ জুলাই, ২০২৬",
    publishedDateEn: "Jul 20, 2026",
    tagsBn: ["অভিভাবক সচেতনতা", "শিক্ষা টিপস", "সন্তানের যত্ন", "অভিভাবক গাইড"],
    tagsEn: ["Parenting", "Education Tips", "Child Care", "Parent Guide"],
    introBn: "পড়াশোনায় অতিরিক্ত মানসিক চাপ দিলে অনেক সময় কাঙ্ক্ষিত ফলাফলের বদলে উল্টো ফল পাওয়া যায়। অভিভাবক হিসেবে সন্তানের জন্য এমন পড়ার পরিবেশ তৈরি করা উচিত যেখানে সে পড়ার চাপ না বোধ করে শেখার আনন্দ খুঁজে পায়।",
    introEn: "Excessive academic pressure often creates burnout and anxiety instead of motivation. As parents, creating a supportive home environment where learning feels rewarding is vital for long-term academic success.",
    sectionsBn: [
      {
        heading: "মানসিক চাপ বনাম সঠিক অনুপ্রেরণা",
        subheading: "অন্যদের সাথে তুলনা না করার সুফল",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
        imageCaptionBn: "বাড়িতে চাপমুক্ত ও অনুপ্রেরণাদায়ক শেখার পরিবেশ গড়ে তোলার গুরুত্ব",
        imageCaptionEn: "Creating a calm and encouraging study space at home for your child",
        paragraphs: [
          "প্রতিটি শিক্ষার্থীর মেধা ও শেখার মাধ্যম ভিন্ন। আপনার সন্তানকে অন্য কারও সাথে তুলনা করলে তার আত্মবিশ্বাস কমে যায়। এর পরিবর্তে তার নিজের গত মাসের ফলাফলের সাথে চলতি মাসের উন্নতির তুলনা করুন।"
        ]
      },
      {
        heading: "অভিভাবকদের জন্য ৪টি বাস্তবসম্মত করণীয়",
        subheading: "সন্তানের পাশে সহায়ক সঙ্গী হিসেবে থাকার গাইড",
        points: [
          {
            title: "১. ছোট ছোট সাফল্য উদযাপন করা",
            desc: "অংকে বা অন্য বিষয়ে সামান্য ৫ নম্বর বাড়লেও সন্তানের চেষ্টার প্রশংসা করুন। এটি তাকে পরবর্তীতে আরও ভালো করার উৎসাহ দেয়।"
          },
          {
            title: "২. ১-অন-১ টিচারের সাথে নিয়মিত খোলামেলা যোগাযোগ",
            desc: "সপ্তাহে অন্তত একদিন মেন্টরের সাথে কথা বলে জানুন সন্তান কোথায় ভালো করছে এবং কোথায় সাহায্য দরকার।"
          },
          {
            title: "৩. রুটিনে পড়ার পাশাপাশি বিশ্রাম ও খেলার স্থান রাখা",
            desc: "টানা ২ ঘণ্টার বেশি পড়তে বাধ্য করবেন না। মাঝখানে ১৫ মিনিটের ব্রেইন ব্রেক ও খেলাধুলার সুযোগ দিন।"
          },
          {
            title: "৪. বাড়িতে কোলাহলমুক্ত পড়ার উপযুক্ত পরিবেশ তৈরি",
            desc: "পড়ার সময়ে টেলিভিশন ও মোবাইল ফোন বন্ধ রেখে মনোযোগ ধরে রাখার পরিবেশ বজায় রাখুন।"
          }
        ]
      },
      {
        heading: "ototeachers.com-এর অভিভাবক ট্র্যাকিং সুবিধা",
        paragraphs: [
          "আমাদের প্ল্যাটফর্মে প্রতি সপ্তাহে ক্লাসের উপস্থিতি, বাড়ির কাজ ও মক টেস্টের ফলাফল অভিভাবকদের হোয়াটসঅ্যাপে পৌঁছে দেওয়া হয়।"
        ],
        callout: "ototeachers.com বিশ্বাস করে অভিভাবক ও ১-অন-১ মেন্টরের যৌথ সহযোগিতাই একটি শিশুর উজ্জ্বল ভবিষ্যতের সেরা চাবিকাঠি।"
      }
    ],
    sectionsEn: [
      {
        heading: "Academic Pressure vs. Positive Encouragement",
        subheading: "Why comparing your child to others harms progress",
        paragraphs: [
          "Every student possesses unique talents and learning styles. Comparing your child to peers lowers self-worth. Instead, measure your child's progress against their own previous benchmarks."
        ]
      },
      {
        heading: "4 Actionable Steps for Supportive Parents",
        subheading: "Becoming a supportive educational partner at home",
        points: [
          {
            title: "1. Celebrate Incremental Successes",
            desc: "Acknowledge small grade improvements to boost confidence and inspire continuous effort."
          },
          {
            title: "2. Regular Communication with the 1-on-1 Tutor",
            desc: "Connect with the mentor weekly to understand study habits and specific areas needing care."
          },
          {
            title: "3. Balanced Routine with Proper Rest",
            desc: "Avoid forcing non-stop study sessions. Incorporate 15-minute brain breaks and physical activity."
          },
          {
            title: "4. Distraction-Free Home Environment",
            desc: "Keep televisions and phones quiet during study hours to foster deep concentration."
          }
        ]
      },
      {
        heading: "ototeachers.com Parent Progress Tracking",
        paragraphs: [
          "We send weekly attendance, homework completion, and test score reports directly to parents via WhatsApp."
        ],
        callout: "ototeachers.com believes that strong partnership between parents and 1-on-1 mentors forms the foundation of every student's success."
      }
    ],
    keyTakeawaysBn: [
      "অন্যের সাথে তুলনা না করে সন্তানের নিজস্ব অগ্রগতিকে প্রশংসা করুন।",
      "পড়ার পাশাপাশি সঠিক বিশ্রাম ও ব্যায়াম মনোযোগ বাড়ায়।",
      "১-অন-১ শিক্ষকের সাথে প্রতি সপ্তাহে ফিডব্যাক বিনিময় করুন।",
      "কোলাহলমুক্ত হোম লার্নিং পরিবেশ পড়া আয়ত্ত করতে সাহায্য করে।"
    ],
    keyTakeawaysEn: [
      "Praise individual progress rather than comparing with peers.",
      "Proper rest and study breaks improve long-term focus.",
      "Exchange weekly feedback with your child's 1-on-1 tutor.",
      "A quiet home learning space leads to faster concept mastery."
    ]
  }
];

/**
 * Get all blog posts combining static items and database items (if on server)
 */
export function getAllBlogs(): BlogPost[] {
  try {
    if (typeof window === "undefined") {
      // Server-side: require getDB safely
      const { getDB } = require("@/lib/db");
      const db = getDB();
      if (db && Array.isArray(db.blogs) && db.blogs.length > 0) {
        const dbMapped: BlogPost[] = db.blogs.map((b: any) => ({
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
            nameBn: "OTOTeachers টিম",
            nameEn: "OTOTeachers Team",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            roleBn: "একাডেমিক পরামর্শক",
            roleEn: "Academic Advisor",
            institutionBn: "বুয়েট ও ঢাবি",
            institutionEn: "BUET & DU",
          },
          tagsBn: ["১-অন-১ শিক্ষক", "পড়াশোনা", "পরামর্শ"],
          tagsEn: ["1-on-1 Tutor", "Study", "Preparation"],
          introBn: b.excerptBn || "১-অন-১ ব্যক্তিগত শিক্ষক এর মাধ্যমে আপনার সন্তানের পড়ালেখার অগ্রগতি নিশ্চিত করুন।",
          introEn: b.excerptEn || "Ensure your child's learning progress with 1-on-1 personalized tutoring.",
          sectionsBn: [
            {
              heading: "১-অন-১ শিক্ষাদানের বিশেষ সুবিধা",
              subheading: "কেন একজন ডেডিকেটেড শিক্ষক প্রয়োজন?",
              paragraphs: [
                b.excerptBn || "১-অন-১ লাইভ ক্লাসে প্রতিটি শিক্ষার্থী তাদের নিজস্ব গতিতে শিখতে পারে এবং সকল জটিল প্রশ্নের সমাধান তাৎক্ষণিক পেয়ে থাকে।",
                "আমাদের বুয়েট, ঢাবি ও মেডিকেলের শিক্ষকেরা প্রতিটি বিষয় ধরে ধরে ১-অন-১ সহজ ভাষায় বুঝিয়ে দেন。"
              ],
              callout: "অর্থ যেন কখনো কোনো শিক্ষার্থীর শিক্ষার পথে বাধা না হয়।"
            }
          ],
          sectionsEn: [
            {
              heading: "Benefits of 1-on-1 Tutoring",
              subheading: "Why a dedicated tutor matters?",
              paragraphs: [
                b.excerptEn || "In 1-on-1 live sessions, students learn at their own pace and get instant solutions to complex doubts.",
                "Tutors from BUET, DU & DMC break down difficult concepts step by step."
              ],
              callout: "Money should never be a restriction for education."
            }
          ],
          keyTakeawaysBn: [
            "ব্যক্তিগত ১-অন-১ মনোযোগ",
            "প্রথম ক্লাস সম্পূর্ণ ফ্রি",
            "অনুকূল সময়সূচী বেছে নেওয়ার সুযোগ"
          ],
          keyTakeawaysEn: [
            "Personalized 1-on-1 attention",
            "First session completely free",
            "Flexible schedule selection"
          ]
        }));
        
        const existingIds = new Set(dbMapped.map((p) => p.id));
        const staticFiltered = BLOG_POSTS.filter((p) => !existingIds.has(p.id));
        return [...dbMapped, ...staticFiltered];
      }
    }
  } catch (e) {
    // Fallback to static
  }
  return BLOG_POSTS;
}

/**
 * Find a blog post by id or slug
 */
export function getBlogBySlug(slug: string): BlogPost | undefined {
  const all = getAllBlogs();
  return all.find((p) => p.slug === slug || p.id === slug);
}


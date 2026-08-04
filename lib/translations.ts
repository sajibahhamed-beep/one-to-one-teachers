export type Language = "bn" | "en";

export const translations = {
  bn: {
    // Topbar & Navigation
    topbarPhone: "০৯৬১০৮৮৩৩৮৮ / ৭১৩২৪৩৪২০",
    topbarSearchPlaceholder: "বিষয়, শ্রেণি বা শিক্ষক খুঁজুন...",
    topbarFreeTrial: "ফ্রি ট্রায়াল ক্লাস",
    topbarApplyAbroad: "টিচার ম্যাচিং",

    // Navbar Exact Requested Items
    navHome: "হোম",
    navHowWeTeach: "আমরা কীভাবে পড়াই",
    navAboutUs: "আমাদের সম্পর্কে (বিষয়ভিত্তিক টিচার্স)",
    navPricingPlan: "নমনীয় ফি ও প্ল্যান",
    navContactUs: "যোগাযোগ করুন",

    navSubjects: "বিষয়ভিত্তিক টিচার্স",
    navPricing: "নমনীয় ফি ও প্ল্যান",
    navTestimonials: "টেস্টিমোনিয়াল",
    navContact: "যোগাযোগ করুন",
    btnStartLearning: "আমার শিক্ষক খুঁজুন",
    btnBecomeMentor: "টিচার হিসেবে যুক্ত হন",

    // Page Sections
    navHow: "১-অন-১ পড়াশোনা কীভাবে কাজ করে",
    navBatches: "লাইভ টিচার স্লট",
    navMentors: "আমাদের শিক্ষকবৃন্দ",
    navImpact: "আমাদের প্রভাব",

    // Hero Section
    heroBadge: "ototeacher — One-to-One Teachers for All",
    heroTitlePart1: "প্রতিটি শিক্ষার্থীর জন্য একজন",
    heroTitleHighlight: "ব্যক্তিগত ১-অন-১ শিক্ষক।",
    heroLede:
      "আলো শিক্ষা কোনো কোর্স বিক্রি করে না। আমরা নিম্ন আয়ের পরিবারের শিক্ষার্থীদের সাথে বুয়েট, ঢাবি ও মেডিকেলের অভিজ্ঞ শিক্ষকদের ১-অন-১ মিলিয়ে দেই — একজন শিক্ষার্থী, একজন শিক্ষক, একটি পরিবার।",
    heroFindMentor: "আমার শিক্ষক খুঁজুন",
    heroSeeSession: "আমাদের সম্পর্কে ⊕",
    heroStatStudentsNum: "৪,২০০+",
    heroStatStudents: "শিক্ষার্থী ১-অন-১ শিক্ষক পেয়েছে",
    heroStatMentorsNum: "৮৬০+",
    heroStatMentors: "সক্রিয় ভেরিফাইড শিক্ষক",
    heroStatImprovementNum: "৯২%",
    heroStatImprovement: "পরীক্ষায় পূর্ণ গ্রেড উন্নতি করেছে",
    heroLiveMatchCaption: "— প্রতিদিন একটি লাইভ ১-অন-১ টিচার ম্যাচ —",
    heroTrialTitle: "প্রথম ১-অন-১ ট্রায়াল ক্লাস সম্পূর্ণ ফ্রি",
    heroTrialSub: "কোনো অগ্রিম ফি বা তথ্য লাগবে না",
    heroBookTrial: "ফ্রি ক্লাস বুক করুন",

    // Marquee Ticker
    marqueeMath: "উচ্চতর গণিত",
    marqueeEnglish: "ইংরেজি স্পোকেন",
    marqueePhysics: "পদার্থবিজ্ঞান",
    marqueeChemistry: "রসায়ন",
    marqueeBiology: "জীববিজ্ঞান",
    marqueeIct: "আইসিটি ও কম্পিউটার",
    marqueeBangla: "বাংলা ভাষা ও সাহিত্য",
    marqueeAccounting: "হিসাববিজ্ঞান",
    marqueeSsc: "এসএসসি বোর্ড প্রস্তুতি",
    marqueeHsc: "এইচএসসি বোর্ড প্রস্তুতি",
    marqueeText: "— ১ জন শিক্ষক, ১ জন শিক্ষার্থী",

    // Mentorship Categories
    catHeaderTitle: "বাংলাদেশের ১-অন-১ টিচার্স সার্ভিস প্ল্যাটফর্ম",
    catHeaderDesc: "আপনার সন্তানের পড়ালেখার দুর্বলতা মেটাতে সঠিক বিষয়ের শিক্ষক বেছে নিন",
    catIelts: "ইংরেজি ও স্পোকেন টিচার্স",
    catIeltsDesc: "ঢাবি ও জবি গ্র্যাজুয়েট শিক্ষকের কাছে ১-অন-১ ইংরেজি শেখা",
    catBoardPrep: "এসএসসি ও এইচএসসি বোর্ড টিচার্স",
    catBoardPrepDesc: "এসএসসি ও এইচএসসি বোর্ড পরীক্ষার বিষয়ভিত্তিক বিশেষ শিক্ষক",
    catScience: "পদার্থ, রসায়ন ও গণিত টিচার্স",
    catScienceDesc: "বুয়েট ও মেডিকেল শিক্ষার্থীদের কাছে সায়েন্সের ১-অন-১ গাইডেন্স",
    catIct: "আইসিটি ও কম্পিউটার টিচার্স",
    catIctDesc: "সাস্ট ও সিএসই গ্র্যাজুয়েট শিক্ষকদের কাছে কম্পিউটার ও কোডিং শেখা",
    catBatchSchedule: "লাইভ টিচার ম্যাচিং স্লট",
    catBatchScheduleDesc: "চলতি সপ্তাহের নতুন ১-অন-১ টিচার বুকিং সময়সূচি",
    catFreeResource: "স্পন্সরড ফ্রি টিচারশিপ",
    catFreeResourceDesc: "ডোনারদের অর্থায়নে অসচ্ছল শিক্ষার্থীর ১০০% ফ্রি শিক্ষক",

    // Mission & Problem Section
    probEyebrow: "আমাদের মিশন — One-to-One Teacher for All",
    probTitle: "মেধা সর্বত্র আছে। কিন্তু ব্যক্তিগত শিক্ষক নেই।",
    probDesc:
      "সারা বাংলাদেশে লক্ষ লক্ষ শিক্ষার্থী ভালো প্রাইভেট শিক্ষক বা ব্যক্তিগত দিকনির্দেশনার অভাবে পিছিয়ে পড়ে। বাণিজ্যিক কোচিং সেন্টার কোনো সমাধান নয়। আমরা প্রতিটি শিক্ষার্থীর জন্য ১-অন-১ ব্যক্তিগত শিক্ষক সুনিশ্চিত করি।",
    probStat1Num: "৩ জনে ১ জন",
    probStat1Desc: "নিম্ন আয়ের পরিবারের শিক্ষার্থী ব্যক্তিগত শিক্ষকের অভাবে অষ্টম শ্রেণিতে পিছিয়ে পড়ে।",
    probStat2Num: "৳০ ফি",
    probStat2Desc: "আমাদের ডোনার-ফান্ডেড স্পন্সরড ট্র্যাকে কোনো অগ্রিম ফি ছাড়াই শিক্ষক প্রদান করা হয়।",
    probStat3Num: "৬৪টি জেলা",
    probStat3Desc: "ঢাকার গলি থেকে যমুনার চর পর্যন্ত প্রতি জেলায় শিক্ষার্থীরা ১-অন-১ শিক্ষক পাচ্ছে।",

    // How Mentorship Works Section
    howEyebrow: "১-অন-১ পড়াশোনার প্রক্রিয়া",
    howTitle: "প্রথম বার্তা থেকে প্রথম সাফল্য।",
    howDesc:
      "১-অন-১ শিক্ষক তখনই সবচেয়ে কার্যকরী হয় যখন শিক্ষার্থী ও শিক্ষকের মেলবন্ধন সঠিক হয়।",
    howStep1Num: "০১ — শিক্ষার্থীর চাহিদা জানান",
    howStep1Title: "পড়ার বিষয় ও দুর্বলতা জানান",
    howStep1Desc: "শ্রেণি, বিষয়, পছন্দের সময় এবং বাংলা বা ইংরেজি মাধ্যম নির্বাচন করুন। মাত্র ৪ মিনিট লাগবে।",
    howStep2Num: "০২ — ৪৮ ঘণ্টার মধ্যে শিক্ষক বরাদ্দ",
    howStep2Title: "ব্যক্তিগত শিক্ষকের সাথে পরিচয়",
    howStep2Desc: "বুয়েট, ঢাবি বা মেডিকেলের অভিজ্ঞ যাচাইকৃত ১ জন শিক্ষক বরাদ্দ করা হয়।",
    howStep3Num: "০৩ — সাপ্তাহিক ১-অন-১ লাইভ সেশন",
    howStep3Title: "নিয়মিত ক্লাস ও ট্র্যাকিং",
    howStep3Desc: "সপ্তাহে ২-৪ দিন ভিডিও/অডিও ক্লাস। ক্লাস শেষে মূল্যয়ন নোট অভিভাবকদের পাঠানো হয়।",
    howLowDataTitle: "কম ইন্টারনেটে নিরবচ্ছিন্ন টিচিং",
    howLowDataDesc: "গ্রাম বা চরাঞ্চলে ২জি নেটেও আমাদের অডিও-অনলি টিচিং মোড সফলভাবে কাজ করে।",

    // Subject Mentors Directory
    subjEyebrow: "বিষয়ভিত্তিক ১-অন-১ টিচার্স",
    subjTitle: "অভিজ্ঞ শিক্ষকের সাথে প্রিয় বিষয় শিখুন।",
    subjDesc: "গণিত, ইংরেজি, সায়েন্স বা আইসিটি — প্রতিটি বিষয়ে আপনার একক শিক্ষক থাকবে।",
    subjFilterAll: "সব বিষয়ের শিক্ষক",
    subjFilterBoard: "এসএসসি ও এইচএসসি শিক্ষক",
    subjFilterEnglish: "ইংরেজি শিক্ষক",
    subjFilterScience: "বিজ্ঞান শিক্ষক",
    subjFilterIct: "আইসিটি শিক্ষক",
    subjEnrollBtn: "শিক্ষক রিকোয়েস্ট করুন",
    subjLearnMore: "শিক্ষক প্রোফাইল দেখুন",

    // Mentor Matching Slots
    batchEyebrow: "চলতি সপ্তাহের খালি টিচার স্লট",
    batchTitle: "নতুন ১-অন-১ টিচার স্লট বুক করুন",
    batchDesc: "নিচের তালিকা থেকে আপনার পছন্দমত সময়ে শিক্ষক বুকিং নিশ্চিত করুন।",
    batchSeatsLeft: "খালি স্লট",
    batchJoinNow: "টিচার স্লট বুক করুন",

    // Mentor Verification & Spotlight
    mentorEyebrow: "আমাদের ভেরিফাইড শিক্ষকবৃন্দ",
    mentorTitle: "বুয়েট, ঢাবি ও মেডিকেলের বিশ্বস্ত শিক্ষকবৃন্দ।",
    mentorQuote:
      "\"রংপুরের আমার শিক্ষার্থীটি প্রতি টার্মে অংকে ফেল করত। ছয় মাসের ১-অন-১ চেষ্টায় সে ক্লাসে তৃতীয় হয়েছে। টিচিং মানে শুধু পড়ানো নয়, আত্মবিশ্বাস গড়ে তোলা।\"",
    mentorName: "নুসরাত জাহান, ভলান্টিয়ার টিচার",
    mentorSub: "বুয়েট গ্র্যাজুয়েট · গণিত শিক্ষক (৩ জন শিক্ষার্থী)",

    // Success Stories / Testimonials
    successEyebrow: "টেস্টিমোনিয়াল ও সাফল্য",
    successTitle: "অভিভাবক ও শিক্ষার্থীদের মতামত",
    successDesc: "দেশের বিভিন্ন জেলা থেকে আলো শিক্ষার শিক্ষার্থীদের রিয়েল স্কোরকার্ড ও মন্তব্য।",

    // Impact Section
    impactEyebrow: "ototeacher — ২০২৪ থেকে শুরু",
    impactTitle: "১-অন-১ শিক্ষকের পরিমাপযোগ্য প্রভাব",
    impactDesc: "সারা দেশে প্রতিটি জেলায় শিক্ষকদের মূল্যায়নে প্রাপ্ত বাস্তব ফলাফল।",
    impactStat1Num: "৪,২০০+",
    impactStat1Desc: "শিক্ষার্থী ১-অন-১ শিক্ষক পেয়েছে",
    impactStat2Num: "৯২%",
    impactStat2Desc: "এক পূর্ণ গ্রেড উন্নতি করেছে",
    impactStat3Num: "৮৬০",
    impactStat3Desc: "সক্রিয় ভেরিফাইড শিক্ষক",
    impactStat4Num: "৬৪",
    impactStat4Desc: "জেলা কভার করা হয়েছে",
    impactCommunitiesTitle: "সক্রিয় শিক্ষার্থী জেলাগুলোর মধ্যে রয়েছে:",

    // District Names in Bangla
    districtDhaka: "ঢাকা",
    districtRangpur: "রংপুর",
    districtBogura: "বগুড়া",
    districtKurigram: "কুড়িগ্রাম",
    districtSylhet: "সিলেট",
    districtChittagong: "চট্টগ্রাম",
    districtBarisal: "বরিশাল",
    districtRajshahi: "রাজশাহী",
    districtKhulna: "খুলনা",
    districtMymensingh: "ময়মনসিংহ",
    districtCoxsBazar: "কক্সবাজার",
    districtCharLands: "যমুনার চর এলাকা",

    // Sliding Scale Fee & Sponsorship
    priceEyebrow: "সাধ্যমত ফি মডেল",
    priceTitle: "পারিবারিক আয়ের সাথে মানানসই শিক্ষক ফি।",
    priceDesc: "সব প্ল্যানে একই সুবিধা: ১ জন ডেডিকেটেড শিক্ষক, সাপ্তাহিক সেশন ও অগ্রগতি রিপোর্ট।",
    priceSponsored: "স্পন্সরড (সম্পূর্ণ ফ্রি)",
    pricePayWhatYouCan: "আপনার সাধ্যমত ফি (Sliding Scale)",
    priceFullFee: "ফুল ফি (অন্যের শিক্ষক স্পন্সর)",
    priceSetPrice: "ফি নির্ধারণ করুন",
    priceApplySponsor: "স্পন্সরড শিক্ষক আবেদন",

    // Footer
    footDesc: "ototeacher — One-to-One Teacher for All. কোনো কোচিং বা কোর্স বিক্রি নয় — প্রতিটি শিক্ষার্থীর জন্য ১-অন-১ ডেডিকেটেড অনলাইন টিচার।",
    footNewsletter: "নিয়মিত আপডেট ও শিক্ষা নিবন্ধ পেতে সাবস্ক্রাইব করুন",
    footRights: "সর্বস্বত্ব সংরক্ষিত © ২০২৬ ototeacher · আলো শিক্ষা।",
  },
  en: {
    // Topbar & Navigation
    topbarPhone: "09610883388 / 01713243420",
    topbarSearchPlaceholder: "Search subject, class or teacher...",
    topbarFreeTrial: "Free Trial Class",
    topbarApplyAbroad: "Teacher Matching",

    // Navbar Exact Requested Items
    navHome: "Home",
    navHowWeTeach: "How We Teach",
    navAboutUs: "About Us (Subject Teachers)",
    navPricingPlan: "Pricing Plan",
    navContactUs: "Contact Us",

    navSubjects: "Subject Teachers",
    navPricing: "Pricing Plan",
    navTestimonials: "Testimonials",
    navContact: "Contact Us",
    btnStartLearning: "Find My Teacher",
    btnBecomeMentor: "Become a Teacher",

    // Page Sections
    navHow: "How 1-on-1 Teaching Works",
    navBatches: "Live Teacher Slots",
    navMentors: "Our Teachers",
    navImpact: "Our Impact",

    // Hero Section
    heroBadge: "ototeacher — One-to-One Teacher for All",
    heroTitlePart1: "Every child deserves a",
    heroTitleHighlight: "personal 1-on-1 teacher.",
    heroLede:
      "Alo Shikkha sells no courses. We pair students from low-income families in Bangladesh with dedicated top-tier university teachers — 1 learner, 1 teacher, 1 family.",
    heroFindMentor: "Find My Teacher",
    heroSeeSession: "About Us ⊕",
    heroStatStudentsNum: "4,200+",
    heroStatStudents: "Students Got 1-on-1 Tutors",
    heroStatMentorsNum: "860+",
    heroStatMentors: "Active Verified Teachers",
    heroStatImprovementNum: "92%",
    heroStatImprovement: "Improved Full Grade",
    heroLiveMatchCaption: "— one live 1-on-1 teacher match every single day —",
    heroTrialTitle: "First 1-on-1 Trial Class 100% Free",
    heroTrialSub: "No upfront fees or credit card required",
    heroBookTrial: "Book Free Class",

    // Marquee Ticker
    marqueeMath: "Higher Mathematics",
    marqueeEnglish: "Spoken English",
    marqueePhysics: "Physics",
    marqueeChemistry: "Chemistry",
    marqueeBiology: "Biology",
    marqueeIct: "ICT & Coding",
    marqueeBangla: "Bangla Literature",
    marqueeAccounting: "Accounting",
    marqueeSsc: "SSC Board Prep",
    marqueeHsc: "HSC Board Prep",
    marqueeText: "— 1 teacher, 1 learner",

    // Mentorship Categories
    catHeaderTitle: "Bangladesh's 1-on-1 Teacher Provision Platform",
    catHeaderDesc: "Choose dedicated subject teachers tailored to your child's needs",
    catIelts: "English & Spoken Tutors",
    catIeltsDesc: "1-on-1 English fluency with DU graduate teachers",
    catBoardPrep: "SSC & HSC Board Exam Tutors",
    catBoardPrepDesc: "Dedicated board exam subject teachers",
    catScience: "Physics, Chem & Math Tutors",
    catScienceDesc: "1-on-1 Science guidance from BUET & DMC tutors",
    catIct: "ICT & Digital Skills Tutors",
    catIctDesc: "Computer & coding tutor support from SUST teachers",
    catBatchSchedule: "Live Teacher Matching Slots",
    catBatchScheduleDesc: "Available weekly 1-on-1 teacher booking slots",
    catFreeResource: "Sponsored Free Teaching",
    catFreeResourceDesc: "100% donor funded free teacher for low-income learners",

    // Mission & Problem Section
    probEyebrow: "Our Core Mission — One-to-One Teacher for All",
    probTitle: "Talent is everywhere. Personal teachers aren't.",
    probDesc:
      "Across Bangladesh, millions of capable students fall behind without personal guidance. Commercial coaching centers sell courses, not individual support. We provide 1-on-1 dedicated teachers.",
    probStat1Num: "1 in 3",
    probStat1Desc: "students from low-income households fall behind without a dedicated private tutor.",
    probStat2Num: "৳0 Fee",
    probStat2Desc: "upfront cost on our donor-funded sponsored track.",
    probStat3Num: "64 Districts",
    probStat3Desc: "reached so far, pairing students with 1-on-1 teachers nationwide.",

    // How Mentorship Works Section
    howEyebrow: "1-on-1 Teaching Workflow",
    howTitle: "From first request to first breakthrough.",
    howDesc:
      "1-on-1 teaching works when tutor matching is precise and sessions are regular.",
    howStep1Num: "01 — Share Learner Needs",
    howStep1Title: "Specify subject & weak areas",
    howStep1Desc: "Select grade, subject, preferred time, and medium. Takes under 4 minutes.",
    howStep2Num: "02 — Teacher Assigned in 48h",
    howStep2Title: "Meet your dedicated teacher",
    howStep2Desc: "Assigned a verified teacher from BUET, DU, or Medical College.",
    howStep3Num: "03 — Weekly 1-on-1 Classes",
    howStep3Title: "Regular classes & reports",
    howStep3Desc: "2-4 classes per week with monthly progress notes sent to parents.",
    howLowDataTitle: "Low Bandwidth Teaching",
    howLowDataDesc: "Our audio-only mode works seamlessly on 2G rural internet.",

    // Subject Mentors Directory
    subjEyebrow: "1-on-1 Subject Teachers",
    subjTitle: "Learn from experienced dedicated tutors.",
    subjDesc: "Math, English, Science or ICT — get a dedicated teacher for each subject.",
    subjFilterAll: "All Subject Teachers",
    subjFilterBoard: "SSC & HSC Teachers",
    subjFilterEnglish: "English Teachers",
    subjFilterScience: "Science Teachers",
    subjFilterIct: "ICT Teachers",
    subjEnrollBtn: "Request This Teacher",
    subjLearnMore: "View Teacher Profile",

    // Mentor Matching Slots
    batchEyebrow: "Available 1-on-1 Teacher Slots",
    batchTitle: "Book Upcoming 1-on-1 Teaching Slots",
    batchDesc: "Reserve a dedicated teacher slot based on your preferred weekly schedule.",
    batchSeatsLeft: "Slots Available",
    batchJoinNow: "Book Teacher Slot",

    // Mentor Verification & Spotlight
    mentorEyebrow: "Our Verified Teachers",
    mentorTitle: "Dedicated tutors from BUET, DU & Medical Colleges.",
    mentorQuote:
      "\"My student in Rangpur used to fail every math term. 6 months of 1-on-1 teaching later, she placed third in her class. Teaching builds confidence.\"",
    mentorName: "Nusrat Jahan, Volunteer Teacher",
    mentorSub: "BUET Graduate · Math Teacher (3 Learners)",

    // Success Stories / Testimonials
    successEyebrow: "Testimonials & Success",
    successTitle: "Parent & Learner Feedback",
    successDesc: "Verified scorecards and progress reviews from students nationwide.",

    // Impact Section
    impactEyebrow: "ototeacher — Since 2024",
    impactTitle: "Measurable Impact of 1-on-1 Teaching",
    impactDesc: "Verified term-end assessment results across every district we serve.",
    impactStat1Num: "4,200+",
    impactStat1Desc: "Students Got 1-on-1 Teachers",
    impactStat2Num: "92%",
    impactStat2Desc: "Improved Full Grade",
    impactStat3Num: "860",
    impactStat3Desc: "Active Verified Teachers",
    impactStat4Num: "64",
    impactStat4Desc: "Districts Covered",
    impactCommunitiesTitle: "Active Student Communities Include:",

    // District Names in English
    districtDhaka: "Dhaka",
    districtRangpur: "Rangpur",
    districtBogura: "Bogura",
    districtKurigram: "Kurigram",
    districtSylhet: "Sylhet",
    districtChittagong: "Chittagong",
    districtBarisal: "Barisal",
    districtRajshahi: "Rajshahi",
    districtKhulna: "Khulna",
    districtMymensingh: "Mymensingh",
    districtCoxsBazar: "Cox's Bazar",
    districtCharLands: "Char Lands (Jamuna)",

    // Sliding Scale Fee & Sponsorship
    priceEyebrow: "Affordable Fee Model",
    priceTitle: "Fair teacher fees matched to family income.",
    priceDesc: "Every plan gets 1 dedicated teacher, weekly classes, and progress notes.",
    priceSponsored: "Sponsored (100% Free)",
    pricePayWhatYouCan: "Pay-What-You-Can (Sliding Scale)",
    priceFullFee: "Full Fee (Subsidizes Others)",
    priceSetPrice: "Set My Fee",
    priceApplySponsor: "Apply for Free Teacher",

    // Footer
    footDesc: "ototeacher — One-to-One Teacher for All. No course selling — 1-on-1 dedicated online tutors for low-income learners.",
    footNewsletter: "Subscribe for regular updates & educational articles",
    footRights: "All Rights Reserved © 2026 ototeacher · Alo Shikkha.",
  },
};

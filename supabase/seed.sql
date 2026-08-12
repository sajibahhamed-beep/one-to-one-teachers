-- ==============================================================================
-- OTOTeachers — Supabase Seed Data
-- Initial data imported from data/db.json
-- ==============================================================================

-- 1. Enrollments Seed
INSERT INTO public.enrollments (id, student_name, phone, grade, district, selected_subjects, preferred_time, fee, status, created_at)
VALUES
  ('ENR-2983', 'asdfdfd', 'asdfdas516413', 'Class X (SSC Prep)', 'adfdfd', ARRAY['Mathematics', 'গণিত ও বীজগণিত', 'স্পোকেন ইংলিশ', 'রসায়ন', 'আইসিটি ও কম্পিউটার'], 'রাত ৮:৩০', 600, 'Pending', '2026-08-07T03:47:42.983Z'),
  ('ENR-1001', 'রাকিব হাসান', '01711223344', 'Class X (SSC)', 'ঢাকা', ARRAY['Higher Mathematics', 'Physics'], '7:00 PM Evening', 6000, 'Pending', '2026-08-06T11:27:46.000Z'),
  ('ENR-1002', 'সাবরিনা সুলতানা', '01899887766', 'HSC 2nd Year', 'চট্টগ্রাম', ARRAY['Chemistry', 'Biology'], '4:00 PM Afternoon', 8000, 'Contacted', '2026-08-06T11:27:46.000Z')
ON CONFLICT (id) DO UPDATE SET
  student_name = EXCLUDED.student_name,
  phone = EXCLUDED.phone,
  grade = EXCLUDED.grade,
  district = EXCLUDED.district,
  selected_subjects = EXCLUDED.selected_subjects,
  preferred_time = EXCLUDED.preferred_time,
  fee = EXCLUDED.fee,
  status = EXCLUDED.status;

-- 2. Pricing Requests Seed
INSERT INTO public.pricing_requests (id, student_name, phone, plan_name, duration, monthly_fee, status, created_at)
VALUES
  ('PRC-4945', 'Student', '', 'Pay-what-you-can', '১ ঘণ্টা', 600, 'Pending', '2026-08-07T04:51:44.945Z'),
  ('PRC-0967', 'Student', '', 'Pay-what-you-can', '১ ঘণ্টা', 600, 'Pending', '2026-08-07T04:51:40.967Z'),
  ('PRC-2001', 'তানজিম আহমেদ', '01555443322', 'সাশ্রয়ী ২-বিষয় প্যাক', '৬ মাস', 5500, 'Pending', '2026-08-06T11:27:46.000Z')
ON CONFLICT (id) DO NOTHING;

-- 3. Contacts Seed
INSERT INTO public.contacts (id, name, email, phone, subject, message, created_at)
VALUES
  ('MSG-3001', 'মাহমুদুল হাসান', 'mahmud@gmail.com', '01911223344', '১-অন-১ ক্লাস সিডিউল প্রশ্ন', 'আসসালামু আলাইকুম, এসএসসি গাণিতিক বিষয়ের জন্য টিউটর সিডিউল কিভাবে নির্ধারণ করা হয়?', '2026-08-06T11:27:46.000Z')
ON CONFLICT (id) DO NOTHING;

-- 4. Teachers Seed
INSERT INTO public.teachers (id, name_bn, name_en, university_bn, university_en, subject_bn, subject_en, avatar)
VALUES
  ('tch-1', 'রাফাত তানভীর', 'Rafat Tanvir', 'বুয়েট (সিএসই)', 'BUET (CSE)', 'উচ্চতর গণিত ও পদার্থবিজ্ঞান', 'Higher Math & Physics', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
  ('tch-2', 'নুসরাত সুলতানা', 'Nusrat Sultana', 'ঢাকা বিশ্ববিদ্যালয় (রসায়ন)', 'Dhaka University (Chemistry)', 'রসায়ন ও জীববিজ্ঞান', 'Chemistry & Biology', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'),
  ('tch-3', 'আরিফুল ইসলাম', 'Ariful Islam', 'ঢাকা মেডিকেল কলেজ (এমবিবিএস)', 'DMC (MBBS)', 'বায়োলজি ও মেডিকেল এডমিশন', 'Biology & Medical Prep', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'),
  ('tch-4', 'ফারজানা ইয়াসমিন', 'Farzana Yasmin', 'বুয়েট (ইইই)', 'BUET (EEE)', 'পদার্থবিজ্ঞান ও আইসিটি', 'Physics & ICT', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80')
ON CONFLICT (id) DO NOTHING;

-- 5. FAQs Seed
INSERT INTO public.faqs (id, q_bn, q_en, a_bn, a_en)
VALUES
  ('faq-1', '১-অন-১ লাইভ ক্লাস কিভাবে পরিচালিত হয়?', 'How are 1-on-1 live classes conducted?', 'আমাদের ১-অন-১ ক্লাস গুগল মিট ও জুমের মাধ্যমে সরাসরি টিউটর এবং শিক্ষার্থীর মধ্যে অনুষ্ঠিত হয়, যেখানে সম্পূর্ণ ব্যক্তিগত মনোযোগ দেওয়া হয়।', 'Our 1-on-1 classes are held directly between tutor and student via Google Meet and Zoom with full personalized attention.'),
  ('faq-2', 'শিক্ষকগণ কোন বিশ্ববিদ্যালয় থেকে যুক্ত?', 'Which universities are the tutors from?', 'আমাদের সকল শিক্ষক বুয়েট (BUET), ঢাকা বিশ্ববিদ্যালয় (DU), এবং শীর্ষ সরকারি মেডিকেল কলেজের অভিজ্ঞ মেধা তালিকার শিক্ষার্থী।', 'All our tutors are top merit rankers from BUET, Dhaka University (DU), and Medical Colleges.'),
  ('faq-3', 'ক্লাসের সময়সূচী কিভাবে নির্ধারিত হয়?', 'How is the class schedule determined?', 'শিক্ষার্থী এবং অভিভাবকের পছন্দের সুবিধাজনক সময়ে ক্লাস নির্ধারণ করা হয়।', 'Class schedules are flexibly customized based on student and guardian availability.'),
  ('faq-4', 'ফ্রি ট্রায়াল ক্লাসের সুবিধা আছে কি?', 'Is there a free trial class available?', 'হ্যাঁ, যেকোনো বিষয়ে ভর্তি হওয়ার পূর্বে ১ম ফ্রি ডেমো ক্লাস বুক করতে পারবেন।', 'Yes, you can book a free 1st demo trial class before confirming enrollment.')
ON CONFLICT (id) DO NOTHING;

-- 6. Blogs Seed
INSERT INTO public.blogs (id, slug, title_bn, title_en, category, excerpt_bn, published_date_bn)
VALUES
  ('1', 'hsc-board-prep-guide', 'এইচএসসি বোর্ড পরীক্ষায় ভালো করার বৈজ্ঞানিক টিপস ও ট্রিকস', 'Scientific Tips to Excel in HSC Board Exams', 'board-prep', 'বুয়েট ও ঢাবি টিউটরদের অভিজ্ঞতা অনুযায়ী পদার্থ ও রসায়নে এ+ পাওয়ার সবচেয়ে কার্যকর পড়ার রুটিন।', '০৫ আগস্ট, ২০২৬'),
  ('2', 'ssc-math-fear-elimination', 'এসএসসি সাধারণ ও উচ্চতর গণিতের ভয় দূর করার ৫ কৌশল', '5 Strategies to Eliminate Math Fear in SSC', 'math-science', 'গণিতের সূত্রের সহজ প্রয়োগ এবং ১-অন-১ মেন্টরিংয়ের মাধ্যমে সহজেই নিশ্চিত এ+ পাওয়ার পথচিত্র।', '০৩ আগস্ট, ২০২৬')
ON CONFLICT (id) DO NOTHING;

-- 7. Settings Seed
INSERT INTO public.settings (
  id,
  social_links,
  facebook_url,
  instagram_url,
  youtube_url,
  linkedin_url,
  whatsapp_phone,
  whatsapp_message_bn,
  whatsapp_message_en,
  phone,
  email,
  address_bn,
  address_en,
  meta_title,
  meta_description,
  keywords
)
VALUES (
  'general_settings',
  '[
    {"id": "soc-1", "name": "Facebook", "iconUrl": "facebook", "url": "https://facebook.com"},
    {"id": "soc-2", "name": "Instagram", "iconUrl": "instagram", "url": "https://instagram.com"},
    {"id": "soc-3", "name": "YouTube", "iconUrl": "youtube", "url": "https://youtube.com"},
    {"id": "soc-4", "name": "LinkedIn", "iconUrl": "linkedin", "url": "https://linkedin.com"}
  ]'::JSONB,
  'https://facebook.com',
  'https://instagram.com',
  'https://youtube.com',
  'https://linkedin.com',
  '8801775551325',
  'হ্যালো ototeachers.com টিম, ১-অন-১ অনলাইন শিক্ষক সম্পর্কে জানতে চাই।',
  'Hello ototeachers.com team, I want to inquire about 1-on-1 online teachers.',
  '01775551325',
  'support@ototeachers.com',
  'ধানমণ্ডি, ঢাকা, বাংলাদেশ',
  'Dhanmondi, Dhaka, Bangladesh',
  'ototeachers.com — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All',
  'বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে।',
  'ototeachers.com, ototeachers, online teacher Bangladesh, ১-অন-১ শিক্ষক, private tutor Bangladesh'
)
ON CONFLICT (id) DO UPDATE SET
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  address_bn = EXCLUDED.address_bn,
  address_en = EXCLUDED.address_en;

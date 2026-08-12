-- ==============================================================================
-- OTOTeachers — Supabase PostgreSQL Schema
-- Database schema for 1-to-1 Teachers Web Application
-- ==============================================================================

-- 1. Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  grade TEXT NOT NULL,
  district TEXT NOT NULL,
  selected_subjects TEXT[] DEFAULT ARRAY[]::TEXT[],
  preferred_time TEXT NOT NULL,
  medium TEXT DEFAULT '',
  selected_plan TEXT DEFAULT '',
  fee NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Pricing Requests Table
CREATE TABLE IF NOT EXISTS public.pricing_requests (
  id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  plan_name TEXT NOT NULL,
  duration TEXT NOT NULL,
  monthly_fee NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Contacts Table
CREATE TABLE IF NOT EXISTS public.contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Teachers Table
CREATE TABLE IF NOT EXISTS public.teachers (
  id TEXT PRIMARY KEY,
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  university_bn TEXT NOT NULL,
  university_en TEXT NOT NULL,
  subject_bn TEXT NOT NULL,
  subject_en TEXT NOT NULL,
  avatar TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  q_bn TEXT NOT NULL,
  q_en TEXT NOT NULL,
  a_bn TEXT NOT NULL,
  a_en TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_bn TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'mentorship',
  excerpt_bn TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  published_date_bn TEXT NOT NULL DEFAULT '',
  published_date_en TEXT DEFAULT '',
  image TEXT DEFAULT '',
  content_bn TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Settings Table (Single-row configuration)
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'general_settings',
  social_links JSONB DEFAULT '[]'::JSONB,
  facebook_url TEXT DEFAULT 'https://facebook.com',
  instagram_url TEXT DEFAULT 'https://instagram.com',
  youtube_url TEXT DEFAULT 'https://youtube.com',
  linkedin_url TEXT DEFAULT 'https://linkedin.com',
  whatsapp_phone TEXT DEFAULT '8801775551325',
  whatsapp_message_bn TEXT DEFAULT 'হ্যালো ototeachers.com টিম, ১-অন-১ অনলাইন শিক্ষক সম্পর্কে জানতে চাই।',
  whatsapp_message_en TEXT DEFAULT 'Hello ototeachers.com team, I want to inquire about 1-on-1 online teachers.',
  phone TEXT DEFAULT '01775551325',
  email TEXT DEFAULT 'support@ototeachers.com',
  address_bn TEXT DEFAULT 'ধানমণ্ডি, ঢাকা, বাংলাদেশ',
  address_en TEXT DEFAULT 'Dhanmondi, Dhaka, Bangladesh',
  meta_title TEXT DEFAULT 'ototeachers.com — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All',
  meta_description TEXT DEFAULT 'বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে।',
  keywords TEXT DEFAULT 'ototeachers.com, ototeachers, online teacher Bangladesh, ১-অন-১ শিক্ষক, private tutor Bangladesh',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Teacher Applications Table
CREATE TABLE IF NOT EXISTS public.teacher_applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  institution TEXT NOT NULL,
  subject_expertise TEXT NOT NULL,
  hours_per_week TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
  id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  amount NUMERIC NOT NULL DEFAULT 0,
  trx_id TEXT NOT NULL,
  type TEXT DEFAULT 'Fee Collection',
  payment_method TEXT DEFAULT 'bKash',
  status TEXT NOT NULL DEFAULT 'Paid',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- Performance Indexes
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON public.enrollments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pricing_requests_created_at ON public.pricing_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_teacher_applications_created_at ON public.teacher_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON public.payments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);

-- ==============================================================================
-- Row Level Security (RLS) & Policies
-- ==============================================================================
-- Enable RLS on all tables
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to public collections
CREATE POLICY "Public can view teachers" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Public can view faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public can view blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Public can view settings" ON public.settings FOR SELECT USING (true);

-- Allow public insert into submission collections
CREATE POLICY "Public can insert enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert pricing_requests" ON public.pricing_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert teacher_applications" ON public.teacher_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert payments" ON public.payments FOR INSERT WITH CHECK (true);

-- Service role has full access to all tables (bypasses RLS by default in Supabase)
-- Public read for enrollments/payments/contacts for admin API endpoints via service key
CREATE POLICY "Service role full access enrollments" ON public.enrollments USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access pricing_requests" ON public.pricing_requests USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access contacts" ON public.contacts USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access teachers" ON public.teachers USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access faqs" ON public.faqs USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access blogs" ON public.blogs USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access settings" ON public.settings USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access teacher_applications" ON public.teacher_applications USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access inquiries" ON public.inquiries USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access payments" ON public.payments USING (true) WITH CHECK (true);

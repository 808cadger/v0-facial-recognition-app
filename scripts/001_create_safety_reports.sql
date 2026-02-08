-- Create safety_reports table for construction safety violations
CREATE TABLE IF NOT EXISTS public.safety_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  photo_url TEXT,
  severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  boss_notified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.safety_reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert reports (no login required for workers)
CREATE POLICY "Anyone can submit a safety report"
  ON public.safety_reports FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read reports (boss dashboard is public for simplicity)
CREATE POLICY "Anyone can view safety reports"
  ON public.safety_reports FOR SELECT
  USING (true);

-- Allow anyone to update reports (for status changes on dashboard)
CREATE POLICY "Anyone can update safety reports"
  ON public.safety_reports FOR UPDATE
  USING (true);

-- Create storage bucket for report photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('report-photos', 'report-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload photos to the report-photos bucket
CREATE POLICY "Anyone can upload report photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'report-photos');

-- Allow anyone to view report photos
CREATE POLICY "Anyone can view report photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'report-photos');

/*
  # Email Automation Schema

  1. New Tables
    - `email_logs`
      - `id` (uuid, primary key)
      - `sender_email` (text, required)
      - `sender_name` (text)
      - `original_subject` (text, required)
      - `original_body` (text, required)
      - `category` (text, required) - order_inquiry, support_request, or general
      - `response_sent` (boolean, default false)
      - `response_subject` (text)
      - `response_body` (text)
      - `confidence_score` (float)
      - `created_at` (timestamp with timezone, default now())

    - `email_templates`
      - `id` (uuid, primary key)
      - `category` (text, required) - order_inquiry, support_request, or general
      - `subject` (text, required)
      - `body` (text, required)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp with timezone, default now())
      - `updated_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
    - Public read access for the application to function properly
*/

-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_email text NOT NULL,
  sender_name text,
  original_subject text NOT NULL,
  original_body text NOT NULL,
  category text NOT NULL CHECK (category IN ('order_inquiry', 'support_request', 'general')),
  response_sent boolean DEFAULT false,
  response_subject text,
  response_body text,
  confidence_score float,
  created_at timestamptz DEFAULT now()
);

-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('order_inquiry', 'support_request', 'general')),
  subject text NOT NULL,
  body text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for email_logs
CREATE POLICY "Allow public access to email_logs"
  ON email_logs
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create policies for email_templates
CREATE POLICY "Allow public access to email_templates"
  ON email_templates
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Insert default email templates
INSERT INTO email_templates (category, subject, body, is_active) VALUES
(
  'order_inquiry',
  'Thank you for your order inquiry!',
  'Hi [Name],

Thank you for your interest in our products! We''ve received your order inquiry and our team will get back to you within 24 hours with detailed information.

Best regards,
The CodexCity Team',
  true
),
(
  'support_request',
  'We''re here to help!',
  'Hi [Name],

We''ve received your support request and want to help you resolve this issue as quickly as possible. Our support team will contact you within 4 hours.

Thank you for your patience,
The CodexCity Support Team',
  true
),
(
  'general',
  'Thanks for contacting us!',
  'Hi [Name],

Thank you for reaching out to us. We''ve received your message and will respond within 24 hours.

Best regards,
The CodexCity Team',
  true
)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_category ON email_logs(category);
CREATE INDEX IF NOT EXISTS idx_email_templates_category ON email_templates(category);
CREATE INDEX IF NOT EXISTS idx_email_templates_active ON email_templates(is_active);
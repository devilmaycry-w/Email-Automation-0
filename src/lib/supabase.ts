import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type EmailLog = {
  id: string;
  user_id: string;
  sender_email: string;
  sender_name: string;
  original_subject: string;
  original_body: string;
  category: 'order_inquiry' | 'support_request' | 'general';
  response_sent: boolean;
  response_subject?: string;
  response_body?: string;
  created_at: string;
  confidence_score?: number;
};

export type EmailTemplate = {
  id: string;
  user_id: string;
  category: 'order_inquiry' | 'support_request' | 'general';
  subject: string;
  body: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  company_name?: string;
  created_at: string;
  updated_at: string;
};

// Initialize database tables and create default templates for new users
export const initializeDatabase = async () => {
  try {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return true; // Not authenticated, skip initialization
    }

    // Check if user has templates, if not create default ones
    const { data: templates } = await supabase
      .from('email_templates')
      .select('*')
      .eq('user_id', user.id)
      .limit(1);
    
    if (templates && templates.length === 0) {
      await createDefaultTemplates(user.id);
    }
    
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
};

const createDefaultTemplates = async (userId: string) => {
  const defaultTemplates = [
    {
      user_id: userId,
      category: 'order_inquiry',
      subject: 'Thank you for your order inquiry!',
      body: 'Hi [Name],\n\nThank you for your interest in our products! We\'ve received your order inquiry and our team will get back to you within 24 hours with detailed information.\n\nBest regards,\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'support_request',
      subject: 'We\'re here to help!',
      body: 'Hi [Name],\n\nWe\'ve received your support request and want to help you resolve this issue as quickly as possible. Our support team will contact you within 4 hours.\n\nThank you for your patience,\nThe CodexCity Support Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'general',
      subject: 'Thanks for contacting us!',
      body: 'Hi [Name],\n\nThank you for reaching out to us. We\'ve received your message and will respond within 24 hours.\n\nBest regards,\nThe CodexCity Team',
      is_active: true
    }
  ];

  for (const template of defaultTemplates) {
    await supabase.from('email_templates').insert(template);
  }
};
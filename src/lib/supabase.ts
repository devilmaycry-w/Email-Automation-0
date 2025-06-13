import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type EmailCategory = 
  | 'order_inquiry' 
  | 'support_request' 
  | 'general'
  | 'abandoned_cart'
  | 'welcome_email'
  | 're_engagement'
  | 'promotional'
  | 'newsletter'
  | 'confirmation'
  | 'birthday'
  | 'feedback_request'
  | 'cross_sell_upsell'
  | 'motivational'
  | 'back_in_stock'
  | 'behavioral'
  | 'drip_campaign'
  | 'email_marketing'
  | 'product_review'
  | 're_engagement_campaign'
  | 'win_back';

export type EmailLog = {
  id: string;
  user_id: string;
  sender_email: string;
  sender_name: string;
  original_subject: string;
  original_body: string;
  category: EmailCategory;
  response_sent: boolean;
  response_subject?: string;
  response_body?: string;
  created_at: string;
  confidence_score?: number;
};

export type EmailTemplate = {
  id: string;
  user_id: string;
  category: EmailCategory;
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
    // Original templates
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
    },
    // New templates
    {
      user_id: userId,
      category: 'abandoned_cart',
      subject: 'Don\'t forget your items!',
      body: 'Hi [Name],\n\nYou left some amazing items in your cart! Complete your purchase now and enjoy free shipping on orders over $50.\n\nYour cart is waiting for you.\n\nBest regards,\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'welcome_email',
      subject: 'Welcome to CodexCity!',
      body: 'Hi [Name],\n\nWelcome to the CodexCity family! We\'re thrilled to have you on board. Get ready to experience the future of email automation.\n\nHere\'s what you can do next:\n• Set up your first automation\n• Explore our templates\n• Connect your integrations\n\nWelcome aboard!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 're_engagement',
      subject: 'We miss you, [Name]!',
      body: 'Hi [Name],\n\nIt\'s been a while since we\'ve seen you! We\'ve added some exciting new features and would love to have you back.\n\nCome check out what\'s new and rediscover the power of automated email marketing.\n\nWe\'d love to see you again!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'promotional',
      subject: 'Special offer just for you!',
      body: 'Hi [Name],\n\nWe have an exclusive offer just for you! Get 25% off your next purchase with code SAVE25.\n\nThis limited-time offer expires soon, so don\'t wait!\n\nShop now and save big!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'newsletter',
      subject: 'Your monthly CodexCity update',
      body: 'Hi [Name],\n\nHere\'s what\'s new this month at CodexCity:\n\n• New AI features launched\n• Customer success stories\n• Upcoming webinars\n• Industry insights\n\nStay connected and keep growing!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'confirmation',
      subject: 'Order confirmed - Thank you!',
      body: 'Hi [Name],\n\nThank you for your order! We\'ve received your payment and are processing your request.\n\nOrder details:\n• Order number: #12345\n• Estimated delivery: 3-5 business days\n\nWe\'ll send you tracking information soon.\n\nBest regards,\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'birthday',
      subject: 'Happy Birthday, [Name]! 🎉',
      body: 'Hi [Name],\n\nHappy Birthday! 🎂 We hope your special day is filled with joy and celebration.\n\nAs a birthday gift, enjoy 20% off your next purchase with code BIRTHDAY20.\n\nHave a wonderful day!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'feedback_request',
      subject: 'How was your experience?',
      body: 'Hi [Name],\n\nWe hope you\'re enjoying your recent purchase! Your feedback means the world to us.\n\nCould you take 2 minutes to share your experience? Your review helps us improve and helps other customers make informed decisions.\n\nThank you for your time!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'cross_sell_upsell',
      subject: 'Perfect additions to your recent purchase',
      body: 'Hi [Name],\n\nWe noticed you recently purchased from us. Based on your selection, we think you might love these complementary products:\n\n• Premium add-on features\n• Extended warranty options\n• Exclusive accessories\n\nUpgrade your experience today!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'motivational',
      subject: 'You\'re doing amazing, [Name]!',
      body: 'Hi [Name],\n\nWe wanted to take a moment to celebrate your progress! You\'ve been making great strides with your email automation.\n\nKeep up the excellent work. Every step forward is a step toward success.\n\nYou\'ve got this!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'back_in_stock',
      subject: 'Good news! Your item is back in stock',
      body: 'Hi [Name],\n\nGreat news! The item you were waiting for is back in stock and ready to ship.\n\nDon\'t wait too long - popular items sell out quickly!\n\nGet yours now before it\'s gone again.\n\nBest regards,\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'behavioral',
      subject: 'Based on your activity...',
      body: 'Hi [Name],\n\nWe noticed you\'ve been exploring our platform! Based on your recent activity, we think these features might interest you:\n\n• Advanced automation workflows\n• Custom template builder\n• Analytics dashboard\n\nDiscover more possibilities!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'drip_campaign',
      subject: 'Your journey continues - Day 3',
      body: 'Hi [Name],\n\nWelcome to day 3 of your CodexCity journey! Today, let\'s explore advanced features that will take your email automation to the next level.\n\nIn this email:\n• Setting up triggers\n• Creating workflows\n• Measuring success\n\nLet\'s keep building!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'email_marketing',
      subject: 'Boost your email marketing ROI',
      body: 'Hi [Name],\n\nReady to supercharge your email marketing? Here are proven strategies to increase your ROI:\n\n• Segment your audience\n• Personalize your content\n• Optimize send times\n• A/B test everything\n\nStart implementing these today!\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'product_review',
      subject: 'Share your thoughts on your recent purchase',
      body: 'Hi [Name],\n\nHow are you enjoying your recent purchase? We\'d love to hear about your experience!\n\nYour honest review helps us improve our products and helps other customers make informed decisions.\n\nLeave a review and get 10% off your next order!\n\nThank you,\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 're_engagement_campaign',
      subject: 'Let\'s reconnect, [Name]',
      body: 'Hi [Name],\n\nWe\'ve missed having you as an active part of our community! A lot has changed since you last visited:\n\n• New features added\n• Improved user experience\n• Better automation tools\n\nCome back and see what\'s new!\n\nWe\'d love to have you back,\nThe CodexCity Team',
      is_active: true
    },
    {
      user_id: userId,
      category: 'win_back',
      subject: 'One last chance - Special offer inside',
      body: 'Hi [Name],\n\nBefore you go, we have one final offer for you. Get 40% off any plan and rediscover why thousands of businesses trust CodexCity.\n\nThis is our best offer of the year, and it\'s exclusively for you.\n\nDon\'t miss out - offer expires in 48 hours!\n\nLast chance,\nThe CodexCity Team',
      is_active: true
    }
  ];

  for (const template of defaultTemplates) {
    try {
      await supabase.from('email_templates').insert(template);
    } catch (error) {
      console.error('Error inserting template:', error);
    }
  }
};
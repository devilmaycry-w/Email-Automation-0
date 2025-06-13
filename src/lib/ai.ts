import axios from 'axios';
import type { EmailCategory } from './supabase';

export interface ClassificationResult {
  category: EmailCategory;
  confidence: number;
}

export const classifyEmail = async (emailContent: string): Promise<ClassificationResult> => {
  try {
    // For demo purposes, we'll use keyword-based classification
    // In production, you'd use Hugging Face API with your key
    const content = emailContent.toLowerCase();
    
    // Keywords for different categories
    const categoryKeywords: Record<EmailCategory, string[]> = {
      order_inquiry: ['order', 'purchase', 'buy', 'product', 'price', 'cost', 'payment', 'invoice', 'shipping', 'delivery'],
      support_request: ['help', 'problem', 'issue', 'bug', 'error', 'not working', 'broken', 'fix', 'troubleshoot', 'support'],
      general: ['hello', 'hi', 'question', 'inquiry', 'information', 'contact'],
      abandoned_cart: ['cart', 'checkout', 'abandoned', 'forgot', 'complete', 'purchase'],
      welcome_email: ['welcome', 'new', 'signup', 'registration', 'account'],
      re_engagement: ['miss', 'back', 'return', 'inactive', 'engagement'],
      promotional: ['sale', 'discount', 'offer', 'promotion', 'deal', 'coupon'],
      newsletter: ['newsletter', 'update', 'news', 'monthly', 'weekly'],
      confirmation: ['confirm', 'confirmation', 'receipt', 'order placed'],
      birthday: ['birthday', 'anniversary', 'celebration', 'special day'],
      feedback_request: ['feedback', 'review', 'rating', 'experience', 'survey'],
      cross_sell_upsell: ['upgrade', 'additional', 'complement', 'recommend'],
      motivational: ['motivation', 'inspire', 'achieve', 'success', 'goal'],
      back_in_stock: ['stock', 'available', 'restock', 'inventory'],
      behavioral: ['behavior', 'activity', 'usage', 'pattern'],
      drip_campaign: ['series', 'sequence', 'journey', 'step'],
      email_marketing: ['marketing', 'campaign', 'strategy', 'roi'],
      product_review: ['review', 'testimonial', 'opinion', 'rating'],
      re_engagement_campaign: ['re-engage', 'win back', 'return', 'comeback'],
      win_back: ['final', 'last chance', 'goodbye', 'leaving']
    };
    
    let bestCategory: EmailCategory = 'general';
    let bestScore = 0;
    
    // Score each category based on keyword matches
    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      let score = 0;
      keywords.forEach(keyword => {
        if (content.includes(keyword)) score++;
      });
      
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category as EmailCategory;
      }
    });
    
    // Calculate confidence based on score
    const confidence = bestScore > 0 ? Math.min(bestScore / 5, 1) : 0.3;
    
    return { category: bestCategory, confidence };
  } catch (error) {
    console.error('Email classification error:', error);
    return { category: 'general', confidence: 0.3 };
  }
};

// Future implementation with Hugging Face API
export const classifyEmailWithHuggingFace = async (emailContent: string): Promise<ClassificationResult> => {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  if (!apiKey) {
    return classifyEmail(emailContent); // Fallback to keyword-based
  }
  
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
      {
        inputs: emailContent,
        parameters: {
          candidate_labels: [
            'order inquiry', 'support request', 'general inquiry', 'abandoned cart',
            'welcome email', 're-engagement', 'promotional', 'newsletter',
            'confirmation', 'birthday', 'feedback request', 'cross-sell upsell',
            'motivational', 'back in stock', 'behavioral', 'drip campaign',
            'email marketing', 'product review', 're-engagement campaign', 'win back'
          ]
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const result = response.data;
    const topLabel = result.labels[0];
    let category: EmailCategory = 'general';
    
    // Map labels to categories
    const labelMap: Record<string, EmailCategory> = {
      'order inquiry': 'order_inquiry',
      'support request': 'support_request',
      'general inquiry': 'general',
      'abandoned cart': 'abandoned_cart',
      'welcome email': 'welcome_email',
      're-engagement': 're_engagement',
      'promotional': 'promotional',
      'newsletter': 'newsletter',
      'confirmation': 'confirmation',
      'birthday': 'birthday',
      'feedback request': 'feedback_request',
      'cross-sell upsell': 'cross_sell_upsell',
      'motivational': 'motivational',
      'back in stock': 'back_in_stock',
      'behavioral': 'behavioral',
      'drip campaign': 'drip_campaign',
      'email marketing': 'email_marketing',
      'product review': 'product_review',
      're-engagement campaign': 're_engagement_campaign',
      'win back': 'win_back'
    };
    
    category = labelMap[topLabel] || 'general';
    
    return {
      category,
      confidence: result.scores[0]
    };
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return classifyEmail(emailContent); // Fallback
  }
};
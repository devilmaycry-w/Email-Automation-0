import axios from 'axios';

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

export interface ClassificationResult {
  category: 'order_inquiry' | 'support_request' | 'general';
  confidence: number;
}

export const classifyEmail = async (emailContent: string): Promise<ClassificationResult> => {
  try {
    // For demo purposes, we'll use keyword-based classification
    // In production, you'd use Hugging Face API with your key
    const content = emailContent.toLowerCase();
    
    // Keywords for different categories
    const orderKeywords = ['order', 'purchase', 'buy', 'product', 'price', 'cost', 'payment', 'invoice', 'shipping', 'delivery'];
    const supportKeywords = ['help', 'problem', 'issue', 'bug', 'error', 'not working', 'broken', 'fix', 'troubleshoot', 'support'];
    
    let orderScore = 0;
    let supportScore = 0;
    
    orderKeywords.forEach(keyword => {
      if (content.includes(keyword)) orderScore++;
    });
    
    supportKeywords.forEach(keyword => {
      if (content.includes(keyword)) supportScore++;
    });
    
    if (orderScore > supportScore && orderScore > 0) {
      return { category: 'order_inquiry', confidence: Math.min(orderScore / 5, 1) };
    } else if (supportScore > 0) {
      return { category: 'support_request', confidence: Math.min(supportScore / 5, 1) };
    } else {
      return { category: 'general', confidence: 0.5 };
    }
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
          candidate_labels: ['order inquiry', 'support request', 'general inquiry']
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
    let category: 'order_inquiry' | 'support_request' | 'general' = 'general';
    
    if (topLabel.includes('order')) category = 'order_inquiry';
    else if (topLabel.includes('support')) category = 'support_request';
    
    return {
      category,
      confidence: result.scores[0]
    };
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return classifyEmail(emailContent); // Fallback
  }
};
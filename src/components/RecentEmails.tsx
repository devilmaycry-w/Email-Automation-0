import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { EmailLog } from '../lib/supabase';

interface RecentEmailsProps {
  emails: EmailLog[];
}

export const RecentEmails: React.FC<RecentEmailsProps> = ({ emails }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'order_inquiry': return 'blue';
      case 'support_request': return 'green';
      case 'general': return 'purple';
      case 'abandoned_cart': return 'orange';
      case 'welcome_email': return 'emerald';
      case 're_engagement': return 'pink';
      case 'promotional': return 'red';
      case 'newsletter': return 'indigo';
      case 'confirmation': return 'teal';
      case 'birthday': return 'yellow';
      case 'feedback_request': return 'cyan';
      case 'cross_sell_upsell': return 'violet';
      case 'motivational': return 'lime';
      case 'back_in_stock': return 'amber';
      case 'behavioral': return 'rose';
      case 'drip_campaign': return 'sky';
      case 'email_marketing': return 'fuchsia';
      case 'product_review': return 'slate';
      case 're_engagement_campaign': return 'stone';
      case 'win_back': return 'zinc';
      default: return 'gray';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      order_inquiry: 'Order Inquiry',
      support_request: 'Support Request',
      general: 'General',
      abandoned_cart: 'Abandoned Cart',
      welcome_email: 'Welcome',
      re_engagement: 'Re-engagement',
      promotional: 'Promotional',
      newsletter: 'Newsletter',
      confirmation: 'Confirmation',
      birthday: 'Birthday',
      feedback_request: 'Feedback',
      cross_sell_upsell: 'Cross-sell',
      motivational: 'Motivational',
      back_in_stock: 'Back in Stock',
      behavioral: 'Behavioral',
      drip_campaign: 'Drip Campaign',
      email_marketing: 'Email Marketing',
      product_review: 'Product Review',
      re_engagement_campaign: 'Re-engagement',
      win_back: 'Win-back'
    };
    return labels[category] || category;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
        <Mail className="w-6 md:w-7 h-6 md:h-7 text-blue-600 flex-shrink-0" />
        <span className="break-words">Recent Email Activity</span>
      </h2>
      
      {emails.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <Mail className="w-12 md:w-16 h-12 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" />
          <p className="text-gray-500 text-base md:text-lg font-medium">No emails processed yet</p>
          <p className="text-gray-400 text-sm mt-2 px-4">
            Connect your email integration to start seeing activity
          </p>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {emails.map((email, index) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 md:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {/* Mobile Layout */}
              <div className="block md:hidden space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className={`p-1.5 rounded-lg bg-${getCategoryColor(email.category)}-100 flex-shrink-0`}>
                      <Mail className={`w-4 h-4 text-${getCategoryColor(email.category)}-600`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm break-words">
                        {truncateText(email.sender_name || email.sender_email, 20)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    {email.response_sent ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Sent</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-500">
                        <XCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Failed</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(email.category)}-100 text-${getCategoryColor(email.category)}-600 whitespace-nowrap`}>
                    {getCategoryLabel(email.category)}
                  </span>
                </div>
                
                {/* Subject */}
                <p className="text-sm text-gray-600 break-words leading-relaxed">
                  {truncateText(email.original_subject, 60)}
                </p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">{formatDate(email.created_at)}</span>
                  </span>
                  {email.confidence_score && (
                    <span className="whitespace-nowrap">
                      Confidence: {Math.round(email.confidence_score * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className={`p-2 rounded-lg bg-${getCategoryColor(email.category)}-100 flex-shrink-0`}>
                    <Mail className={`w-5 h-5 text-${getCategoryColor(email.category)}-600`} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-gray-900 break-words">
                        {email.sender_name || email.sender_email}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(email.category)}-100 text-${getCategoryColor(email.category)}-600 whitespace-nowrap`}>
                        {getCategoryLabel(email.category)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 break-words mb-2 leading-relaxed">
                      {email.original_subject}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="whitespace-nowrap">{formatDate(email.created_at)}</span>
                      </span>
                      {email.confidence_score && (
                        <span className="whitespace-nowrap">
                          Confidence: {Math.round(email.confidence_score * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  {email.response_sent ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium whitespace-nowrap">Sent</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-500">
                      <XCircle className="w-5 h-5" />
                      <span className="text-sm font-medium whitespace-nowrap">Failed</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
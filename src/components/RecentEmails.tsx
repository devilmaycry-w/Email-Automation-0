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
      default: return 'gray';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'order_inquiry': return 'Order Inquiry';
      case 'support_request': return 'Support Request';
      case 'general': return 'General';
      default: return category;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <Mail className="w-7 h-7 text-blue-600" />
        Recent Email Activity
      </h2>
      
      {emails.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No emails processed yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Connect your email integration to start seeing activity
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {emails.map((email, index) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-${getCategoryColor(email.category)}-100`}>
                  <Mail className={`w-5 h-5 text-${getCategoryColor(email.category)}-600`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {email.sender_name || email.sender_email}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(email.category)}-100 text-${getCategoryColor(email.category)}-600`}>
                      {getCategoryLabel(email.category)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate max-w-md">
                    {email.original_subject}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(email.created_at)}
                    </span>
                    {email.confidence_score && (
                      <span>
                        Confidence: {Math.round(email.confidence_score * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {email.response_sent ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Sent</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-500">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Failed</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
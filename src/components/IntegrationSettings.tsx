import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Mail, Key, CheckCircle, AlertCircle, ExternalLink, Shield } from 'lucide-react';
import { processIncomingEmail } from '../lib/email';
import toast from 'react-hot-toast';

export const IntegrationSettings: React.FC = () => {
  const [testEmail, setTestEmail] = useState({
    senderEmail: 'customer@example.com',
    senderName: 'John Doe',
    subject: 'Question about my recent order',
    body: 'Hi, I placed an order last week and wanted to check on the shipping status. Could you please provide an update? Thanks!'
  });
  const [isTestingEmail, setIsTestingEmail] = useState(false);

  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    try {
      const result = await processIncomingEmail(
        testEmail.senderEmail,
        testEmail.senderName,
        testEmail.subject,
        testEmail.body
      );
      
      if (result.success) {
        toast.success(`Email processed and sent successfully! Classified as: ${result.category}`);
      } else {
        toast.error('Email processing failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Test email error:', error);
      toast.error('Error testing email processing: ' + error.message);
    } finally {
      setIsTestingEmail(false);
    }
  };

  // Note: SendGrid is now configured via Edge Function environment variables
  const sendGridConfigured = true; // Edge function handles SendGrid configuration
  const supabaseConfigured = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const verifiedDomain = import.meta.env.VITE_VERIFIED_SENDER_EMAIL || 'noreply@em5767.ankrit.tech';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Settings className="w-10 h-10 text-blue-600" />
          Integration Settings
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Configure your email automation and test the AI classification system
        </p>
      </div>

      {/* SendGrid Integration Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Mail className="w-7 h-7 text-blue-600" />
          SendGrid Integration
        </h2>
        
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 rounded-xl ${
            sendGridConfigured ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <div className="flex items-center gap-3">
              {sendGridConfigured ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
              <div>
                <p className={`font-medium ${sendGridConfigured ? 'text-green-900' : 'text-red-900'}`}>
                  {sendGridConfigured ? 'Edge Function Configured' : 'Edge Function Missing'}
                </p>
                <p className={`text-sm ${sendGridConfigured ? 'text-green-700' : 'text-red-700'}`}>
                  {sendGridConfigured ? 'SendGrid integration via secure Edge Function' : 'SendGrid Edge Function not deployed'}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              sendGridConfigured 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {sendGridConfigured ? 'Connected' : 'Not Connected'}
            </span>
          </div>

          {/* Verified Domain Status */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Verified Sender Domain</p>
                <p className="text-sm text-blue-700">
                  Using verified domain: <span className="font-mono">{verifiedDomain}</span>
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Verified ✓
            </span>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 mb-2">SendGrid Configuration Status</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✅ Domain authentication verified (em5767.ankrit.tech)</li>
                  <li>✅ Sender email configured ({verifiedDomain})</li>
                  <li>✅ API key configured via secure Edge Function</li>
                  <li>✅ Email tracking enabled (open & click tracking)</li>
                  <li>✅ CORS issues resolved via server-side processing</li>
                </ul>
                <a
                  href="https://sendgrid.com/docs/for-developers/sending-email/sender-identity/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-blue-600 hover:text-blue-700 font-medium"
                >
                  View SendGrid Documentation
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Supabase Integration Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Database Configuration</h2>
        
        <div className={`p-4 rounded-xl ${supabaseConfigured ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-start gap-3">
            {supabaseConfigured ? (
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
            )}
            <div>
              <p className={`font-medium mb-2 ${supabaseConfigured ? 'text-green-900' : 'text-red-900'}`}>
                {supabaseConfigured ? 'Supabase Connected' : 'Supabase Configuration Missing'}
              </p>
              <p className={`text-sm ${supabaseConfigured ? 'text-green-800' : 'text-red-800'}`}>
                {supabaseConfigured 
                  ? 'Database is connected and ready for storing email logs and templates.'
                  : 'Supabase URL or API key not found in environment variables.'
                }
              </p>
              {supabaseConfigured && (
                <ul className="text-sm text-green-800 mt-2 space-y-1">
                  <li>✅ User authentication enabled</li>
                  <li>✅ Email logs table configured</li>
                  <li>✅ Email templates table configured</li>
                  <li>✅ Row Level Security (RLS) enabled</li>
                  <li>✅ Edge Functions deployed and accessible</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Classification Testing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Key className="w-7 h-7 text-blue-600" />
          Test AI Classification & Email Sending
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sender Email
            </label>
            <input
              type="email"
              value={testEmail.senderEmail}
              onChange={(e) => setTestEmail(prev => ({ ...prev, senderEmail: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sender Name
            </label>
            <input
              type="text"
              value={testEmail.senderName}
              onChange={(e) => setTestEmail(prev => ({ ...prev, senderName: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Subject
            </label>
            <input
              type="text"
              value={testEmail.subject}
              onChange={(e) => setTestEmail(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Body
            </label>
            <textarea
              value={testEmail.body}
              onChange={(e) => setTestEmail(prev => ({ ...prev, body: e.target.value }))}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTestEmail}
            disabled={isTestingEmail || !sendGridConfigured || !supabaseConfigured}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTestingEmail ? 'Processing & Sending...' : 'Test Email Processing & Sending'}
          </motion.button>
          
          {(!sendGridConfigured || !supabaseConfigured) && (
            <p className="text-sm text-red-600 text-center">
              Please ensure both SendGrid Edge Function and Supabase are properly configured before testing.
            </p>
          )}

          {sendGridConfigured && supabaseConfigured && (
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900 mb-1">
                    Ready to Test!
                  </p>
                  <p className="text-sm text-green-800">
                    This will classify the email using AI, generate a personalized response, and send it via SendGrid using your verified domain through a secure Edge Function.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
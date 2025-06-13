import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Settings, BarChart3, Zap, CheckCircle, User } from 'lucide-react';
import { getEmailStats } from '../lib/email';
import { StatsCard } from './StatsCard';
import { EmailTemplates } from './EmailTemplates';
import { RecentEmails } from './RecentEmails';
import { IntegrationSettings } from './IntegrationSettings';
import { UserProfile } from './UserProfile';
import type { AuthUser } from '../lib/auth';

interface DashboardProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
  user: AuthUser;
  onSignOut: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onTabChange, activeTab, user, onSignOut }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    const emailStats = await getEmailStats();
    setStats(emailStats);
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (activeTab === 'templates') {
    return <EmailTemplates />;
  }

  if (activeTab === 'settings') {
    return <IntegrationSettings />;
  }

  if (activeTab === 'profile') {
    return <UserProfile user={user} onSignOut={onSignOut} />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back, <span className="text-blue-600">{user.profile?.full_name || 'User'}</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your AI-powered email automation dashboard is ready to transform customer communications
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Emails"
          value={stats?.totalEmails || 0}
          icon={Mail}
          color="blue"
          loading={loading}
        />
        <StatsCard
          title="Responses Sent"
          value={stats?.responsesSent || 0}
          icon={CheckCircle}
          color="green"
          loading={loading}
        />
        <StatsCard
          title="Response Rate"
          value={`${Math.round(stats?.responseRate || 0)}%`}
          icon={BarChart3}
          color="purple"
          loading={loading}
        />
        <StatsCard
          title="AI Accuracy"
          value="94%"
          icon={Zap}
          color="orange"
          loading={loading}
        />
      </motion.div>

      {/* Category Breakdown */}
      {stats?.categoryCounts && (
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <MessageSquare className="w-7 h-7 text-blue-600" />
            Email Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.categoryCounts.order_inquiry || 0}
              </div>
              <div className="text-gray-600">Order Inquiries</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.categoryCounts.support_request || 0}
              </div>
              <div className="text-gray-600">Support Requests</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.categoryCounts.general || 0}
              </div>
              <div className="text-gray-600">General Inquiries</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Emails */}
      {stats?.recentEmails && (
        <motion.div variants={itemVariants}>
          <RecentEmails emails={stats.recentEmails} />
        </motion.div>
      )}
    </motion.div>
  );
};
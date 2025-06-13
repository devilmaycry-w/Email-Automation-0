import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail, Brain, BarChart3, CheckCircle, ArrowRight, Star, Users, Clock, Shield } from 'lucide-react';
import { AuthModal } from './Auth/AuthModal';

interface LandingPageProps {
  onAuthSuccess: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Classification',
      description: 'Automatically categorize emails into Order Inquiries, Support Requests, and General messages with 94% accuracy.',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Automated Responses',
      description: 'Send personalized replies instantly using customizable templates that adapt to each customer.',
      color: 'green'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track response rates, email volumes, and customer satisfaction with beautiful dashboards.',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Secure Integration',
      description: 'Enterprise-grade security with SendGrid integration and encrypted data storage.',
      color: 'orange'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Emails Processed', icon: Mail },
    { value: '94%', label: 'AI Accuracy', icon: Brain },
    { value: '2.5x', label: 'Faster Responses', icon: Clock },
    { value: '500+', label: 'Happy Customers', icon: Users }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-16 max-w-7xl"
      >
        {/* Navigation */}
        <motion.nav variants={itemVariants} className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">CodexCity</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.nav>

        {/* Hero Content */}
        <div className="text-center mb-20">
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="w-4 h-4" />
              Trusted by 500+ businesses worldwide
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                Email Automation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              AI-powered email automation that turns customer communications into meaningful relationships. 
              Classify, respond, and engage with intelligent automation.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-3"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="block text-blue-600">Modern Businesses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to automate your email communications and delight your customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${feature.color}-100 rounded-2xl mb-6`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Email Workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses already using CodexCity to automate their customer communications
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Free 14-day trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Cancel anytime
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          onAuthSuccess();
        }}
      />
    </div>
  );
};
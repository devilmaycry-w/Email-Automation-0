import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ExternalLink } from 'lucide-react';

export const CreatorFooter: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-16 mb-8"
    >
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-gray-100 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the Creator
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
          </div>

          {/* Creator Info */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Avatar/Profile Section */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-white text-2xl md:text-3xl font-bold">AM</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ankrit Maity
              </h3>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                Passionate developer and AI enthusiast dedicated to creating intelligent solutions 
                that transform business communications. CodexCity represents the fusion of 
                cutting-edge AI technology with practical email automation needs.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* LinkedIn Button */}
                <motion.a
                  href="https://www.linkedin.com/in/ankrit-maity-6a37a6351/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-[#0077B5] hover:bg-[#005885] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>

                {/* Additional Info */}
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available for collaboration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">2025</div>
                <div className="text-sm text-gray-600 font-medium">Year of Innovation</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">AI-Powered</div>
                <div className="text-sm text-gray-600 font-medium">Smart Automation</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">Open Source</div>
                <div className="text-sm text-gray-600 font-medium">Community Driven</div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
            <blockquote className="text-lg md:text-xl italic text-gray-700 font-medium">
              "Technology should simplify complexity, not create it. CodexCity embodies this philosophy 
              by making AI-powered email automation accessible to everyone."
            </blockquote>
            <cite className="block mt-3 text-gray-500 font-semibold">— Ankrit Maity</cite>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
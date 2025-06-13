import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-16 py-8 text-center"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
        <Zap className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">
          Powered by <span className="text-blue-600 font-semibold">CodexCity</span>
        </span>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
        AI-powered email automation platform designed for modern businesses. 
        Transforming customer communications with intelligent automation.
      </p>
    </motion.footer>
  );
};
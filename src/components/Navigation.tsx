import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, MessageSquare, Settings, User, Zap } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'templates', label: 'Templates', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'profile', label: 'Profile', icon: User }
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-white shadow-lg rounded-2xl p-2 mb-8">
      <div className="flex justify-center space-x-1">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange(item.id)}
            className={`
              flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200
              ${activeTab === item.id
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden sm:inline">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
};
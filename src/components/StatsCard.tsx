import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
  loading?: boolean;
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50',
  green: 'from-green-500 to-green-600 text-green-600 bg-green-50',
  purple: 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50',
  orange: 'from-orange-500 to-orange-600 text-orange-600 bg-orange-50'
};

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, loading }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color].split(' ').slice(-2).join(' ')}`}>
          <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[3]}`} />
        </div>
        <div className={`w-12 h-2 bg-gradient-to-r ${colorClasses[color].split(' ').slice(0, 2).join(' ')} rounded-full`} />
      </div>
      
      <div className="space-y-2">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-600 font-medium">{title}</div>
          </>
        )}
      </div>
    </motion.div>
  );
};
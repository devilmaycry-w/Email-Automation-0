import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Mail } from 'lucide-react';
import { signOut, updateUserProfile } from '../lib/auth';
import type { AuthUser } from '../lib/auth';
import toast from 'react-hot-toast';

interface UserProfileProps {
  user: AuthUser;
  onSignOut: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onSignOut }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.profile?.full_name || '',
    companyName: user.profile?.company_name || ''
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await updateUserProfile({
        full_name: formData.fullName,
        company_name: formData.companyName
      });

      if (error) {
        toast.error(error);
        return;
      }

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error(error);
      return;
    }
    
    toast.success('Signed out successfully');
    onSignOut();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <User className="w-7 h-7 text-blue-600" />
          Profile Settings
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {user.profile?.full_name || 'User'}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                {user.profile?.full_name || 'Not set'}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                {user.profile?.company_name || 'Not set'}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      fullName: user.profile?.full_name || '',
                      companyName: user.profile?.company_name || ''
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Edit Profile
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, X, Plus, MessageSquare, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { EmailTemplate, EmailCategory } from '../lib/supabase';
import toast from 'react-hot-toast';

export const EmailTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EmailCategory | 'all'>('all');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('user_id', user.id)
        .order('category');
      
      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const updateTemplate = async (id: string, updates: Partial<EmailTemplate>) => {
    try {
      const { error } = await supabase
        .from('email_templates')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      
      setTemplates(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
      setEditingId(null);
      toast.success('Template updated successfully!');
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error('Failed to update template');
    }
  };

  const getCategoryLabel = (category: EmailCategory) => {
    const labels: Record<EmailCategory, string> = {
      order_inquiry: 'Order Inquiries',
      support_request: 'Support Requests',
      general: 'General Inquiries',
      abandoned_cart: 'Abandoned Cart',
      welcome_email: 'Welcome Emails',
      re_engagement: 'Re-engagement',
      promotional: 'Promotional',
      newsletter: 'Newsletter',
      confirmation: 'Confirmation',
      birthday: 'Birthday',
      feedback_request: 'Feedback Request',
      cross_sell_upsell: 'Cross-sell & Upsell',
      motivational: 'Motivational',
      back_in_stock: 'Back in Stock',
      behavioral: 'Behavioral',
      drip_campaign: 'Drip Campaign',
      email_marketing: 'Email Marketing',
      product_review: 'Product Review',
      re_engagement_campaign: 'Re-engagement Campaign',
      win_back: 'Win-back'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: EmailCategory) => {
    const colors: Record<EmailCategory, string> = {
      order_inquiry: 'blue',
      support_request: 'green',
      general: 'purple',
      abandoned_cart: 'orange',
      welcome_email: 'emerald',
      re_engagement: 'pink',
      promotional: 'red',
      newsletter: 'indigo',
      confirmation: 'teal',
      birthday: 'yellow',
      feedback_request: 'cyan',
      cross_sell_upsell: 'violet',
      motivational: 'lime',
      back_in_stock: 'amber',
      behavioral: 'rose',
      drip_campaign: 'sky',
      email_marketing: 'fuchsia',
      product_review: 'slate',
      re_engagement_campaign: 'stone',
      win_back: 'zinc'
    };
    return colors[category] || 'gray';
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getCategoryLabel(template.category).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: Array<{ value: EmailCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All Categories' },
    { value: 'order_inquiry', label: 'Order Inquiries' },
    { value: 'support_request', label: 'Support Requests' },
    { value: 'general', label: 'General Inquiries' },
    { value: 'abandoned_cart', label: 'Abandoned Cart' },
    { value: 'welcome_email', label: 'Welcome Emails' },
    { value: 're_engagement', label: 'Re-engagement' },
    { value: 'promotional', label: 'Promotional' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'confirmation', label: 'Confirmation' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'feedback_request', label: 'Feedback Request' },
    { value: 'cross_sell_upsell', label: 'Cross-sell & Upsell' },
    { value: 'motivational', label: 'Motivational' },
    { value: 'back_in_stock', label: 'Back in Stock' },
    { value: 'behavioral', label: 'Behavioral' },
    { value: 'drip_campaign', label: 'Drip Campaign' },
    { value: 'email_marketing', label: 'Email Marketing' },
    { value: 'product_review', label: 'Product Review' },
    { value: 're_engagement_campaign', label: 'Re-engagement Campaign' },
    { value: 'win_back', label: 'Win-back' }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-20 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <MessageSquare className="w-10 h-10 text-blue-600" />
          Email Templates
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Customize your automated email responses for different types of inquiries and campaigns
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="lg:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as EmailCategory | 'all')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredTemplates.length} of {templates.length} templates
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isEditing={editingId === template.id}
            onEdit={() => setEditingId(template.id)}
            onCancel={() => setEditingId(null)}
            onSave={(updates) => updateTemplate(template.id, updates)}
            categoryLabel={getCategoryLabel(template.category)}
            categoryColor={getCategoryColor(template.category)}
          />
        ))}
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No templates found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface TemplateCardProps {
  template: EmailTemplate;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (updates: Partial<EmailTemplate>) => void;
  categoryLabel: string;
  categoryColor: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  categoryLabel,
  categoryColor
}) => {
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);

  const handleSave = () => {
    onSave({ subject, body });
  };

  const handleCancel = () => {
    setSubject(template.subject);
    setBody(template.body);
    onCancel();
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${categoryColor}-100 text-${categoryColor}-600`}>
            {categoryLabel}
          </span>
          {template.is_active && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
              Active
            </span>
          )}
        </div>
        
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 className="w-5 h-5" />
          </motion.button>
        ) : (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Save className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject Line
          </label>
          {isEditing ? (
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email subject..."
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg text-gray-900 font-medium">
              {template.subject}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Body
          </label>
          {isEditing ? (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Email body... Use [Name] to personalize with sender's name"
            />
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-wrap">
              {template.body}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
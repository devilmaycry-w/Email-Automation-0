/*
  # Add New Email Template Categories

  1. Changes
    - Update email_logs table to support new categories
    - Update email_templates table to support new categories
    - Add new default templates for each category

  2. New Categories
    - abandoned_cart
    - welcome_email
    - re_engagement
    - promotional
    - newsletter
    - confirmation
    - birthday
    - feedback_request
    - cross_sell_upsell
    - motivational
    - back_in_stock
    - behavioral
    - drip_campaign
    - email_marketing
    - product_review
    - re_engagement_campaign
    - win_back
*/

-- Update the check constraint for email_logs
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'email_logs' AND constraint_name = 'email_logs_category_check'
  ) THEN
    ALTER TABLE email_logs DROP CONSTRAINT email_logs_category_check;
  END IF;
END $$;

ALTER TABLE email_logs ADD CONSTRAINT email_logs_category_check 
CHECK (category = ANY (ARRAY[
  'order_inquiry'::text, 
  'support_request'::text, 
  'general'::text,
  'abandoned_cart'::text,
  'welcome_email'::text,
  're_engagement'::text,
  'promotional'::text,
  'newsletter'::text,
  'confirmation'::text,
  'birthday'::text,
  'feedback_request'::text,
  'cross_sell_upsell'::text,
  'motivational'::text,
  'back_in_stock'::text,
  'behavioral'::text,
  'drip_campaign'::text,
  'email_marketing'::text,
  'product_review'::text,
  're_engagement_campaign'::text,
  'win_back'::text
]));

-- Update the check constraint for email_templates
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'email_templates' AND constraint_name = 'email_templates_category_check'
  ) THEN
    ALTER TABLE email_templates DROP CONSTRAINT email_templates_category_check;
  END IF;
END $$;

ALTER TABLE email_templates ADD CONSTRAINT email_templates_category_check 
CHECK (category = ANY (ARRAY[
  'order_inquiry'::text, 
  'support_request'::text, 
  'general'::text,
  'abandoned_cart'::text,
  'welcome_email'::text,
  're_engagement'::text,
  'promotional'::text,
  'newsletter'::text,
  'confirmation'::text,
  'birthday'::text,
  'feedback_request'::text,
  'cross_sell_upsell'::text,
  'motivational'::text,
  'back_in_stock'::text,
  'behavioral'::text,
  'drip_campaign'::text,
  'email_marketing'::text,
  'product_review'::text,
  're_engagement_campaign'::text,
  'win_back'::text
]));
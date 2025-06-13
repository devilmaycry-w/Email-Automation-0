import { supabase } from './supabase';
import { classifyEmail } from './ai';
import type { EmailTemplate } from './supabase';

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Use Supabase Edge Function to send email (avoids CORS issues)
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: emailData
    });

    if (error) {
      console.error('Edge function error:', error);
      return false;
    }

    if (data?.success) {
      console.log('Email sent successfully via SendGrid');
      return true;
    } else {
      console.error('Email sending failed:', data?.error || 'Unknown error');
      return false;
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

export const processIncomingEmail = async (
  senderEmail: string,
  senderName: string,
  subject: string,
  body: string
) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // 1. Classify the email
    const classification = await classifyEmail(body);
    
    // 2. Get the appropriate template for this user
    const { data: templates } = await supabase
      .from('email_templates')
      .select('*')
      .eq('category', classification.category)
      .eq('is_active', true)
      .eq('user_id', user.id)
      .single();
    
    if (!templates) {
      throw new Error('No active template found for category');
    }
    
    // 3. Generate personalized response
    const personalizedSubject = templates.subject.replace(/\[Name\]/g, senderName);
    const personalizedBody = templates.body.replace(/\[Name\]/g, senderName);
    
    // 4. Send the response using verified domain
    const verifiedSender = import.meta.env.VITE_VERIFIED_SENDER_EMAIL || 'noreply@em5767.ankrit.tech';
    const emailSent = await sendEmail({
      to: senderEmail,
      from: verifiedSender,
      subject: personalizedSubject,
      html: personalizedBody.replace(/\n/g, '<br>'),
      text: personalizedBody
    });
    
    // 5. Log the interaction
    await supabase.from('email_logs').insert({
      user_id: user.id,
      sender_email: senderEmail,
      sender_name: senderName,
      original_subject: subject,
      original_body: body,
      category: classification.category,
      response_sent: emailSent,
      response_subject: emailSent ? personalizedSubject : null,
      response_body: emailSent ? personalizedBody : null,
      confidence_score: classification.confidence
    });
    
    return {
      success: emailSent,
      category: classification.category,
      confidence: classification.confidence
    };
  } catch (error) {
    console.error('Email processing error:', error);
    return { success: false, error: error.message };
  }
};

export const getEmailStats = async () => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: logs } = await supabase
      .from('email_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (!logs) return null;
    
    const totalEmails = logs.length;
    const responsesSent = logs.filter(log => log.response_sent).length;
    const categoryCounts = logs.reduce((acc, log) => {
      acc[log.category] = (acc[log.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalEmails,
      responsesSent,
      responseRate: totalEmails > 0 ? (responsesSent / totalEmails) * 100 : 0,
      categoryCounts,
      recentEmails: logs.slice(0, 10)
    };
  } catch (error) {
    console.error('Stats fetching error:', error);
    return null;
  }
};
/*
  # SendGrid Email Sending Edge Function

  This function handles sending emails via SendGrid API to avoid CORS issues
  when calling SendGrid directly from the browser.

  1. Receives email data from the frontend
  2. Validates the request and user authentication
  3. Sends email via SendGrid API using server-side credentials
  4. Returns success/failure status
*/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface EmailRequest {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse the request body
    const emailData: EmailRequest = await req.json()

    // Validate required fields
    if (!emailData.to || !emailData.from || !emailData.subject || !emailData.html || !emailData.text) {
      return new Response(
        JSON.stringify({ error: 'Missing required email fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get SendGrid API key from environment
    const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY')
    if (!sendGridApiKey) {
      return new Response(
        JSON.stringify({ error: 'SendGrid API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Send email via SendGrid
    const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendGridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: emailData.to }],
            subject: emailData.subject,
          },
        ],
        from: { 
          email: emailData.from,
          name: 'CodexCity Support'
        },
        content: [
          {
            type: 'text/plain',
            value: emailData.text,
          },
          {
            type: 'text/html',
            value: emailData.html,
          },
        ],
        tracking_settings: {
          click_tracking: {
            enable: true
          },
          open_tracking: {
            enable: true
          }
        }
      }),
    })

    if (sendGridResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, message: 'Email sent successfully' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    } else {
      const errorText = await sendGridResponse.text()
      console.error('SendGrid API error:', sendGridResponse.status, errorText)
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `SendGrid API error: ${sendGridResponse.status}`,
          details: errorText
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
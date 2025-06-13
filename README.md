# CodexCity

CodexCity is a modern web app that empowers small businesses to automate their email communication. It makes it easy for users to send professional, personalized emails—like order confirmations, support replies, and notifications—without technical hassle.

### 🚀 Get Started with CodexCity Today!
Visit [CodexCity](https://codexcity.xpensive.me/) for more information.
--

## 🛠️ How Does CodexCity Work? (Step-by-Step Flow)

1. **User Onboards and Logs In**  
   Users sign up and log in through a simple, secure interface (using Supabase Auth). After logging in, they land on a clean, responsive dashboard.

2. **Connect SendGrid**  
   Users enter their SendGrid API key and (optionally) choose their verified sender/domain.  
   The app securely stores this information, allowing users to send emails through their own business domain or the project default one.

3. **Create and Manage Email Templates**  
   Users can create, edit, and save multiple email templates for common scenarios (e.g., order confirmation, support reply, general update).  
   Templates include fields for subject and body, with support for dynamic placeholders (like customer name or order number).

4. **Send Emails Effortlessly**  
   Users select a template, fill in recipient details, and send the email with a single click.  
   CodexCity uses the SendGrid API to deliver emails instantly and reliably.

5. **Track Email Activity**  
   Every sent email is logged in a Supabase database, including:
   - Recipient email  
   - Template used  
   - Timestamp  
   - Delivery status (success/failure)  
   Users can view their email history in the dashboard for transparency and compliance.

6. **Polished, Professional Experience**  
   The dashboard is styled with Tailwind CSS for a premium, modern look.  
   A “Powered by CodexCity” badge in the footer reinforces trust and brand identity.

## 💡 Why Do Users Need CodexCity?

- **Save Time**: Automates repetitive email tasks, so users don’t have to write the same messages over and over.  
- **Professionalism**: Ensures every email is branded, consistent, and sent from the user’s own domain.  
- **Reliability**: SendGrid integration means high deliverability and tracking—no more emails lost in spam.  
- **Simplicity**: No need to manage complex email servers or deal with Gmail’s complicated OAuth process.  
- **Centralized Management**: All templates, logs, and email activity are in one easy-to-use dashboard.

## 🚀 What Problems Does CodexCity Solve?

- **Manual, repetitive emailing**: Eliminates the need to copy-paste or retype common responses.  
- **Inconsistent branding**: Guarantees all outgoing emails look professional and on-brand.  
- **Deliverability issues**: Uses SendGrid’s infrastructure for best-in-class email delivery.  
- **Lack of visibility**: Provides a clear record of all outgoing communications for accountability and follow-up.

## 🏆 Who Benefits Most?

- Small business owners who want to automate customer communication.  
- Support teams needing quick, consistent replies.  
- E-commerce shops sending order updates and confirmations.  
- Anyone who wants to look professional and save time on email!

---
This project is licensed under the [MIT License](LICENSE).
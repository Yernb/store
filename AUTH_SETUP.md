# Admin Authentication Setup Guide

This guide will help you set up password authentication and OAuth providers (Google, GitHub) for the admin dashboard.

## Overview

The admin dashboard now requires authentication before access. Users can sign in using:
- Email and password
- Google OAuth
- GitHub OAuth

## Step 1: Enable Authentication in Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Providers** in the sidebar
4. Enable **Email** provider (should be enabled by default)

## Step 2: Set Up OAuth Providers

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application** as the application type
6. Add authorized redirect URIs:
   - `https://<your-project-ref>.supabase.co/auth/v1/callback`
   - For local development: `http://localhost:3000` (if needed)
7. Copy the **Client ID** and **Client Secret**
8. In Supabase Dashboard, go to **Authentication** → **Providers**
9. Enable **Google** provider
10. Paste your Google **Client ID** and **Client Secret**
11. Click **Save**

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the application details:
   - **Application name**: Furnish & Go Admin
   - **Homepage URL**: Your website URL (e.g., `https://yourdomain.com`)
   - **Authorization callback URL**: `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. Click **Register application**
5. Copy the **Client ID** and generate a **Client Secret**
6. In Supabase Dashboard, go to **Authentication** → **Providers**
7. Enable **GitHub** provider
8. Paste your GitHub **Client ID** and **Client Secret**
9. Click **Save**

## Step 3: Configure Redirect URLs

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add your site URL:
   - For production: `https://yourdomain.com`
   - For local development: `http://localhost:3000`
3. Add redirect URLs:
   - `https://yourdomain.com/admin`
   - `http://localhost:3000/admin` (for local development)

## Step 4: Create Admin User

**Important:** The admin dashboard only allows sign-in, not sign-up. Admin users must be created through the Supabase Dashboard to maintain security.

### Option A: Create User via Supabase Dashboard (Email/Password)

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **Authentication** → **Users**
3. Click **Add user** → **Create new user**
4. Enter the user's email and password
5. Click **Create user**
6. The user can now sign in at `/admin` using their email and password

### Option B: Create User via OAuth (First Time)

1. Navigate to `/admin` in your application
2. Click "Continue with Google" or "Continue with GitHub"
3. Complete the OAuth flow
4. The user will be automatically created and signed in
5. You can manage this user in Supabase Dashboard → **Authentication** → **Users**

## Step 5: Manage Admin Users

### View Users

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. You'll see all registered users

### Delete Users

1. In **Authentication** → **Users**
2. Click on a user
3. Click **Delete user** to remove them

### Reset Password

Users can reset their password by:
1. Going to the login page
2. Clicking "Forgot password?" (if implemented)
3. Or you can reset it manually in Supabase Dashboard

## Security Best Practices

1. **Enable Row Level Security (RLS)**: Make sure your database tables have RLS policies that restrict admin operations to authenticated users only.

2. **Use Strong Passwords**: Enforce password requirements in Supabase:
   - Go to **Authentication** → **Policies**
   - Configure password requirements

3. **Enable Email Confirmation**: 
   - Go to **Authentication** → **Settings**
   - Enable "Enable email confirmations"

4. **Limit Admin Access**: Consider creating a separate table or using Supabase's built-in user metadata to track which users are admins.

5. **Monitor Authentication Logs**:
   - Go to **Authentication** → **Logs**
   - Review failed login attempts and suspicious activity

## Troubleshooting

### OAuth Redirect Error

If you see "redirect_uri_mismatch" errors:
- Verify the redirect URI in your OAuth provider matches exactly: `https://<your-project-ref>.supabase.co/auth/v1/callback`
- Check that the redirect URL is configured in Supabase Dashboard

### User Not Redirected After OAuth

- Check that redirect URLs are configured in Supabase Dashboard
- Verify the redirect URL in the code matches your site URL

### Email Not Received

- Check spam folder
- Verify email confirmation is enabled in Supabase
- Check Supabase logs for email delivery issues

### Session Not Persisting

- Clear browser cookies and try again
- Check that `persistSession` is enabled in the Supabase client configuration

## Next Steps

- Set up admin-only RLS policies for database operations
- Implement role-based access control if you need multiple admin levels
- Add audit logging for admin actions
- Set up email notifications for admin activities


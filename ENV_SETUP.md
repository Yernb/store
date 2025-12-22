# Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
# Supabase Configuration
# Get these values from your Supabase project settings: https://app.supabase.com/project/_/settings/api

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For admin operations (server-side only)
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Configuration
# Get these values from your Stripe Dashboard: https://dashboard.stripe.com/apikeys

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## How to get your Supabase credentials:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select an existing one
3. Go to Settings → API
4. Copy the "Project URL" and "anon public" key
5. Paste them into your `.env.local` file

## How to get your Stripe credentials:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up for a free account or log in
3. Go to Developers → API keys
4. Copy the "Publishable key" for `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. Copy the "Secret key" for `STRIPE_SECRET_KEY` (click "Reveal test key" if in test mode)
6. Paste them into your `.env.local` file

**Note:** Make sure you're using test mode keys for development. Test card numbers:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)





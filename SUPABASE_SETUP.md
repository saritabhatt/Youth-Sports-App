# Supabase Cloud Storage Setup

This app uses Supabase for cloud data storage. Follow these steps to set it up.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click "New Project"
3. Choose a name (e.g., "the-long-game")
4. Set a database password (save this!)
5. Select a region close to your users
6. Click "Create new project" and wait for setup

## Step 2: Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to create the tables

## Step 3: Get Your API Keys

1. Go to **Settings** > **API** in your Supabase dashboard
2. Copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 4: Configure Netlify

1. Go to your Netlify dashboard
2. Select your site (long-game.netlify.app)
3. Go to **Site settings** > **Environment variables**
4. Add these variables:

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | Your Project URL |
| `VITE_SUPABASE_ANON_KEY` | Your anon/public key |

5. Go to **Deploys** and click "Trigger deploy" > "Deploy site"

## Step 5: Done!

Your app will now automatically:
- Save profiles to Supabase when created/updated
- Sync settings (weights, compare list) to the cloud
- Fall back to localStorage if Supabase is unavailable

## Local Development (Optional)

To test locally with Supabase:

1. Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

2. Run `npm run dev`

## How It Works

- **Anonymous users**: Each browser gets a unique ID stored in localStorage
- **Data sync**: Changes save to localStorage first (instant), then sync to Supabase
- **Offline support**: App works offline using localStorage, syncs when online
- **No login required**: Users don't need accounts (data linked to browser ID)

## Troubleshooting

**Data not syncing?**
- Check browser console for errors
- Verify environment variables are set correctly in Netlify
- Make sure the SQL schema was run successfully

**Lost data on new device?**
- Data is linked to browser ID, not user accounts
- To sync across devices, you'd need to add authentication (future feature)

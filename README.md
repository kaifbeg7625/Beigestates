# Beig Estates — Real Estate Website + Admin Panel

A full working website for Beig Estates with a public property listing
site and a password-protected admin panel to manage properties and leads.

**Stack:** Next.js (React) + Supabase (database + auth) + Vercel (hosting)

---

## What's Included

- Public website — hero, how-it-works, live property listings, contact form
- Enquiry form — submissions save directly to the database (not just WhatsApp)
- Admin panel at `/admin` — add/edit/delete properties, view and manage leads
- WhatsApp, call, and email contact options built in

---

## Setup — Do This Once

### 1. Create a free Supabase project
1. Go to [supabase.com](https://supabase.com) → Sign up → New Project
2. Wait ~2 minutes for it to provision
3. Go to **SQL Editor** → New Query → paste the entire contents of
   `supabase-schema.sql` (in this repo) → click **Run**
   This creates the `properties` and `leads` tables with sample data.
4. Go to **Settings → API** → copy:
   - `Project URL`
   - `anon public` key

### 2. Create your admin login
1. In Supabase, go to **Authentication → Users → Add User**
2. Enter your email and a password — this is what you'll use to log in
   at `/admin/login`

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **Add New Project** → import this repository
3. Before deploying, add these Environment Variables (from Step 1):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**

Your site will be live at `your-project-name.vercel.app` within a couple
of minutes. You can connect a custom domain later from the Vercel
dashboard (Settings → Domains).

---

## Using the Admin Panel

Go to `yoursite.com/admin/login` and sign in with the email/password you
created in Supabase Step 2.

- **Dashboard** — quick stats (total properties, total leads, new leads)
- **Properties** — add new listings with photo URL, price, location,
  bedrooms/bathrooms, status. Edit or delete anytime — changes reflect
  on the public site immediately.
- **Leads** — every enquiry form submission appears here automatically.
  Filter by status, update status (New → Contacted → Closed), click
  through to WhatsApp or call directly, delete spam entries.

---

## Local Development

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase values
npm run dev
```

Visit `http://localhost:3000`

# GhostNote

An anonymous messaging platform where users can share honest feedback, compliments, confessions, crushes, and secrets with friends - all while maintaining complete anonymity.

## Features

- **Anonymous Messaging**: Send messages without revealing your identity
- **Multiple Message Types**: Choose from confessions, compliments, crushes, or secrets
- **Unique Shareable Links**: Each user gets a personalized link to share with friends
- **Real-time Dashboard**: View all messages received with statistics
- **Cloud Storage**: All messages persist in Supabase, accessible from any device
- **No Authentication Required**: Simple username-based system - no passwords or emails needed
- **Message Management**: View, delete, and organize your messages
- **Beautiful UI**: Modern glass-morphism design with smooth animations

## How It Works

1. **Create Account**: Choose a username to generate your unique GhostNote link
2. **Share Link**: Share your link with friends via social media, email, or text
3. **Receive Messages**: Friends can send you anonymous messages without creating an account
4. **View Dashboard**: See all messages received, organized by type and date
5. **Manage**: Delete unwanted messages or keep them as memories

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide Icons** - Beautiful, consistent icons
- **shadcn/ui** - High-quality, accessible UI components

### Backend
- **Supabase** - PostgreSQL database with real-time capabilities
- **Row Level Security (RLS)** - Database-level security policies

### Deployment
- **Vercel** - Hosting and deployment platform

## Project Structure

```
ghostnote/
├── app/
│   ├── dashboard/          # User dashboard (view messages)
│   ├── u/[username]/       # Public message form for recipients
│   ├── login/              # User login page
│   ├── about/              # About page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── link-generator.tsx  # Create new username/link
│   ├── message-form.tsx    # Send anonymous message
│   ├── message-card.tsx    # Single message display
│   ├── message-list.tsx    # List of messages
│   ├── hero-section.tsx    # Home page hero
│   └── ui/                 # shadcn/ui components
├── hooks/
│   ├── useSBMessages.ts    # Fetch/manage messages from Supabase
│   ├── useUserData.ts      # User profile management
│   └── useMessages.ts      # Message operations
├── lib/
│   ├── supabase/
│   │   └── client.ts       # Supabase browser client
│   ├── supabase-storage.ts # Database operations
│   ├── storage.ts          # localStorage utilities
│   ├── helpers.ts          # Utility functions
│   └── constants.ts        # App constants
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/                 # Static assets
```

## Database Schema

### Users Table
```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Messages Table
```sql
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'confession',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Message Types**: `confession`, `compliment`, `crush`, `secret`

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm/pnpm
- Supabase account (free tier available)
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ghostnote
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

   Get these values from your Supabase project:
   - Go to Settings → API
   - Copy the Project URL and Anon Key

4. **Set up Supabase database**
   
   The database schema is already created. If you need to recreate it:
   - Run the migration in your Supabase SQL editor:
   ```sql
   -- Create users table
   CREATE TABLE IF NOT EXISTS public.users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     username TEXT NOT NULL UNIQUE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create messages table
   CREATE TABLE IF NOT EXISTS public.messages (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
     message_text TEXT NOT NULL,
     message_type TEXT NOT NULL DEFAULT 'confession',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

   -- Create RLS policies
   CREATE POLICY "Allow public to select users" ON public.users
     FOR SELECT USING (true);
   CREATE POLICY "Allow public to insert users" ON public.users
     FOR INSERT WITH CHECK (true);
   CREATE POLICY "Allow public to select messages" ON public.messages
     FOR SELECT USING (true);
   CREATE POLICY "Allow public to insert messages" ON public.messages
     FOR INSERT WITH CHECK (true);
   ```

5. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Users Creating Accounts
1. Visit the home page
2. Click "Create Your Link"
3. Enter a custom username or generate a random one
4. Get your unique shareable link
5. Copy and share with friends

### For Friends Sending Messages
1. Click the shareable link received from a friend
2. Select the message type (confession, compliment, crush, secret)
3. Write your anonymous message
4. Click "Send Message"
5. The message is delivered instantly to the recipient's dashboard

### Dashboard Features
- View all received messages
- See message statistics (total, by type)
- Delete unwanted messages
- Copy and share your link again
- Logout to switch accounts

## Key Features Explained

### Anonymous System
- No usernames revealed when sending messages
- Completely private and judgment-free
- Messages are associated with sender username only in database

### Message Types
- **Confession**: Admit something truthfully
- **Compliment**: Praise someone genuinely
- **Crush**: Express romantic feelings
- **Secret**: Share something private

### Real-time Sync
- Messages saved to Supabase immediately
- Accessible from any device
- Dashboard updates as new messages arrive

### Security
- Row Level Security enabled at database level
- No sensitive data exposed in frontend
- User data protected by Supabase authentication

## Deployment

### Deploy to Vercel

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy GhostNote"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Configure environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Your app is live!**
   - Share your deployment URL with friends
   - Start receiving anonymous messages

## Troubleshooting

### "Error creating user" or "User not found"
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Verify environment variables in Vercel Settings → Vars
- Restart the dev server or redeploy

### Messages not appearing
- Ensure Supabase database has the correct schema
- Check RLS policies are enabled
- Verify the recipient username exists in the database

### Styling looks different
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh the page (Ctrl+F5)
- Check Tailwind CSS is properly configured

## Performance Optimization

- Server-side rendering for fast initial loads
- Real-time database subscriptions (via Supabase)
- Optimized image loading
- CSS-in-JS with Tailwind for minimal bundle size
- Code splitting for faster page transitions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

If you encounter issues:
1. Check the Troubleshooting section
2. Review the console for error messages
3. Verify Supabase connection and environment variables
4. Open an issue on GitHub


---

**Happy Ghosting!** Share your authentic thoughts with GhostNote. 👻

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ParticlesBackground } from '@/components/particles-background'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'GhostNote - Anonymous Messages & Confessions',
  description:
    'Send and receive honest, anonymous messages. Share confessions, compliments, crushes, or secrets in a safe, judgment-free space.',
  keywords: [
    'anonymous',
    'messages',
    'feedback',
    'confessions',
    'private',
    'ghostnote',
  ],
  creator: 'GhostNote',

  // Logo / favicon
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },

  // Open Graph
  openGraph: {
    title: 'GhostNote - Anonymous Messages & Confessions',
    description:
      'Send and receive honest, anonymous messages anonymously.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'GhostNote Logo',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'GhostNote',
    description:
      'Send and receive honest, anonymous messages anonymously.',
    images: ['/logo.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#a78bfa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="bg-background"
      suppressHydrationWarning
    >
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ParticlesBackground />

          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth/context'
import { CartProvider } from '@/lib/store/cart'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Nozah Art | Kenyan Visual Artist',
  description: 'Discover the art of Nozah - tattoos, digital art, pen art, and contemporary pieces from Kenya. Book a session or shop original artwork.',
  keywords: ['tattoo artist', 'Kenya', 'Nairobi', 'digital art', 'pen art', 'contemporary art', 'African art'],
  authors: [{ name: 'Nozah' }],
  creator: 'Nozah',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Nozah Art | Kenyan Visual Artist',
    description: 'Discover tattoos, digital art, pen art, and contemporary pieces from Kenya.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

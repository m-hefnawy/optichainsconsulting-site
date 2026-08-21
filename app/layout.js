export const metadata = {
  title: 'OptiChains Consulting | Supply Chain Transformation & Decision Intelligence',
  description: 'OptiChains helps GCC organizations transform supply chain strategy, planning, inventory, procurement, logistics and ERP-enabled decision making.',
  metadataBase: new URL('https://optichainsconsulting.com'),
  alternates: { canonical: '/' },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'OptiChains Consulting',
    title: 'OptiChains Consulting | From operational complexity to confident decisions',
    description: 'Supply chain transformation, ERP advisory, analytics and optimization for organizations across the GCC.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'OptiChains Consulting' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OptiChains Consulting | From operational complexity to confident decisions',
    description: 'Supply chain transformation, ERP advisory, analytics and optimization for organizations across the GCC.',
    images: ['/og.png']
  }
};

export const viewport = { themeColor: '#0b2f33', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="stylesheet" href="/style.css" /></head>
      <body>{children}</body>
    </html>
  );
}

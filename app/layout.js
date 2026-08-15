export const metadata = {
  title: 'OptiChains Consulting | Supply Chain Transformation & Decision Intelligence',
  description: 'OptiChains helps GCC organizations transform supply chain strategy, planning, inventory, procurement, logistics and ERP-enabled decision making.',
  metadataBase: new URL('https://optichainsconsulting.com'),
  alternates: { canonical: '/' }
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

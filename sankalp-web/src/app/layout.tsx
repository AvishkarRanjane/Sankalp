import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import { WalletProvider } from '@/context/WalletContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { constructMetadata, generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-editorial',
});

export const metadata: Metadata = constructMetadata();

import AmbientCreativeBackground from '@/components/background/AmbientCreativeBackground';
import ConnectWalletModal from '@/components/modals/ConnectWalletModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en-IN" className={`${plusJakartaSans.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FCFAF6] text-[#1F2937] font-sans-modern selection:bg-amber-400/30 selection:text-amber-950 relative overflow-x-hidden">
        <AmbientCreativeBackground />
        <CurrencyProvider>
          <WalletProvider>
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
            <ConnectWalletModal />
          </WalletProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}

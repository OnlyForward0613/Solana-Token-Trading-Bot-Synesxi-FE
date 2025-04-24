import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../app/globals.css'; // Add this at the top

import { ApolloWrapper } from '@/lib/apollo-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeFi Dashboard',
  description: 'Token trading interface',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // params is a Promise
}) {
  // Await params before destructuring
  const { locale } = await params;

  return (
    <html lang={locale} style={{ textAlign: 'center', marginLeft: 'auto' }}>
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}

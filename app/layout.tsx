import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'BSV',
  description: 'BSV.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex min-h-screen w-full flex-col">
        {children}
        <Toaster />
      </body>
        <Analytics />
      </html>
    </ClerkProvider>
  );
}


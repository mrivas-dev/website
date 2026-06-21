import type { Metadata } from 'next';
import { OSProvider } from '@/lib/contexts/OSContext';
import { ThemeProvider } from '@/lib/contexts/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Terminal Portfolio',
  description: 'Adaptive terminal portfolio experience',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OSProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </OSProvider>
      </body>
    </html>
  );
}

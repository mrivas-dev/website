import type { Metadata, Viewport } from 'next';
import { OSProvider } from '@/lib/contexts/OSContext';
import { LocaleProvider } from '@/lib/contexts/LocaleContext';
import { ThemeProvider } from '@/lib/contexts/ThemeProvider';
import { DevToolbar } from '@/components/DevToolbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'MRivas Dev',
  description: 'Adaptive terminal portfolio experience',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
          <LocaleProvider>
            <ThemeProvider>{children}</ThemeProvider>
            <DevToolbar />
          </LocaleProvider>
        </OSProvider>
      </body>
    </html>
  );
}

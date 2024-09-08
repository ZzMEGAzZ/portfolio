import type { Metadata } from "next";
import { Kanit } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

import "@/styles/globals.css";

import StoreProvider from '@/redux/store-provider';
import AlertDialogModal from '@/components/interactive/AlertDialog';

const kanit = Kanit({
  subsets: ["latin", "thai"],
  display: 'swap',
    adjustFontFallback: true,
    style: 'normal',
    preload: true,
  weight: ["200", "300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: 'Florist',
  description: 'Florist',
  icons: [
    {
      url: '/favicon.ico',
      href: '/favicon.ico',
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" sizes='any' />

        <title>XxMEGAxX</title>
      </head>
      <body className={`${kanit.className} w-full h-full`}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <AlertDialogModal />
            <Toaster />

            <header>
            </header>


            <main className={`w-full h-full`}>
                {children}
            </main>


            <footer className="w-full h-full">         
            </footer>



          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

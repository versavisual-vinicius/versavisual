import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WaFloat from '@/components/WaFloat';

const righteous = localFont({
  src: './fonts/Righteous-Regular.ttf',
  variable: '--font-display',
  display: 'swap',
});

const outfit = localFont({
  src: [
    { path: './fonts/Outfit-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/Outfit-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Outfit-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Outfit-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/Outfit-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/Outfit-ExtraBold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = localFont({
  src: [
    { path: './fonts/DMSans-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/DMSans-LightItalic.ttf', weight: '300', style: 'italic' },
    { path: './fonts/DMSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/DMSans-Italic.ttf', weight: '400', style: 'italic' },
    { path: './fonts/DMSans-Medium.ttf', weight: '500', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'VERSAVISUAL | Fotografia, Vídeo e Storymaking para Marcas',
    template: '%s | VERSAVISUAL',
  },
  description:
    'Hub criativo audiovisual especializado em fotografia, vídeo, direção visual e storymaking para marcas, artistas, eventos, campanhas e experiências no Rio de Janeiro e em todo o Brasil.',
  metadataBase: new URL('https://versavisual.com.br'),
  openGraph: {
    siteName: 'VERSAVISUAL',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${righteous.variable} ${outfit.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <WaFloat />
      </body>
    </html>
  );
}

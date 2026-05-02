import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL('https://rielu.uniproject.jp/'),
  title: 'rielu | officialsite',
  description: '暁月りえるの公式サイトです！最新情報やGitHubなどを掲載しています！ ',
  openGraph: {
    url: 'https://rielu.uniproject.jp/',
    type: 'website',
    title: 'rielu | officialsite',
    description: '暁月りえるの公式サイトです！最新情報やGitHubなどを掲載しています！ ',
    images: [
      {
        url: 'https://rielu.uniproject.jp/img/ogp.png',
        width: 1200,
        height: 630,
        alt: 'rielu official site OGP image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nameko_simakaze',
  },
  icons: { // faviconのパスを修正 (publicディレクトリ直下からの相対パス)
    icon: '/img/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased font-sans bg-slate-950 text-slate-50">{children}</body>
    </html>
  );
}
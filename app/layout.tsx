import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BASE_URL = 'https://ynb-landing.vercel.app';

export const metadata: Metadata = {
  title: '법무법인 와이앤비 | Realize Your Best',
  description: '법무법인 와이앤비 — 전북 전주 소재. 민사·형사·이혼·행정·노동 등 다양한 분야의 전문 변호사팀이 최선의 결과를 실현해드립니다.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: '법무법인 와이앤비 | Realize Your Best',
    description: '전북 전주 소재 법무법인. 민사·형사·이혼·행정·노동 전문 변호사팀.',
    url: BASE_URL,
    siteName: '법무법인 와이앤비',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/logo-hero.png`,
        width: 280,
        height: 140,
        alt: '법무법인 와이앤비',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '법무법인 와이앤비 | Realize Your Best',
    description: '전북 전주 소재 법무법인. 민사·형사·이혼·행정·노동 전문 변호사팀.',
    images: [`${BASE_URL}/logo-hero.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: '법무법인 와이앤비',
  alternateName: 'Law Firm Y&B',
  description: '전북 전주 소재 법무법인. 민사·형사·이혼·행정·노동 등 다양한 분야의 전문 변호사팀.',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo-hero.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: '전주시',
    addressRegion: '전라북도',
    addressCountry: 'KR',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: '전라북도',
  },
  serviceType: ['민사소송', '형사사건', '이혼·가사', '행정소송', '노동사건'],
  employee: [
    { '@type': 'Person', name: '이한선', jobTitle: '변호사' },
    { '@type': 'Person', name: '양은지', jobTitle: '변호사' },
    { '@type': 'Person', name: '변지혜', jobTitle: '변호사' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

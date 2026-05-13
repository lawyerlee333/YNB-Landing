import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '법무법인 와이앤비 | Realize Your Best',
  description: '법무법인 와이앤비 — 전북 전주 소재. 민사·형사·이혼·행정·노동 등 다양한 분야의 전문 변호사팀이 최고의 결과를 실현해드립니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: '10rem 2rem 7rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 55% 55% at 50% 0%, rgba(37,99,168,.28) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 820 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          fontSize: '0.73rem', letterSpacing: '3.5px',
          color: 'rgba(255,255,255,.4)', marginBottom: '2rem',
          textTransform: 'uppercase', fontWeight: 500,
        }}>
          LAW FIRM Y&amp;B &nbsp;&mdash;&nbsp; JEONJU, KOREA
        </div>

        <Image
          src="/logo-hero.png"
          alt="법무법인 와이앤비"
          width={280} height={140}
          style={{ display: 'block', height: 140, width: 'auto', margin: '0 auto 2.5rem', filter: 'brightness(0) invert(1)', opacity: 0.95 }}
          priority
        />

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, color: 'white',
          lineHeight: 1.1, letterSpacing: '-0.5px',
          marginBottom: '0.6rem',
        }}>
          Realize <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,.65)' }}>Your</em> Best
        </h1>

        <div style={{
          width: 56, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)',
          margin: '1.5rem auto',
        }} />

        <p style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
          color: 'rgba(255,255,255,.52)',
          fontWeight: 300, letterSpacing: '0.5px',
          marginBottom: '3rem',
        }}>
          당신에게 최고의 결과를 실현해드립니다
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '5rem' }}>
          <Link href="/contact" style={{
            background: 'var(--steel)', color: 'white', fontWeight: 700,
            padding: '0.9rem 2.4rem', textDecoration: 'none', fontSize: '0.92rem',
            border: '1.5px solid var(--steel)', display: 'inline-block',
          }}>
            법률상담 신청하기
          </Link>
          <Link href="/team" style={{
            background: 'transparent', color: 'rgba(255,255,255,.8)',
            fontWeight: 500, padding: '0.9rem 2.4rem',
            textDecoration: 'none', fontSize: '0.92rem',
            border: '1.5px solid rgba(255,255,255,.28)', display: 'inline-block',
          }}>
            구성원 소개 보기
          </Link>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,.1)',
          paddingTop: '3rem',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          {[
            { num: '3', label: '대표변호사' },
            { num: '5+', label: '전문 업무분야' },
            { num: '7+', label: '년 이상 경력' },
            { num: '전주', label: '전북특별자치도' },
          ].map(({ num, label }) => (
            <div key={label} style={{ padding: '0 3rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,.1)' }}
              className="hero-metric">
              <span style={{
                display: 'block', fontSize: '2.1rem', fontWeight: 900,
                color: 'white', lineHeight: 1, marginBottom: '0.35rem',
                fontFamily: "'Playfair Display', serif",
              }}>{num}</span>
              <span style={{ fontSize: '0.77rem', color: 'rgba(255,255,255,.38)', letterSpacing: 1 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-metric:last-child { border-right: none; }
        @media (max-width: 480px) {
          .hero-metric { border-right: none !important; padding: 0 1.25rem; }
        }
        @media (max-width: 768px) {
          .hero-metric { padding: 0 1.5rem; }
        }
      `}</style>
    </section>
  );
}

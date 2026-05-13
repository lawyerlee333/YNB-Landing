import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/about',    label: '법인 소개' },
  { href: '/clients',  label: '상담 대상' },
  { href: '/practice', label: '업무분야' },
  { href: '/cases',    label: '성공사례' },
  { href: '/team',     label: '구성원' },
  { href: '/contact',  label: '연락처' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--navy)',
      borderTop: '1px solid rgba(255,255,255,.06)',
      padding: '3rem 2rem',
    }}>
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: '3rem', flexWrap: 'wrap',
      }}>
        <div>
          <Image src="/logo-hero.png" alt="법무법인 와이앤비" width={160} height={48}
            style={{ width: 'auto', height: 48, filter: 'brightness(0) invert(1)', opacity: 0.8, marginBottom: '1rem', display: 'block' }} />
          <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '0.82rem', lineHeight: 1.85 }}>
            전북특별자치도 전주시 덕진구 만성로 120 (만성동) 4층<br />
            Tel: 063-717-1112 &nbsp;|&nbsp; E-mail: ynblaw@naver.com
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              color: 'rgba(255,255,255,.3)', textDecoration: 'none',
              fontSize: '0.82rem', transition: 'color 0.25s ease',
            }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: 1160, margin: '0 auto',
        borderTop: '1px solid rgba(255,255,255,.07)',
        marginTop: '2rem', paddingTop: '1.5rem',
        color: 'rgba(255,255,255,.2)', fontSize: '0.78rem', textAlign: 'center',
      }}>
        &copy; 2025 법무법인 와이앤비 · All Rights Reserved.
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/about',    label: '법인 소개' },
  { href: '/team',     label: '구성원' },
  { href: '/clients',  label: '상담 대상' },
  { href: '/practice', label: '업무분야' },
  { href: '/cases',      label: '성공사례' },
  { href: '/legal-info', label: '법률정보' },
  { href: '/contact',    label: '연락처' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 2.5rem',
      background: 'var(--white)',
      borderBottom: '1px solid var(--gray-200)',
      boxShadow: scrolled ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
      transition: 'box-shadow 0.25s ease',
    }}>
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 80,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.png" alt="법무법인 와이앤비" width={120} height={52} style={{ width: 'auto', height: 52 }} priority />
        </Link>

        <nav style={{
          display: 'flex', alignItems: 'center', gap: '2.25rem',
        }} className="desktop-nav">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              color: pathname.startsWith(href) ? 'var(--navy)' : 'var(--gray-600)',
              fontWeight: pathname.startsWith(href) ? 700 : 500,
              fontSize: '0.855rem',
              letterSpacing: '0.2px',
              transition: 'color 0.25s ease',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" style={{
          background: 'var(--navy)',
          border: '1.5px solid var(--navy)',
          color: 'white', fontWeight: 600,
          padding: '0.48rem 1.2rem',
          fontSize: '0.82rem', textDecoration: 'none',
          whiteSpace: 'nowrap',
        }} className="nav-cta-btn">
          상담 신청
        </Link>

        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="메뉴 열기"
          className="hamburger-btn"
          style={{
            display: 'none', flexDirection: 'column', gap: 5,
            cursor: 'pointer', background: 'none', border: 'none', padding: 4,
          }}
        >
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--navy)' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--navy)' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--navy)' }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 80, left: 0, right: 0,
          background: 'var(--white)',
          padding: '1.5rem 2rem 2rem', zIndex: 998,
          borderTop: '1px solid var(--gray-200)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
        }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontSize: '1rem',
              color: pathname.startsWith(href) ? 'var(--navy)' : 'var(--gray-800)',
              fontWeight: pathname.startsWith(href) ? 700 : 400,
              textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .nav-cta-btn { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

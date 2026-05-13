'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface Tab {
  label: string;
  items: string[];
}

export interface MemberData {
  name: string;
  title: string;
  spec: string;
  phone?: string;
  email?: string;
  motto: string;
  intro: string;
  photo?: string;
  monogram?: string;
  tags: string[];
  tabs: Tab[];
  practiceAreas: string[];
}

export default function MemberProfile({ member }: { member: MemberData }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ background: 'var(--white)', minHeight: 'calc(100vh - 80px)', paddingTop: 80 }}>

      {/* ── 상단 히어로 배너 ── */}
      <div style={{
        background: 'var(--navy)',
        padding: '3rem 2rem 0',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* 빵 부스러기 */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '2rem' }}>
            <Link href="/team" style={{ color: 'rgba(255,255,255,.45)', fontSize: '0.8rem', textDecoration: 'none' }}>구성원</Link>
            <span style={{ color: 'rgba(255,255,255,.25)', fontSize: '0.8rem' }}>›</span>
            <span style={{ color: 'rgba(255,255,255,.7)', fontSize: '0.8rem' }}>{member.name} {member.title}</span>
          </div>

          <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {/* 사진 */}
            <div style={{
              width: 220, height: 280, flexShrink: 0,
              background: 'linear-gradient(155deg, #1a3560 0%, #2450a0 100%)',
              overflow: 'hidden',
              border: '3px solid rgba(255,255,255,.12)',
              position: 'relative',
            }}>
              {member.photo
                ? <img src={member.photo} alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                : (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: "'Noto Serif KR', serif",
                      fontSize: '5rem', fontWeight: 700,
                      color: 'rgba(255,255,255,.35)',
                    }}>{member.monogram}</span>
                  </div>
                )
              }
            </div>

            {/* 이름 / 직함 / 연락처 */}
            <div style={{ flex: 1, paddingBottom: '2.5rem', minWidth: 240 }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.7rem', letterSpacing: '3px', fontWeight: 700,
                  color: 'var(--steel-lt)', textTransform: 'uppercase',
                  border: '1px solid rgba(59,123,200,.5)',
                  padding: '0.2rem 0.7rem', marginBottom: '1rem',
                }}>{member.title || '사무국'}</span>
                <h1 style={{
                  fontFamily: "'Noto Serif KR', serif",
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  fontWeight: 700, color: 'white',
                  lineHeight: 1.2, marginBottom: '0.5rem',
                }}>{member.name}</h1>
                <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  {member.spec}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {member.tags.map(t => (
                    <span key={t} style={{
                      fontSize: '0.72rem', padding: '0.22rem 0.75rem',
                      border: '1px solid rgba(255,255,255,.2)',
                      color: 'rgba(255,255,255,.6)',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* 연락처 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {member.phone && (
                  <a href={`tel:${member.phone.replace(/-/g, '')}`} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    color: 'rgba(255,255,255,.65)', textDecoration: 'none', fontSize: '0.88rem',
                  }}>
                    <span style={{
                      width: 32, height: 32, background: 'rgba(255,255,255,.08)',
                      border: '1px solid rgba(255,255,255,.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                      </svg>
                    </span>
                    {member.phone}
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    color: 'rgba(255,255,255,.65)', textDecoration: 'none', fontSize: '0.88rem',
                  }}>
                    <span style={{
                      width: 32, height: 32, background: 'rgba(255,255,255,.08)',
                      border: '1px solid rgba(255,255,255,.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    {member.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 모토 / 소개 ── */}
      <div style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem' }}>
          <p style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: 'var(--navy)', fontWeight: 700,
            marginBottom: '1rem', lineHeight: 1.5,
          }}>
            &ldquo;{member.motto}&rdquo;
          </p>
          <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem', lineHeight: 1.9, maxWidth: 780 }}>
            {member.intro}
          </p>
        </div>
      </div>

      {/* ── 탭 섹션 ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
        {/* 탭 헤더 */}
        <div style={{
          display: 'flex', borderBottom: '2px solid var(--gray-200)',
          marginBottom: '2.5rem',
        }}>
          {member.tabs.map(({ label }, i) => (
            <button key={label} onClick={() => setActiveTab(i)} style={{
              padding: '1.1rem 2rem',
              fontSize: '0.9rem', fontWeight: activeTab === i ? 700 : 500,
              color: activeTab === i ? 'var(--navy)' : 'var(--gray-400)',
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: activeTab === i ? '2px solid var(--navy)' : '2px solid transparent',
              marginBottom: '-2px', transition: 'all 0.2s ease',
              fontFamily: "'Noto Sans KR', sans-serif",
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div style={{ minHeight: 220, paddingBottom: '3rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {member.tabs[activeTab]?.items.map((item, i) => (
              <li key={i} style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                fontSize: '0.93rem', color: 'var(--gray-800)', lineHeight: 1.7,
              }}>
                <span style={{
                  flexShrink: 0, width: 6, height: 6,
                  background: 'var(--steel)', borderRadius: '50%',
                  marginTop: '0.58rem',
                }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── 업무분야 ── */}
        {member.practiceAreas.length > 0 && (
          <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '3rem', paddingBottom: '4rem' }}>
            <h3 style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: '1.1rem', color: 'var(--navy)',
              marginBottom: '1.5rem',
            }}>주요 업무분야</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {member.practiceAreas.map(area => (
                <span key={area} style={{
                  padding: '0.5rem 1.2rem',
                  border: '1px solid var(--gray-200)',
                  background: 'var(--gray-50)',
                  fontSize: '0.85rem', color: 'var(--navy)',
                  fontWeight: 500,
                }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .member-hero-inner { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}

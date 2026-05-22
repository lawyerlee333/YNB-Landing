'use client';

import { useState } from 'react';
import FadeUp from '@/components/FadeUp';

export default function ContactPage() {
  const [tab, setTab] = useState<'info' | 'form'>('info');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      phone:   (form.elements.namedItem('phone')   as HTMLInputElement).value,
      area:    (form.elements.namedItem('area')    as HTMLSelectElement).value,
      content: (form.elements.namedItem('content') as HTMLTextAreaElement).value,
    };
    try {
      await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
    form.reset();
  }

  const tabStyle = (active: boolean) => ({
    padding: '0.85rem 2rem',
    fontSize: '0.9rem', fontWeight: active ? 700 : 500,
    color: active ? 'var(--navy)' : 'var(--gray-400)',
    background: 'none', border: 'none', cursor: 'pointer',
    borderBottom: active ? '2px solid var(--navy)' : '2px solid transparent',
    marginBottom: '-2px', transition: 'all 0.2s ease',
    fontFamily: "'Noto Sans KR', sans-serif",
  } as React.CSSProperties);

  return (
    <section className="page-section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <FadeUp>
          <div className="section-head">
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">법률상담 신청</h2>
            <div className="section-rule" />
            <p className="section-sub">지금 바로 연락주세요. 전문 변호사가 직접 상담해드립니다.</p>
          </div>
        </FadeUp>

        {/* 탭 헤더 */}
        <div style={{ borderBottom: '2px solid var(--gray-200)', marginBottom: '2.5rem' }}>
          <button style={tabStyle(tab === 'info')} onClick={() => setTab('info')}>오시는 길 &amp; 연락처</button>
          <button style={tabStyle(tab === 'form')} onClick={() => setTab('form')}>상담 신청</button>
        </div>

        {/* ── 탭 1: 오시는 길 & 연락처 ── */}
        {tab === 'info' && (
          <FadeUp>
            <div style={{ maxWidth: 680 }}>
              <h3 style={{ color: 'var(--navy)', marginBottom: '2rem', fontSize: '1.35rem', fontFamily: "'Noto Serif KR',serif" }}>
                오시는 길 &amp; 연락처
              </h3>

              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: 'var(--steel)', fill: 'none', strokeWidth: 1.8 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="none" fill="var(--steel)" />
                    </svg>
                  ),
                  label: '주소',
                  value: '전북특별자치도 전주시 덕진구 만성로 120, 4층 (만성동)',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: 'var(--steel)', fill: 'none', strokeWidth: 1.8 }}>
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="none" fill="var(--steel)" />
                    </svg>
                  ),
                  label: '전화',
                  value: '063-717-1112',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: 'var(--steel)', fill: 'none', strokeWidth: 1.8 }} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  label: '운영시간',
                  value: '평일 09:00 – 18:00\n토·일·공휴일 휴무 (사전 예약 시 상담 가능)',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: 'var(--steel)', fill: 'none', strokeWidth: 1.8 }} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: '이메일',
                  value: 'ynblaw@naver.com',
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="info-row">
                  <div className="info-icon-box">{icon}</div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--gray-400)', fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{label}</strong>
                    <span style={{ color: 'var(--gray-800)', fontSize: '0.92rem', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{value}</span>
                  </div>
                </div>
              ))}

              <hr className="contact-divider" />
              <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', lineHeight: 1.8 }}>
                상담 신청 후 담당 직원이 일정을 안내드립니다.
              </p>

              <button
                onClick={() => setTab('form')}
                style={{
                  marginTop: '2rem',
                  background: 'var(--navy)', color: 'white', border: 'none',
                  padding: '0.85rem 2rem', cursor: 'pointer',
                  fontSize: '0.9rem', fontWeight: 600,
                  fontFamily: "'Noto Sans KR',sans-serif",
                }}
              >
                상담 신청하기 →
              </button>
            </div>
          </FadeUp>
        )}

        {/* ── 탭 2: 상담 신청 ── */}
        {tab === 'form' && (
          <FadeUp>
            <div style={{ maxWidth: 640 }}>
              <h3 style={{ color: 'var(--navy)', marginBottom: '1.75rem', fontSize: '1.35rem', fontFamily: "'Noto Serif KR',serif" }}>
                상담 신청
              </h3>

              {submitted ? (
                <div style={{
                  padding: '3rem', textAlign: 'center',
                  border: '1px solid var(--gray-200)', background: 'white',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
                  <h3 style={{ color: 'var(--navy)', marginBottom: '0.5rem' }}>상담 신청이 완료되었습니다</h3>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    1영업일 이내에 담당자가 연락드리겠습니다.<br />
                    법무법인 와이앤비 (063-717-1112)
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      marginTop: '1.5rem', background: 'var(--navy)', color: 'white',
                      border: 'none', padding: '0.6rem 1.5rem', cursor: 'pointer',
                      fontSize: '0.85rem', fontFamily: "'Noto Sans KR',sans-serif",
                    }}
                  >
                    새 상담 신청
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">성함 <span style={{ color: 'var(--steel)' }}>*</span></label>
                      <input type="text" id="name" name="name" placeholder="홍길동" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">연락처 <span style={{ color: 'var(--steel)' }}>*</span></label>
                      <input type="tel" id="phone" name="phone" placeholder="010-0000-0000" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="area">상담 분야 <span style={{ color: 'var(--steel)' }}>*</span></label>
                    <select id="area" name="area" required>
                      <option value="">-- 선택해주세요 --</option>
                      <option>민사</option>
                      <option>형사</option>
                      <option>이혼·가사</option>
                      <option>행정·학교폭력</option>
                      <option>노동·산업재해</option>
                      <option>기타</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="content">상담 내용 (선택)</label>
                    <textarea id="content" name="content" placeholder="간략하게 상황을 적어주세요. 비밀이 철저히 보장됩니다." />
                  </div>

                  <button type="submit" className="btn-submit" disabled={submitting}>
                    {submitting ? '제출 중...' : '상담 신청하기'}
                  </button>
                  <p className="form-notice">* 접수 후 1영업일 이내 담당자가 연락드립니다. 개인정보는 상담 목적으로만 사용됩니다.</p>
                </form>
              )}
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

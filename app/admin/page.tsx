'use client';

import { useState } from 'react';

interface Consult {
  id: number;
  createdAt: string;
  name: string;
  phone: string;
  area: string;
  content: string;
}

export default function AdminPage() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setError('');
    const res = await fetch(`/api/consult?pw=${pw}`);
    if (res.ok) {
      const data = await res.json();
      setConsults(data);
      setAuthed(true);
    } else {
      setError('비밀번호가 틀렸습니다.');
    }
    setLoading(false);
  }

  async function refresh() {
    setLoading(true);
    const res = await fetch(`/api/consult?pw=${pw}`);
    if (res.ok) setConsults(await res.json());
    setLoading(false);
  }

  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--navy)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 80,
      }}>
        <div style={{
          background: 'white', padding: '3rem', width: '100%', maxWidth: 400,
        }}>
          <h2 style={{ fontFamily: "'Noto Serif KR',serif", color: 'var(--navy)', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
            상담 신청 게시판
          </h2>
          <p style={{ color: 'var(--gray-600)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>관리자 전용</p>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{
              width: '100%', padding: '0.75rem 1rem',
              border: '1px solid var(--gray-200)', marginBottom: '0.75rem',
              fontSize: '0.9rem', fontFamily: "'Noto Sans KR',sans-serif", outline: 'none',
            }}
          />
          {error && <p style={{ color: '#c0392b', fontSize: '0.82rem', marginBottom: '0.5rem' }}>{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            style={{
              width: '100%', background: 'var(--navy)', color: 'white',
              border: 'none', padding: '0.85rem', cursor: 'pointer',
              fontSize: '0.9rem', fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 600,
            }}
          >
            {loading ? '확인 중...' : '로그인'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 100, padding: '100px 2rem 4rem', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: "'Noto Serif KR',serif", color: 'var(--navy)', fontSize: '1.5rem' }}>
            상담 신청 게시판
          </h2>
          <p style={{ color: 'var(--gray-600)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            총 {consults.length}건
          </p>
        </div>
        <button
          onClick={refresh}
          style={{
            background: 'var(--navy)', color: 'white', border: 'none',
            padding: '0.5rem 1.2rem', cursor: 'pointer',
            fontSize: '0.82rem', fontFamily: "'Noto Sans KR',sans-serif",
          }}
        >
          새로고침
        </button>
      </div>

      {consults.length === 0 ? (
        <div style={{
          padding: '4rem', textAlign: 'center',
          border: '1px solid var(--gray-200)', color: 'var(--gray-400)',
        }}>
          아직 상담 신청이 없습니다.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {consults.map((c) => (
            <div key={c.id} style={{
              border: '1px solid var(--gray-200)',
              borderLeft: '3px solid var(--steel)',
              padding: '1.5rem',
              background: 'white',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{c.name}</span>
                  <span style={{ color: 'var(--gray-600)' }}>{c.phone}</span>
                  <span style={{
                    background: 'var(--gray-100)', padding: '0.1rem 0.6rem',
                    fontSize: '0.78rem', color: 'var(--steel)', fontWeight: 600,
                  }}>{c.area}</span>
                </div>
                <span style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>
                  {new Date(c.createdAt).toLocaleString('ko-KR')}
                </span>
              </div>
              {c.content && (
                <p style={{
                  color: 'var(--gray-700)', fontSize: '0.9rem', lineHeight: 1.7,
                  padding: '0.75rem', background: 'var(--gray-50)',
                  borderLeft: '2px solid var(--gray-200)', whiteSpace: 'pre-wrap',
                }}>
                  {c.content}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface StepItem { title: string; body: string }
interface TableRow { label: string; desc: string; tag?: string }
interface FaqItem { q: string; a: string }
interface LawRef { name: string; body: string }

interface RichSection {
  heading: string;
  type: 'text' | 'steps' | 'table' | 'dos_donts' | 'faq';
  body?: string;
  items?: StepItem[] | FaqItem[];
  rows?: TableRow[];
  dos?: string[];
  donts?: string[];
}

interface RichContent {
  intro?: string;
  highlight_box?: { title: string; body: string };
  sections?: RichSection[];
  law_refs?: LawRef[];
  closing?: string;
}

interface LegalPost {
  id: number;
  createdAt: string;
  keyword: string;
  title: string;
  content: string;
  image?: string;
}

function tryParseRich(content: string): RichContent | null {
  try {
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === 'object') return parsed as RichContent;
    return null;
  } catch {
    return null;
  }
}

function formatTitle(title: string) {
  // 이미 "법무법인 와이앤비"로 시작하면 구분자만 : 로 정규화
  if (title.startsWith('법무법인 와이앤비')) {
    return title.replace(/^법무법인 와이앤비\s*[:|]\s*/, '법무법인 와이앤비 : ');
  }
  return `법무법인 와이앤비 : ${title}`;
}

const PLACEHOLDER_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"><rect fill="#0d1f3c" width="400" height="225"/><text x="200" y="100" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="64">⚖</text><text x="200" y="148" text-anchor="middle" fill="rgba(255,255,255,0.25)" font-size="13" font-family="sans-serif">법무법인 와이앤비</text></svg>`)}`;

export default function LegalInfoPage() {
  const [posts, setPosts] = useState<LegalPost[]>([]);
  const [selected, setSelected] = useState<LegalPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const DEMO = [
      { id: 1, createdAt: '2026-06-29T00:00:00Z', keyword: '형사', title: '음주운전 처벌 기준과 대처 방법', content: '', image: '' },
      { id: 2, createdAt: '2026-06-28T00:00:00Z', keyword: '민사', title: '임대차 계약 해지 통보 방법', content: '', image: '' },
      { id: 3, createdAt: '2026-06-27T00:00:00Z', keyword: '가사', title: '이혼 시 재산분할 기준 완전 정리', content: '', image: '' },
      { id: 4, createdAt: '2026-06-26T00:00:00Z', keyword: '형사', title: '폭행죄와 상해죄의 차이점은?', content: '', image: '' },
      { id: 5, createdAt: '2026-06-25T00:00:00Z', keyword: '행정', title: '운전면허 취소 후 재취득 절차', content: '', image: '' },
      { id: 6, createdAt: '2026-06-24T00:00:00Z', keyword: '민사', title: '손해배상 청구 소멸시효 정리', content: '', image: '' },
    ];
    fetch('/api/legal-info')
      .then((r) => r.ok ? r.json() : Promise.resolve([]))
      .then((data) => setPosts(Array.isArray(data) && data.length > 0 ? data : DEMO))
      .catch(() => setPosts(DEMO))
      .finally(() => setLoading(false));
  }, []);

  const rich = selected ? tryParseRich(selected.content) : null;

  return (
    <>
      <style>{`
        .legal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .legal-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .legal-grid { grid-template-columns: 1fr; }
        }
        .legal-card {
          background: #fff;
          border: 1px solid var(--gray-200);
          cursor: pointer;
          transition: box-shadow var(--trans), transform var(--trans);
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .legal-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .legal-card-thumb {
          width: 100%;
          padding-bottom: 56.25%;
          position: relative;
          overflow: hidden;
          background: var(--navy);
          flex-shrink: 0;
        }
        .legal-card-thumb img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .legal-card:hover .legal-card-thumb img {
          transform: scale(1.04);
        }
        .legal-card-body {
          padding: 1.1rem 1.2rem 1.3rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .legal-card-keyword {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--steel);
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }
        .legal-card-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--navy);
          line-height: 1.5;
          flex: 1;
          margin-bottom: 0.8rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .legal-card-date {
          font-size: 0.73rem;
          color: var(--gray-400);
          margin-top: auto;
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '7rem 1.5rem 5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>
          법률정보
        </h1>
        <p style={{ color: 'var(--gray-600)', marginBottom: '2.5rem' }}>
          매일 업데이트되는 법률 이슈와 실무 정보를 확인하세요.
        </p>

        {loading && <p style={{ color: 'var(--gray-400)' }}>불러오는 중...</p>}
        {!loading && posts.length === 0 && (
          <p style={{ color: 'var(--gray-400)' }}>등록된 법률정보가 없습니다.</p>
        )}

        {selected ? (
          <article>
            <button
              onClick={() => setSelected(null)}
              style={{
                marginBottom: '1.5rem', background: 'none', border: '1px solid var(--gray-200)',
                padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit',
              }}
            >
              ← 목록으로
            </button>

            <div style={{ fontSize: '0.78rem', color: 'var(--steel)', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
              #{selected.keyword}
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.4 }}>
              {formatTitle(selected.title)}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginBottom: '1.8rem' }}>
              {new Date(selected.createdAt).toLocaleDateString('ko-KR')}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selected.image || PLACEHOLDER_SVG}
              alt={selected.title}
              style={{ width: '100%', maxHeight: 400, objectFit: 'cover', marginBottom: '2rem', display: 'block' }}
            />

            {rich ? (
              <div style={{ lineHeight: 1.85, color: 'var(--gray-800)' }}>
                {rich.intro && (
                  <p style={{ marginBottom: '1.8rem', whiteSpace: 'pre-wrap', fontSize: '1.02rem' }}>
                    {rich.intro}
                  </p>
                )}

                {rich.highlight_box && (
                  <div style={{
                    background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
                    borderLeft: '4px solid var(--navy)', padding: '1.2rem 1.4rem', marginBottom: '2rem',
                  }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '0.4rem' }}>
                      {rich.highlight_box.title}
                    </div>
                    <div style={{ fontSize: '0.92rem' }}>{rich.highlight_box.body}</div>
                  </div>
                )}

                {rich.sections && rich.sections.length > 0 && (
                  <nav style={{
                    border: '1px solid var(--gray-200)', padding: '1rem 1.3rem', marginBottom: '2.2rem',
                    background: '#fff',
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.6rem', color: 'var(--navy)' }}>
                      목차
                    </div>
                    <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
                      {rich.sections.map((s, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{s.heading}</li>
                      ))}
                    </ol>
                  </nav>
                )}

                {rich.sections?.map((section, idx) => (
                  <section key={idx} style={{ marginBottom: '2.4rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--navy)' }}>
                      {section.heading}
                    </h3>

                    {section.type === 'text' && section.body && (
                      <p style={{ whiteSpace: 'pre-wrap' }}>{section.body}</p>
                    )}

                    {section.type === 'steps' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        {(section.items as StepItem[] | undefined)?.map((step, i) => (
                          <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{
                              flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                              background: 'var(--navy)', color: 'white', fontSize: '0.8rem', fontWeight: 700,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              {i + 1}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{step.title}</div>
                              <div style={{ fontSize: '0.92rem', color: 'var(--gray-600)' }}>{step.body}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.type === 'table' && (
                      <div style={{ border: '1px solid var(--gray-200)' }}>
                        {(section.rows as TableRow[] | undefined)?.map((row, i) => (
                          <div key={i} style={{
                            display: 'flex', gap: '1rem', padding: '0.9rem 1.1rem',
                            borderBottom: i === (section.rows!.length - 1) ? 'none' : '1px solid var(--gray-200)',
                          }}>
                            {row.tag && (
                              <span style={{
                                flexShrink: 0, fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)',
                                border: '1px solid var(--navy)', padding: '0.15rem 0.5rem', height: 'fit-content',
                              }}>
                                {row.tag}
                              </span>
                            )}
                            <div>
                              <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{row.label}</div>
                              <div style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>{row.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.type === 'dos_donts' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ border: '1px solid #c8e6c9', background: '#f3faf4', padding: '1rem' }}>
                          <div style={{ fontWeight: 700, color: '#2e7d32', marginBottom: '0.5rem' }}>✔ 권장</div>
                          <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.88rem' }}>
                            {section.dos?.map((d, i) => <li key={i} style={{ marginBottom: '0.3rem' }}>{d}</li>)}
                          </ul>
                        </div>
                        <div style={{ border: '1px solid #ffcdd2', background: '#fdf4f4', padding: '1rem' }}>
                          <div style={{ fontWeight: 700, color: '#c62828', marginBottom: '0.5rem' }}>✕ 주의</div>
                          <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.88rem' }}>
                            {section.donts?.map((d, i) => <li key={i} style={{ marginBottom: '0.3rem' }}>{d}</li>)}
                          </ul>
                        </div>
                      </div>
                    )}

                    {section.type === 'faq' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {(section.items as FaqItem[] | undefined)?.map((f, i) => (
                          <details key={i} style={{ border: '1px solid var(--gray-200)', padding: '0.9rem 1.1rem' }}>
                            <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{f.q}</summary>
                            <p style={{ marginTop: '0.6rem', fontSize: '0.92rem', color: 'var(--gray-600)' }}>{f.a}</p>
                          </details>
                        ))}
                      </div>
                    )}
                  </section>
                ))}

                {rich.law_refs && rich.law_refs.length > 0 && (
                  <section style={{
                    marginBottom: '2rem', background: 'var(--gray-50)',
                    border: '1px solid var(--gray-200)', padding: '1.2rem 1.4rem',
                  }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.8rem' }}>관련 조문</h3>
                    {rich.law_refs.map((law, i) => (
                      <div key={i} style={{ marginBottom: '0.8rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{law.name}</div>
                        <div style={{ fontSize: '0.88rem', color: 'var(--gray-600)' }}>{law.body}</div>
                      </div>
                    ))}
                  </section>
                )}

                {rich.closing && (
                  <p style={{ whiteSpace: 'pre-wrap', borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem' }}>
                    {rich.closing}
                  </p>
                )}

                <div style={{
                  marginTop: '2.5rem', background: 'var(--navy)', color: 'white',
                  padding: '1.4rem 1.6rem', textAlign: 'center',
                }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>법무법인 와이앤비 상담 안내</div>
                  <div style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
                    지금 상황에 맞는 대응 방향이 궁금하시다면 편하게 상담 신청해주세요.
                  </div>
                  <a href="/contact" style={{
                    display: 'inline-block', background: 'white', color: 'var(--navy)',
                    fontWeight: 700, padding: '0.6rem 1.4rem', fontSize: '0.85rem', textDecoration: 'none',
                  }}>
                    상담 신청하기
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ lineHeight: 1.9, whiteSpace: 'pre-wrap', color: 'var(--gray-800)' }}>
                {selected.content}
              </div>
            )}
          </article>
        ) : (
          <div className="legal-grid">
            {posts.map((post) => (
              <button
                key={post.id}
                className="legal-card"
                onClick={() => setSelected(post)}
              >
                <div className="legal-card-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image || PLACEHOLDER_SVG} alt={post.title} />
                </div>
                <div className="legal-card-body">
                  <div className="legal-card-keyword">#{post.keyword}</div>
                  <div className="legal-card-title">{formatTitle(post.title)}</div>
                  <div className="legal-card-date">
                    {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

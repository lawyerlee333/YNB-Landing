'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  createdAt: string;
  keyword: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export default function LegalInfoPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/legal-info')
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="page-section" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Legal Information</span>
          <h2 className="section-title">법률정보</h2>
          <div className="section-rule" />
          <p className="section-sub">생활 속 법률 상식과 최신 법령 정보를 알기 쉽게 전달합니다.</p>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginTop: '3rem' }}>
            불러오는 중…
          </p>
        )}

        {!loading && posts.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', marginTop: '3rem' }}>
            등록된 법률정보가 없습니다.
          </p>
        )}

        {!loading && posts.length > 0 && !selected && (
          <div className="cases-grid">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelected(post)}
                style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%' }}
              >
                <div className="case-card" style={{ height: '100%', padding: 0, overflow: 'hidden' }}>
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: 180,
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  )}
                  <div style={{ padding: '1.25rem 1.5rem' }}>
                    <div className="case-header" style={{ padding: 0, marginBottom: '0.75rem' }}>
                      {post.keyword && (
                        <span className="case-badge">{post.keyword}</span>
                      )}
                      <span style={{ fontSize: '0.78rem', color: 'var(--gray-400)', marginLeft: 'auto' }}>
                        {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <h3 className="case-title">{post.title}</h3>
                    <p className="case-desc" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {post.content}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {selected && (
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <button
              onClick={() => setSelected(null)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--navy)', fontWeight: 600, fontSize: '0.9rem',
                marginBottom: '1.5rem', padding: 0, display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              ← 목록으로
            </button>
            <div className="case-card" style={{ padding: 0, overflow: 'hidden' }}>
              {selected.imageUrl && (
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  style={{ width: '100%', maxHeight: 360, objectFit: 'cover', display: 'block' }}
                />
              )}
              <div style={{ padding: '2rem 2.5rem' }}>
                <div className="case-header" style={{ padding: 0, marginBottom: '1rem' }}>
                  {selected.keyword && <span className="case-badge">{selected.keyword}</span>}
                  <span style={{ fontSize: '0.78rem', color: 'var(--gray-400)', marginLeft: 'auto' }}>
                    {new Date(selected.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1.5rem' }}>
                  {selected.title}
                </h2>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--gray-700)', whiteSpace: 'pre-wrap' }}>
                  {selected.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

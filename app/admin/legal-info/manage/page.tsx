'use client';

import { useEffect, useState } from 'react';

type Post = {
  id: number;
  createdAt: string;
  keyword: string;
  title: string;
  content: string;
  image: string;
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', marginBottom: 10,
  border: '1px solid #ddd', borderRadius: 6, fontSize: 13,
  fontFamily: "'Noto Sans KR', sans-serif",
};

export default function ManageLegalInfoPage() {
  const [secret, setSecret] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Post>>({});
  const [status, setStatus] = useState('');

  const login = async () => {
    setAuthError('');
    // PATCH with dummy id: 401=비밀번호 틀림, 404=비밀번호 맞음
    const res = await fetch('/api/legal-info', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, id: 0 }),
    });
    if (res.status === 401) { setAuthError('비밀번호가 틀렸습니다.'); return; }
    setAuthed(true);
  };

  const loadPosts = () => {
    fetch('/api/legal-info')
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]));
  };

  useEffect(() => { if (authed) loadPosts(); }, [authed]);

  const startEdit = (p: Post) => { setEditingId(p.id); setEditForm({ ...p }); };
  const cancelEdit = () => { setEditingId(null); setEditForm({}); };

  const saveEdit = async () => {
    if (editingId == null) return;
    setStatus('저장 중...');
    try {
      const res = await fetch('/api/legal-info', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, id: editingId, ...editForm }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus(`수정 실패: ${data.error || '오류'}`); return; }
      setStatus('수정 완료!');
      setEditingId(null);
      loadPosts();
    } catch { setStatus('네트워크 오류'); }
  };

  const deletePost = async (id: number, title: string) => {
    if (!confirm(`"${title.slice(0, 30)}..." 게시글을 삭제하시겠습니까?`)) return;
    setStatus('삭제 중...');
    try {
      const res = await fetch('/api/legal-info', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, id }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus(`삭제 실패: ${data.error || '오류'}`); return; }
      setStatus('삭제 완료!');
      loadPosts();
    } catch { setStatus('네트워크 오류'); }
  };

  if (!authed) {
    return (
      <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: 'var(--navy)' }}>관리자 인증</h1>
        <input
          type="password"
          placeholder="관리자 비밀번호"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && login()}
          style={inputStyle}
        />
        {authError && <p style={{ color: '#c33', fontSize: 13, marginBottom: 8 }}>{authError}</p>}
        <button
          onClick={login}
          style={{ padding: '10px 20px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', width: '100%' }}
        >
          입장
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 20px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)' }}>법률정보 관리</h1>
          <p style={{ color: '#888', marginTop: 4 }}>총 {posts.length}건</p>
        </div>
        <button onClick={loadPosts} style={{ padding: '8px 16px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
          새로고침
        </button>
      </div>

      {status && (
        <div style={{ marginBottom: 16, padding: '10px 14px', background: '#f5f5f5', borderRadius: 6, fontSize: 13 }}>
          {status}
        </div>
      )}

      {posts.length === 0 && <p style={{ color: '#888' }}>등록된 게시글이 없습니다.</p>}

      {posts.map((p) => (
        <div key={p.id} style={{ border: '1px solid #eee', borderLeft: '3px solid var(--steel)', borderRadius: 8, padding: 16, marginBottom: 12, background: 'white' }}>
          {editingId === p.id ? (
            <div>
              <label style={{ fontSize: 12, fontWeight: 600 }}>제목</label>
              <input value={editForm.title || ''} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} style={inputStyle} />
              <label style={{ fontSize: 12, fontWeight: 600 }}>키워드</label>
              <input value={editForm.keyword || ''} onChange={(e) => setEditForm({ ...editForm, keyword: e.target.value })} style={inputStyle} />
              <label style={{ fontSize: 12, fontWeight: 600 }}>본문</label>
              <textarea
                value={editForm.content || ''}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={10}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button onClick={saveEdit} style={{ padding: '8px 18px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>저장</button>
                <button onClick={cancelEdit} style={{ padding: '8px 18px', background: '#eee', border: 'none', borderRadius: 6, cursor: 'pointer' }}>취소</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 14 }}>
              {p.image && (
                <img src={p.image} alt="" style={{ width: 100, height: 65, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
                  #{p.id} · {p.createdAt?.slice(0, 10)} · 키워드: {p.keyword || '없음'}
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: 'var(--navy)' }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.content?.slice(0, 100)}...
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button onClick={() => startEdit(p)} style={{ padding: '5px 14px', background: '#f0f0f0', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>수정</button>
                  <button onClick={() => deletePost(p.id, p.title)} style={{ padding: '5px 14px', background: '#fee', color: '#c33', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>삭제</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

const CATEGORIES = ['형사', '민사', '손해배상', '이혼/상간', '가사', '행정', '기타'];

type CaseItem = {
  caseId: number;
  category: string;
  caseType: string;
  summary: string;
  strategy: string;
  result: string;
  image: string;
  createdAt: string;
};

export default function ManageCasesPage() {
  const [secret, setSecret] = useState('');
  const [authed, setAuthed] = useState(false);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<CaseItem>>({});
  const [status, setStatus] = useState('');

  const loadCases = () => {
    fetch('/api/cases')
      .then((res) => res.json())
      .then((data) => setCases(Array.isArray(data) ? data : []))
      .catch(() => setCases([]));
  };

  useEffect(() => { if (authed) loadCases(); }, [authed]);

  const startEdit = (c: CaseItem) => { setEditingId(c.caseId); setEditForm({ ...c }); };
  const cancelEdit = () => { setEditingId(null); setEditForm({}); };

  const saveEdit = async () => {
    if (editingId == null) return;
    setStatus('저장 중...');
    try {
      const res = await fetch(`/api/cases/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, ...editForm }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus(`수정 실패: ${data.error || '알 수 없는 오류'}`); return; }
      setStatus('수정 완료!');
      setEditingId(null);
      loadCases();
    } catch { setStatus('네트워크 오류가 발생했습니다.'); }
  };

  const deleteCase = async (caseId: number) => {
    if (!confirm(`사례 #${caseId}를 삭제하시겠습니까? 되돌릴 수 없습니다.`)) return;
    setStatus('삭제 중...');
    try {
      const res = await fetch(`/api/cases/${caseId}?secret=${encodeURIComponent(secret)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) { setStatus(`삭제 실패: ${data.error || '알 수 없는 오류'}`); return; }
      setStatus(`사례 #${caseId} 삭제 완료`);
      loadCases();
    } catch { setStatus('네트워크 오류가 발생했습니다.'); }
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 10px', marginBottom: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 13 };

  if (!authed) {
    return (
      <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>관리자 인증</h1>
        <input type="password" placeholder="관리자 비밀번호" value={secret} onChange={(e) => setSecret(e.target.value)} style={inputStyle} />
        <button onClick={() => setAuthed(true)} style={{ padding: '10px 20px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>입장</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>성공사례 관리</h1>
      <p style={{ color: '#888', marginBottom: 24 }}>총 {cases.length}건</p>

      {status && <div style={{ marginBottom: 16, padding: 10, background: '#f5f5f5', borderRadius: 6, fontSize: 14 }}>{status}</div>}

      {cases.map((c) => (
        <div key={c.caseId} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 12 }}>
          {editingId === c.caseId ? (
            <div>
              <label style={{ fontSize: 12, fontWeight: 600 }}>분야</label>
              <select value={editForm.category || ''} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} style={inputStyle}>
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <label style={{ fontSize: 12, fontWeight: 600 }}>사건 종류 / 제목</label>
              <input value={editForm.caseType || ''} onChange={(e) => setEditForm({ ...editForm, caseType: e.target.value })} style={inputStyle} />
              <label style={{ fontSize: 12, fontWeight: 600 }}>사건 개요</label>
              <textarea value={editForm.summary || ''} onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })} rows={3} style={inputStyle} />
              <label style={{ fontSize: 12, fontWeight: 600 }}>전략 및 대응</label>
              <textarea value={editForm.strategy || ''} onChange={(e) => setEditForm({ ...editForm, strategy: e.target.value })} rows={3} style={inputStyle} />
              <label style={{ fontSize: 12, fontWeight: 600 }}>결과</label>
              <textarea value={editForm.result || ''} onChange={(e) => setEditForm({ ...editForm, result: e.target.value })} rows={2} style={inputStyle} />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={saveEdit} style={{ padding: '8px 16px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>저장</button>
                <button onClick={cancelEdit} style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: 6, cursor: 'pointer' }}>취소</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 12 }}>
              {c.image && <img src={c.image} alt="" style={{ width: 100, height: 75, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#888' }}>#{c.caseId} · {c.category} · {c.createdAt?.slice(0, 10)}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{c.caseType}</div>
                <div style={{ fontSize: 13, color: '#555' }}>{c.summary?.slice(0, 80)}...</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button onClick={() => startEdit(c)} style={{ padding: '6px 14px', background: '#eee', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>수정</button>
                  <button onClick={() => deleteCase(c.caseId)} style={{ padding: '6px 14px', background: '#fee', color: '#c33', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>삭제</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {cases.length === 0 && <p style={{ color: '#888' }}>등록된 사례가 없습니다.</p>}
    </div>
  );
}

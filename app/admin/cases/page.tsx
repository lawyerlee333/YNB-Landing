// app/admin/cases/page.tsx
//
// 성공사례 등록용 관리자 폼. URL: /admin/cases

'use client';

import { useState } from 'react';

export default function AdminCasesPage() {
  const [secret, setSecret] = useState('');
  const [caseType, setCaseType] = useState('');
  const [summary, setSummary] = useState('');
  const [strategy, setStrategy] = useState('');
  const [result, setResult] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('등록 중...');

    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, caseType, summary, strategy, result, image }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(`실패: ${data.error || '알 수 없는 오류'}`);
        return;
      }

      setStatus(`등록 완료! caseId = ${data.caseId} (/cases/detail?caseId=${data.caseId})`);
      setCaseType('');
      setSummary('');
      setStrategy('');
      setResult('');
      setImage('');
    } catch (err) {
      setStatus('네트워크 오류가 발생했습니다.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    marginBottom: 16,
    border: '1px solid #ddd',
    borderRadius: 6,
    fontSize: 14,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 600,
    marginBottom: 6,
    fontSize: 14,
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 20px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        성공사례 등록
      </h1>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>관리자 비밀번호</label>
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>사건 종류</label>
        <input
          type="text"
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
          placeholder="예: 교통사고, 사기, 폭행 등"
          style={inputStyle}
          required
        />

        <label style={labelStyle}>사건 개요</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>법무법인 와이앤비의 전략 및 대응</label>
        <textarea
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          rows={5}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>결과</label>
        <textarea
          value={result}
          onChange={(e) => setResult(e.target.value)}
          rows={3}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>이미지 URL (선택)</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: '12px 24px',
            background: '#1a1a2e',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          등록하기
        </button>
      </form>

      {status && (
        <div style={{ marginTop: 20, padding: 12, background: '#f5f5f5', borderRadius: 6 }}>
          {status}
        </div>
      )}
    </div>
  );
}

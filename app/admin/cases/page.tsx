'use client';

import { useState } from 'react';

const CATEGORIES = ['형사', '민사', '손해배상', '이혼/상간', '가사', '행정', '기타'];

export default function AdminCasesPage() {
  const [secret, setSecret] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [caseType, setCaseType] = useState('');
  const [summary, setSummary] = useState('');
  const [strategy, setStrategy] = useState('');
  const [result, setResult] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!secret) {
      setStatus('먼저 관리자 비밀번호를 입력해주세요.');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setUploading(true);
      setStatus('이미지 업로드 중...');
      try {
        const res = await fetch('/api/cases/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret, imageBase64: base64 }),
        });
        const data = await res.json();
        if (!res.ok) {
          setStatus(`이미지 업로드 실패: ${data.error || '알 수 없는 오류'}`);
          setUploading(false);
          return;
        }
        setImage(data.url);
        setStatus('이미지 업로드 완료!');
      } catch {
        setStatus('이미지 업로드 중 네트워크 오류가 발생했습니다.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) {
      setStatus('이미지 업로드가 끝날 때까지 기다려주세요.');
      return;
    }
    setStatus('등록 중...');
    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, category, caseType, summary, strategy, result, image }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(`실패: ${data.error || '알 수 없는 오류'}`);
        return;
      }
      setStatus(`등록 완료! caseId = ${data.caseId} (/cases/detail?caseId=${data.caseId})`);
      setCaseType(''); setSummary(''); setStrategy(''); setResult(''); setImage(''); setImagePreview('');
    } catch {
      setStatus('네트워크 오류가 발생했습니다.');
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', marginBottom: 16, border: '1px solid #ddd', borderRadius: 6, fontSize: 14 };
  const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '60px 20px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>성공사례 등록</h1>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>관리자 비밀번호</label>
        <input type="password" value={secret} onChange={(e) => setSecret(e.target.value)} style={inputStyle} required />

        <label style={labelStyle}>분야</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label style={labelStyle}>사건 종류 / 제목</label>
        <input type="text" value={caseType} onChange={(e) => setCaseType(e.target.value)} placeholder="예: 교통사고 합의금 분쟁" style={inputStyle} required />

        <label style={labelStyle}>사건 개요</label>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={5} style={inputStyle} required />

        <label style={labelStyle}>법무법인 와이앤비의 전략 및 대응</label>
        <textarea value={strategy} onChange={(e) => setStrategy(e.target.value)} rows={5} style={inputStyle} required />

        <label style={labelStyle}>결과</label>
        <textarea value={result} onChange={(e) => setResult(e.target.value)} rows={3} style={inputStyle} required />

        <label style={labelStyle}>판결문 / 썸네일 이미지</label>
        <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: 12, display: 'block' }} />
        {imagePreview && (
          <img src={imagePreview} alt="미리보기" style={{ width: 200, borderRadius: 6, marginBottom: 16, border: '1px solid #ddd' }} />
        )}

        <button type="submit" disabled={uploading} style={{ padding: '12px 24px', background: uploading ? '#999' : '#1a1a2e', color: 'white', border: 'none', borderRadius: 6, fontSize: 15, cursor: uploading ? 'not-allowed' : 'pointer' }}>
          {uploading ? '이미지 업로드 중...' : '등록하기'}
        </button>
      </form>
      {status && <div style={{ marginTop: 20, padding: 12, background: '#f5f5f5', borderRadius: 6 }}>{status}</div>}
    </div>
  );
}

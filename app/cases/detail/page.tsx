// app/cases/detail/page.tsx
//
// 성공사례 상세페이지. URL: /cases/detail?caseId=866

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type CaseDetail = {
  caseId: number;
  caseType: string;
  summary: string;
  strategy: string;
  result: string;
  image: string;
  createdAt: string;
};

export default function CaseDetailPage() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get('caseId');

  const [data, setData] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!caseId) {
      setError('caseId가 없습니다.');
      setLoading(false);
      return;
    }

    fetch(`/api/cases/${caseId}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setError('해당 사례를 찾을 수 없습니다.'))
      .finally(() => setLoading(false));
  }, [caseId]);

  if (loading) {
    return <div style={{ padding: '60px 20px' }}>불러오는 중...</div>;
  }

  if (error || !data) {
    return <div style={{ padding: '60px 20px' }}>{error || '사례를 찾을 수 없습니다.'}</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>
        성공사례 #{data.caseId}
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        {data.caseType}
      </h1>

      {data.image && (
        <img
          src={data.image}
          alt={data.caseType}
          style={{ width: '100%', borderRadius: 8, marginBottom: 32 }}
        />
      )}

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>사건 개요</h2>
        <p style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{data.summary}</p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          법무법인 와이앤비의 전략 및 대응
        </h2>
        <p style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{data.strategy}</p>
      </section>

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>결과</h2>
        <p style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{data.result}</p>
      </section>
    </div>
  );
}

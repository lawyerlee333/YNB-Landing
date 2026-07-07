'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';

type DynamicCase = {
  caseId: number;
  category: string;
  caseType: string;
  summary: string;
  strategy: string;
  result: string;
  image: string;
  createdAt: string;
};

const TABS = ['전체', '형사', '민사', '손해배상', '이혼/상간', '가사', '행정', '기타'];

export default function CasesGrid({ legacyCases }: { legacyCases: any[] }) {
  const [dynamicCases, setDynamicCases] = useState<DynamicCase[]>([]);
  const [activeTab, setActiveTab] = useState('전체');

  useEffect(() => {
    fetch('/api/cases')
      .then((res) => res.json())
      .then((data) => setDynamicCases(Array.isArray(data) ? data : []))
      .catch(() => setDynamicCases([]));
  }, []);

  const filtered = activeTab === '전체'
    ? dynamicCases
    : dynamicCases.filter((c) => c.category === activeTab);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 18px',
              borderRadius: 20,
              border: activeTab === tab ? '1px solid #1a1a2e' : '1px solid #ddd',
              background: activeTab === tab ? '#1a1a2e' : 'white',
              color: activeTab === tab ? 'white' : '#333',
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="cases-grid">
        {filtered.map((c) => (
          <FadeUp key={c.caseId}>
            <Link href={`/cases/detail?caseId=${c.caseId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="case-card">
                {c.image ? (
                  <img src={c.image} alt={c.caseType} style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 6 }} />
                ) : (
                  <>
                    <div className="case-header">
                      <span className="case-badge">{c.category}</span>
                      <span className="case-result">{c.result}</span>
                    </div>
                    <div className="case-body">
                      <h3 className="case-title">{c.caseType}</h3>
                      <p className="case-desc">{c.summary}</p>
                    </div>
                  </>
                )}
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
          해당 분야의 사례가 아직 없습니다.
        </p>
      )}
    </div>
  );
}

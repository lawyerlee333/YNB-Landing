'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';

type LegacyCase = { badge: string; result: string; title: string; desc: string };
type DynamicCase = { caseId: number; caseType: string; summary: string; strategy: string; result: string; image: string; createdAt: string };

export default function CasesGrid({ legacyCases }: { legacyCases: LegacyCase[] }) {
  const [dynamicCases, setDynamicCases] = useState<DynamicCase[]>([]);

  useEffect(() => {
    fetch('/api/cases')
      .then((res) => res.json())
      .then((data) => setDynamicCases(Array.isArray(data) ? data : []))
      .catch(() => setDynamicCases([]));
  }, []);

  return (
    <div className="cases-grid">
      {dynamicCases.map((c) => (
        <FadeUp key={c.caseId}>
          <Link href={`/cases/detail?caseId=${c.caseId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="case-card">
              {c.image && (
                <img src={c.image} alt={c.caseType} style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 6, marginBottom: 12 }} />
              )}
              <div className="case-header">
                <span className="case-badge">{c.caseType}</span>
                <span className="case-result">{c.result}</span>
              </div>
              <div className="case-body">
                <h3 className="case-title">{c.caseType}</h3>
                <p className="case-desc">{c.summary}</p>
              </div>
            </div>
          </Link>
        </FadeUp>
      ))}
      {legacyCases.map(({ badge, result, title, desc }) => (
        <FadeUp key={title}>
          <div className="case-card">
            <div className="case-header">
              <span className="case-badge">{badge}</span>
              <span className="case-result">{result}</span>
            </div>
            <div className="case-body">
              <h3 className="case-title">{title}</h3>
              <p className="case-desc">{desc}</p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

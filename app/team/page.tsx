import Link from 'next/link';
import FadeUp from '@/components/FadeUp';

export const metadata = { title: '구성원 | 법무법인 와이앤비' };

const members = [
  { href: '/team/yang',   monogram: '양', name: '양은지', title: '대표변호사', spec: '부동산 · 감정평가 · 조합소송', tags: ['변호사', '감정평가사'] },
  { href: '/team/byun',   monogram: '변', name: '변지혜', title: '대표변호사', spec: '채권추심 · 민사소송',           tags: ['변호사', '채권추심 전문'] },
  { href: '/team/lee',    monogram: '이', name: '이한선', title: '대표변호사', spec: '행정법 · 손해배상',             tags: ['변호사', '행정법 전문', '손해배상 전문'], photo: 'https://cdn.lfind.kr/public/lfind/image/lawyerProfile/26879/378b0c07-ca6e-4a5b-83be-ad0021fb405c.png' },
  { href: '/team/office', monogram: '사', name: '사무국',  title: '',           spec: '법률사무 · 집행 전담',          tags: ['법률사무', '집행절차'] },
];

export default function TeamPage() {
  return (
    <section className="page-section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <FadeUp>
          <div className="section-head center">
            <span className="eyebrow">Our Team</span>
            <h2 className="section-title">구성원 소개</h2>
            <div className="section-rule center" />
            <p className="section-sub center">검증된 전문가들이 의뢰인의 사건을 직접 담당합니다.</p>
          </div>
        </FadeUp>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '2rem',
        }}>
          {members.map(({ href, monogram, name, title, spec, tags, photo }) => (
            <FadeUp key={href}>
              <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="team-card" style={{ cursor: 'pointer' }}>
                  <div className="team-portrait" style={photo ? { padding: 0, overflow: 'hidden' } : {}}>
                    {photo
                      ? <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                      : <div className="team-monogram">{monogram}</div>
                    }
                    {title && <div className="team-role-tag">{title}</div>}
                  </div>
                  <div className="team-info">
                    <div className="team-name">{name} {title && <span style={{ fontSize: '0.85rem', color: 'var(--gray-600)', fontWeight: 400 }}>{title}</span>}</div>
                    <div className="team-spec">{spec}</div>
                    <div className="team-quals">
                      {tags.map(t => <span key={t} className="qual-tag">{t}</span>)}
                    </div>
                    <div style={{
                      fontSize: '0.8rem', color: 'var(--steel)', fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      marginTop: '0.5rem',
                    }}>
                      자세히 보기 →
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

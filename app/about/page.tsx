import FadeUp from '@/components/FadeUp';

export const metadata = { title: '법인 소개 | 법무법인 와이앤비' };

const values = [
  { num: '01', title: '전문성', desc: '변호사 자격 외 감정평가사 자격까지 보유한 전문가, 행정법·손해배상·채권추심에 특화된 변호사들이 각 사건을 직접 담당합니다.' },
  { num: '02', title: '신뢰', desc: '의뢰인의 이익을 최우선으로, 진행 상황을 투명하게 공유하며 끝까지 함께하는 법률 파트너가 되겠습니다.' },
  { num: '03', title: '실현', desc: 'Realize Your Best — 최고의 결과를 현실로 만들기 위해 포기하지 않는 실행력으로 의뢰인과 함께합니다.' },
  { num: '04', title: '협력', desc: '다양한 분야의 전문성이 시너지를 이루어 민사·형사·행정·가사 등 복합적인 법률 문제를 원스톱으로 해결합니다.' },
];

export default function AboutPage() {
  return (
    <section className="page-section" style={{ background: 'var(--white)' }}>
      <div className="container">
        <FadeUp>
          <div className="section-head">
            <span className="eyebrow">Our Values</span>
            <h2 className="section-title">법무법인 와이앤비의 가치</h2>
            <div className="section-rule" />
            <p className="section-sub">
              감정평가사·행정법·채권추심 등 각기 다른 전문성을 지닌 대표변호사들이 모여
              의뢰인의 복잡한 법률 문제를 통합적으로 해결합니다.
            </p>
          </div>
        </FadeUp>

        <div className="values-grid">
          {values.map(({ num, title, desc }) => (
            <FadeUp key={num}>
              <div className="value-card">
                <span className="value-num">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div style={{
            marginTop: '5rem',
            background: 'var(--navy)',
            padding: '3rem 3.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
          }}>
            {[
              { num: '3', label: '대표변호사' },
              { num: '5+', label: '전문 업무분야' },
              { num: '7+', label: '년 이상 경력' },
              { num: '전주', label: '전북특별자치도 소재' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <span style={{
                  display: 'block', fontSize: '2.4rem', fontWeight: 900,
                  color: 'white', lineHeight: 1, marginBottom: '0.5rem',
                  fontFamily: "'Playfair Display', serif",
                }}>{num}</span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,.45)', letterSpacing: 1 }}>{label}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

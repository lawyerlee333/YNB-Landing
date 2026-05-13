import FadeUp from '@/components/FadeUp';

export const metadata = { title: '업무분야 | 법무법인 와이앤비' };

const categories = [
  {
    num: '01',
    title: '민사',
    desc: '개인 및 기업 간의 권리·의무 관계에서 발생하는 분쟁을 해결합니다.',
    items: ['민사소송', '손해배상', '건설분쟁', '부동산소송', '채권추심', '조합소송', '감정평가'],
  },
  {
    num: '02',
    title: '형사',
    desc: '피의자·피고인의 권리를 보호하고, 피해자의 정당한 구제를 지원합니다.',
    items: ['형사변호', '고소·고발', '무죄변론', '형사합의'],
  },
  {
    num: '03',
    title: '이혼 / 가사',
    desc: '가족 관계에서 발생하는 복잡한 법률 문제를 세심하게 해결합니다.',
    items: ['이혼소송', '재산분할', '양육권·친권', '상속분쟁', '유류분청구'],
  },
  {
    num: '04',
    title: '행정 / 학교폭력',
    desc: '행정기관의 처분에 맞서 의뢰인의 권익을 보호합니다.',
    items: ['행정소송', '행정심판', '징계불복', '학교폭력 심판', '면허·영업정지'],
  },
  {
    num: '05',
    title: '노동 / 산업재해',
    desc: '근로자의 정당한 권리를 지키고 적절한 보상을 받을 수 있도록 지원합니다.',
    items: ['부당해고', '임금체불', '산업재해', '근로기준법 위반', '직장 내 괴롭힘'],
  },
];

export default function PracticePage() {
  return (
    <section className="page-section" style={{ background: 'var(--gray-100)' }}>
      <div className="container">
        <FadeUp>
          <div className="section-head">
            <span className="eyebrow">Practice Areas</span>
            <h2 className="section-title">업무분야</h2>
            <div className="section-rule" />
            <p className="section-sub">민사에서 형사, 행정, 가사, 노동까지 — 와이앤비가 전 분야를 커버합니다.</p>
          </div>
        </FadeUp>

        <div className="practice-categories">
          {categories.map(({ num, title, desc, items }) => (
            <FadeUp key={num}>
              <div className="practice-cat-card">
                <span className="practice-cat-num">{num}</span>
                <span className="practice-cat-title">{title}</span>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>{desc}</p>
                <ul className="practice-cat-items">
                  {items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

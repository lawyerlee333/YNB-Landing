import FadeUp from '@/components/FadeUp';

export const metadata = { title: '상담 대상 | 법무법인 와이앤비' };

const clients = [
  { num: '01', title: '부동산·건설 분쟁', desc: '토지 보상 이의, 재개발·재건축 조합 분쟁, 부동산 계약 분쟁으로 어려움을 겪고 계신 분' },
  { num: '02', title: '채권·금전 분쟁', desc: '대여금, 투자사기, 보증채무 등으로 돈을 돌려받지 못하고 계신 개인 및 사업자' },
  { num: '03', title: '행정처분·징계 대응', desc: '면허 취소, 영업정지, 공무원 징계, 학교폭력위원회 처분에 억울하게 불복하고 싶은 분' },
  { num: '04', title: '가사·상속 분쟁', desc: '이혼, 양육권, 재산분할, 상속 분쟁 등 가족 문제로 법적 도움이 필요하신 분' },
  { num: '05', title: '노동·산재 피해', desc: '부당해고, 임금체불, 산업재해 등으로 권리를 침해받아 구제가 필요한 근로자' },
];

export default function ClientsPage() {
  return (
    <section className="page-section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <FadeUp>
          <div className="section-head center">
            <span className="eyebrow">Who We Help</span>
            <h2 className="section-title">이런 분들을 도와드립니다</h2>
            <div className="section-rule center" />
            <p className="section-sub center">복잡한 법률 문제 앞에서 혼자 고민하지 마세요. 와이앤비가 함께하겠습니다.</p>
          </div>
        </FadeUp>

        <div className="clients-grid">
          {clients.map(({ num, title, desc }) => (
            <FadeUp key={num}>
              <div className="client-card">
                <span className="client-num">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

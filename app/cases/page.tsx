import FadeUp from '@/components/FadeUp';
import CasesGrid from './CasesGrid';

export const metadata = { title: '성공사례 | 법무법인 와이앤비' };

const legacyCases = [
  { badge: '손해배상 · 보험', result: '승소', title: '공장 화재보험 계약 해지 및 채무 부존재 확인 소송 승소', desc: '화재 발생 후 보험계약의 해지 효력과 보험금 지급 채무 존부를 다툰 분쟁에서, 계약 조항의 해석 및 적법 절차 위반을 정밀하게 분석하여 의뢰인에게 유리한 채무 부존재 확인 판결을 획득하였습니다. (서울중앙지방법원, 2025)' },
  { badge: '금전 · 민사', result: '전액 인용', title: '개인 간 대여금 원금 및 지연손해금 청구 전부 인용', desc: '차용인이 원금 변제를 지속 거부한 대여금 분쟁에서, 차용 증거와 변제기한을 체계적으로 입증하여 원금 및 지연손해금 전액을 인정받는 판결을 이끌어냈습니다. (전주지방법원, 2023)' },
  { badge: '부동산 · 조합분쟁', result: '반환 판결', title: '지역주택조합 분담금 및 분양대금 반환 청구 승소', desc: '사업 지연 및 조합 운영 부실로 피해를 입은 조합원을 대리하여 기납부 분담금과 분양대금 전액 반환 청구 소송을 수행, 법원으로부터 반환 판결을 이끌어냈습니다. (전주지방법원, 2023)' },
  { badge: '세금 · 행정', result: '처분 취소', title: '위법한 과세처분 취소 행정소송 승소', desc: '세무당국의 과세처분에 대해 절차적 하자와 실체적 위법성을 집중 공략하여 행정소송을 제기, 처분 취소 판결을 이끌어냈습니다. 행정법 전문가로서의 경험이 뒷받침된 결과입니다.' },
  { badge: '행정 · 학교폭력', result: '처분 취소', title: '학교폭력 징계처분 행정심판 취소 인용', desc: '학교폭력대책심의위원회로부터 가중 처분을 받은 학생을 대리하여 비례원칙 위반과 절차상 하자를 근거로 행정심판을 제기, 처분 취소 결정을 이끌어냈습니다.' },
  { badge: '형사', result: '무죄', title: '억울한 형사 피의 사건 무죄 판결 획득', desc: '증거가 불충분한 상황에서 공소가 제기된 사건에서, 사실관계를 면밀히 분석하고 피의사실에 대한 체계적 반박을 통해 법원으로부터 무죄 판결을 이끌어냈습니다.' },
];

export default function CasesPage() {
  return (
    <section className="page-section" style={{ background: 'var(--white)' }}>
      <div className="container">
        <FadeUp>
          <div className="section-head">
            <span className="eyebrow">Success Cases</span>
            <h2 className="section-title">성공사례</h2>
            <div className="section-rule" />
            <p className="section-sub">의뢰인의 권리 회복을 위해 끝까지 함께한 결과입니다.</p>
          </div>
        </FadeUp>
        <CasesGrid legacyCases={legacyCases} />
      </div>
    </section>
  );
}

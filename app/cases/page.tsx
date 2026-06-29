import FadeUp from '@/components/FadeUp';
import CasesGrid from './CasesGrid';

export const metadata = { title: '성공사례 | 법무법인 와이앤비' };

// 기존에 직접 입력해둔 사례는 모두 제거됨.
// 이제부터는 /admin/cases에서 등록한 사례만 표시됩니다.
const legacyCases: { badge: string; result: string; title: string; desc: string }[] = [];

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

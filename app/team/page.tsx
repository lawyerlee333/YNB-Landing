import FadeUp from '@/components/FadeUp';
import Image from 'next/image';

export const metadata = { title: '구성원 | 법무법인 와이앤비' };

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

        <div className="team-grid">
          <FadeUp>
            <div className="team-card">
              <div className="team-portrait">
                <div className="team-monogram">양</div>
                <div className="team-role-tag">대표변호사</div>
              </div>
              <div className="team-info">
                <div className="team-name">양은지 변호사</div>
                <div className="team-spec">부동산 · 감정평가 · 조합소송</div>
                <div className="team-quals">
                  <span className="qual-tag">변호사</span>
                  <span className="qual-tag">감정평가사</span>
                </div>
                <ul className="career-list">
                  <li>감정평가 관련 소송 전문</li>
                  <li>재개발·재건축 조합 소송</li>
                  <li>부동산 소송</li>
                  <li>민사소송</li>
                </ul>
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="team-card">
              <div className="team-portrait">
                <div className="team-monogram">변</div>
                <div className="team-role-tag">대표변호사</div>
              </div>
              <div className="team-info">
                <div className="team-name">변지혜 변호사</div>
                <div className="team-spec">채권추심 · 민사소송</div>
                <div className="team-quals">
                  <span className="qual-tag">변호사</span>
                  <span className="qual-tag">채권추심 전문</span>
                </div>
                <ul className="career-list">
                  <li>채권추심 전문변호사</li>
                  <li>민사소송 다수 수행</li>
                  <li>금전·대여금 분쟁</li>
                  <li>보증채무 관련 사건</li>
                </ul>
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="team-card">
              <div className="team-portrait" style={{ padding: 0, overflow: 'hidden' }}>
                <Image
                  src="https://cdn.lfind.kr/public/lfind/image/lawyerProfile/26879/378b0c07-ca6e-4a5b-83be-ad0021fb405c.png"
                  alt="이한선 변호사"
                  width={260} height={190}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
                <div className="team-role-tag">대표변호사</div>
              </div>
              <div className="team-info">
                <div className="team-name">이한선 변호사</div>
                <div className="team-spec">행정법 · 손해배상</div>
                <div className="team-quals">
                  <span className="qual-tag">변호사</span>
                  <span className="qual-tag">행정법 전문</span>
                  <span className="qual-tag">손해배상 전문</span>
                </div>
                <ul className="career-list">
                  <li>전북대학교 법학전문대학원 졸업</li>
                  <li>전북특별자치도의회 고문변호사 (입법)</li>
                  <li>전주지방법원 국선변호인</li>
                  <li>전주시 덕진구 선거관리위원회 위원</li>
                  <li>학교폭력대책심의위원회 위원</li>
                  <li>여성가족부 성폭력피해자 법률지원 전문변호사</li>
                </ul>
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="team-card">
              <div className="team-portrait" style={{ background: 'linear-gradient(155deg, #2c3a4f 0%, #3d4f65 100%)' }}>
                <div className="team-monogram">이</div>
                <div className="team-role-tag staff">사무과장</div>
              </div>
              <div className="team-info">
                <div className="team-name">이상은 사무과장</div>
                <div className="team-spec">법률사무 · 집행 전담</div>
                <div className="team-quals">
                  <span className="qual-tag">법률사무</span>
                  <span className="qual-tag">집행절차</span>
                </div>
                <ul className="career-list">
                  <li>법률 집행 절차 전문</li>
                  <li>소송 서류 및 기일 관리</li>
                  <li>의뢰인 응대 및 사건 지원</li>
                  <li>법원 제출 서류 작성 보조</li>
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

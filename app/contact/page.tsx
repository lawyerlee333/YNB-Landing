'use client';

import FadeUp from '@/components/FadeUp';

export default function ContactPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    alert(`${name}님의 상담 신청이 완료되었습니다.\n1영업일 이내에 연락드리겠습니다.\n\n법무법인 와이앤비`);
    form.reset();
  }

  return (
    <section className="page-section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <FadeUp>
          <div className="section-head">
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">법률상담 신청</h2>
            <div className="section-rule" />
            <p className="section-sub">지금 바로 연락주세요. 전문 변호사가 직접 상담해드립니다.</p>
          </div>
        </FadeUp>

        <div className="contact-grid">
          <FadeUp>
            <div className="contact-info-block">
              <h3>오시는 길 &amp; 연락처</h3>

              <div className="info-row">
                <div className="info-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="none" fill="var(--steel)" />
                  </svg>
                </div>
                <div>
                  <strong>주소</strong>
                  <span>전북특별자치도 전주시 덕진구 만성로 120, 4층 (만성동)</span>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="none" fill="var(--steel)" />
                  </svg>
                </div>
                <div>
                  <strong>전화</strong>
                  <span>063-717-1112</span>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon-box">
                  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <strong>운영시간</strong>
                  <span>평일 09:00 – 18:00<br />토·일·공휴일 휴무 (사전 예약 시 상담 가능)</span>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon-box">
                  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <strong>이메일</strong>
                  <span>ynblaw@naver.com</span>
                </div>
              </div>

              <hr className="contact-divider" />
              <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', lineHeight: 1.8 }}>
                상담 신청 후 담당 직원이 일정을 안내드립니다.
              </p>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="form-panel">
              <h3>상담 신청</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">성함 <span style={{ color: 'var(--steel)' }}>*</span></label>
                    <input type="text" id="name" name="name" placeholder="홍길동" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">연락처 <span style={{ color: 'var(--steel)' }}>*</span></label>
                    <input type="tel" id="phone" name="phone" placeholder="010-0000-0000" required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="area">상담 분야 <span style={{ color: 'var(--steel)' }}>*</span></label>
                  <select id="area" name="area" required>
                    <option value="">-- 선택해주세요 --</option>
                    <option>민사</option>
                    <option>형사</option>
                    <option>이혼·가사</option>
                    <option>행정·학교폭력</option>
                    <option>노동·산업재해</option>
                    <option>기타</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="content">상담 내용 (선택)</label>
                  <textarea id="content" name="content" placeholder="간략하게 상황을 적어주세요. 비밀이 철저히 보장됩니다." />
                </div>

                <button type="submit" className="btn-submit">상담 신청하기</button>
                <p className="form-notice">* 접수 후 1영업일 이내 담당자가 연락드립니다.</p>
              </form>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

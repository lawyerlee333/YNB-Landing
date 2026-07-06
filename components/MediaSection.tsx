import Image from 'next/image';

const interviews = [
  {
    src: '/interview-jtv.png',
    station: 'JTV',
    stationColor: '#004B9B',
    attorney: '양은지 변호사',
    topic: '분양가 결정 법률 해설',
    desc: '민간 임대아파트 분양 전환 과정의 법적 쟁점에 대해 JTV 8뉴스에서 전문가 코멘트를 맡았습니다.',
  },
  {
    src: '/interview-mbc.png',
    station: 'MBC 스트레이트',
    stationColor: '#C8102E',
    attorney: '이한선 변호사',
    topic: '교제폭력 피해자 변호',
    desc: '범죄 피해자 보호 사건을 수임하여 MBC 탐사보도 프로그램 스트레이트에 출연, 피해자의 입장을 대변했습니다.',
  },
];

export default function MediaSection() {
  return (
    <section style={{ background: 'var(--gray-50)', padding: '7rem 2rem 6rem' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* 섹션 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="eyebrow">MEDIA</span>
          <h2 className="section-title" style={{ color: 'var(--navy)' }}>
            언론이 주목한 와이앤비
          </h2>
          <div className="section-rule center" />
          <p className="section-sub center" style={{ marginTop: '1rem' }}>
            방송사의 법률 전문가 섭외 요청에 응해 사건의 사회적 의미를 함께 전달합니다.
          </p>
        </div>

        {/* 카드 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {interviews.map(({ src, station, stationColor, attorney, topic, desc }) => (
            <div key={station} style={{
              background: 'white',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* 썸네일 */}
              <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                <Image
                  src={src}
                  alt={`${station} ${attorney} 인터뷰`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* 카드 본문 */}
              <div style={{ padding: '1.75rem 1.75rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{
                    background: stationColor,
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    padding: '3px 10px',
                    borderRadius: 2,
                  }}>
                    {station}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--gray-600)', fontWeight: 500 }}>
                    {attorney}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  margin: 0,
                }}>
                  {topic}
                </h3>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--gray-600)',
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import MemberProfile from '@/components/MemberProfile';

export const metadata = { title: '이한선 대표변호사 | 법무법인 와이앤비' };

const data = {
  name: '이한선',
  title: '대표변호사',
  spec: '행정법 · 손해배상',
  phone: '063-717-1112',
  email: 'ynblaw@naver.com',
  photo: 'https://cdn.lfind.kr/public/lfind/image/lawyerProfile/26879/378b0c07-ca6e-4a5b-83be-ad0021fb405c.png',
  motto: '행정의 위법에 맞서 시민의 권리를 지켜드립니다.',
  intro: '이한선 변호사는 행정법 및 손해배상 분야 전문가로, 전북특별자치도의회 고문변호사(입법), 전주지방법원 국선변호인, 학교폭력대책심의위원회 위원 등을 역임하며 다양한 공공·법률 분야에서 전문성을 쌓아왔습니다. 행정기관의 위법한 처분에 맞서 의뢰인의 권리를 적극적으로 옹호하며, 학교폭력·징계 처분 불복 사건과 손해배상 청구에 강점을 보입니다.',
  tags: ['변호사', '행정법 전문', '손해배상 전문'],
  tabs: [
    {
      label: '학력',
      items: [
        '전북대학교 법학전문대학원 졸업 (법학전문석사)',
      ],
    },
    {
      label: '경력',
      items: [
        '법무법인 와이앤비 대표변호사 (현)',
        '전북특별자치도의회 고문변호사 (입법)',
        '전주지방법원 국선변호인',
        '전주시 덕진구 선거관리위원회 위원',
        '학교폭력대책심의위원회 위원',
        '여성가족부 성폭력피해자 법률지원 전문변호사',
      ],
    },
    {
      label: '주요 실적',
      items: [
        '공장 화재보험 채무 부존재 확인 소송 승소 (서울중앙지방법원, 2025)',
        '학교폭력 징계처분 행정심판 취소 인용',
        '위법한 과세처분 취소 행정소송 승소',
        '억울한 형사 피의 사건 무죄 판결 획득',
        '손해배상 청구 다수 승소',
      ],
    },
  ],
  practiceAreas: ['행정소송', '행정심판', '학교폭력', '징계불복', '손해배상', '형사변호', '국가배상', '과세처분 취소'],
};

export default function LeePage() {
  return <MemberProfile member={data} />;
}

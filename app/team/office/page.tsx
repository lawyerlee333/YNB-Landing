import MemberProfile from '@/components/MemberProfile';

export const metadata = { title: '사무국 | 법무법인 와이앤비' };

const data = {
  name: '이상은',
  title: '사무과장',
  spec: '법률사무 · 집행 전담',
  phone: '063-717-1112',
  email: 'ynblaw@naver.com',
  monogram: '이',
  motto: '의뢰인이 편안하게 사건을 맡길 수 있도록 지원합니다.',
  intro: '이상은 사무과장은 법률 집행 절차 전문가로, 법무법인 와이앤비의 행정·사무 업무 전반을 담당합니다. 소송 서류 작성 보조, 기일 관리, 법원 제출 서류 준비, 강제집행 절차 지원 등 의뢰인이 원활하게 법률 서비스를 이용할 수 있도록 최전선에서 지원합니다. 친절하고 신속한 응대로 의뢰인의 불안을 줄이고, 사건 진행이 매끄럽게 이루어지도록 최선을 다합니다.',
  tags: ['법률사무', '집행절차'],
  tabs: [
    {
      label: '담당 업무',
      items: [
        '법률 집행 절차 전문 지원',
        '소송 서류 및 기일 관리',
        '의뢰인 응대 및 사건 안내',
        '법원 제출 서류 작성 보조',
        '강제집행·가압류·가처분 절차 지원',
        '법원·등기소·공공기관 제반 업무 처리',
      ],
    },
    {
      label: '안내 사항',
      items: [
        '평일 09:00 ~ 18:00 운영',
        '방문 상담 사전 예약 안내',
        '서류 접수 및 발송 대행',
        '상담 후 후속 절차 안내',
      ],
    },
  ],
  practiceAreas: ['집행절차', '서류관리', '기일관리', '의뢰인 응대', '법원업무'],
};

export default function OfficePage() {
  return <MemberProfile member={data} />;
}

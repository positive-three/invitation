/** 청첩장 문구·일정 — 필요에 따라 수정하세요 */
export const invite = {
  meta: {
    title: '손경섭♥윤예은 결혼합니다',
  },
  music: {
    // public/audio 폴더에 mp3를 넣고 이 경로를 맞춰주세요. 예: public/audio/bgm.mp3 -> '/audio/bgm.mp3'
    src: './audio/bgm.mp3',
  },
  hero: {
    dateLine: '2026. 09. 12.',
    groom: '손경섭',
    bride: '윤예은',
  },
  mainPhoto: {
    alt: '메인 사진',
    // 실제 이미지 경로: public 폴더에 두고 '/photo.jpg' 형태로 지정
    src: './images/main.jpg',
  },
  ceremony: {
    line1: '2026년 9월 12일 토요일 오전 11시 30분',
    line2: '샤펠드미앙 인천 남동구 정각로 10 1층만',
  },
  inviteText: {
    heading: '초대합니다',
    paragraphs: [
      '저희 두 사람이 새로운 인생을',
      '시작하는 첫 날을',
      '함께 해주셔서 감사합니다.',
      '예쁘게 열심히 살아가는 모습으로',
      '여러분의 축하에 보답하겠습니다.',
    ],
  },
  calendar: {
    year: 2026,
    month: 9,
    weddingDay: 12,
  },
  weddingDateTime: '2026-09-12T11:30:00',
  gallery: {
    heading: '우리들의 사진',
    moreLabel: '더보기',
  },
  rsvp: {
    heading: '참석 의사',
    submit: '참석의사 전달하기',
  },
  accounts: {
    heading: '마음 전하실 곳',
    groomSide: '신랑측 계좌번호',
    brideSide: '신부측 계좌번호',
    groom: [
      { name: '신랑', bank: '농협', number: '000-0000-0000-00' },
      { name: '신랑 아버지', bank: '농협', number: '000-0000-0000-00' },
      { name: '신랑 어머니', bank: '농협', number: '000-0000-0000-00' },
    ],
    bride: [
      { name: '신부', bank: '농협', number: '000-0000-0000-00' },
      { name: '신부 아버지', bank: '농협', number: '000-0000-0000-00' },
      { name: '신부 어머니', bank: '농협', number: '000-0000-0000-00' },
    ],
  },
  directions: {
    heading: '오시는 길',
    venueName: '샤펠드미앙',
    address: '인천 남동구 정각로 10 1층만',
    bullets: [
      '주차 및 셔틀버스 안내는 예식 당일 공지 예정입니다.',
      '주소: 인천 남동구 정각로 10 (1층만)',
    ],
    mapLinks: [
      { label: '네이버맵', href: 'https://map.naver.com' },
      { label: '카카오맵', href: 'https://map.kakao.com' },
      { label: '티맵', href: 'https://tmap.co.kr' },
    ],
  },
  footer: {
    share: '카카오톡 공유하기',
    copy: '손경섭♥윤예은 올림.',
  },
};

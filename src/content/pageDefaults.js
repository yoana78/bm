// 관리자 페이지에서 고칠 수 있는 "페이지 문구/이미지" 목록입니다.
//
// 이 파일 하나가 두 가지 역할을 합니다.
//   1) 각 페이지가 화면에 뿌릴 기본 문구(= 지금 사이트에 나가고 있는 값)
//   2) 관리자 페이지 입력 폼을 자동으로 만들어주는 설계도
// 그래서 여기에 항목을 추가하면 화면과 관리자 입력칸이 같이 생깁니다.
//
// 필드 옵션
//   type: 'text'(한 줄) | 'textarea'(여러 줄, 엔터 줄바꿈 그대로 반영) | 'image'
//   size: 화면에 나가는 글자 크기 — 입력칸 옆에 표시해서, 크기가 다른 문구를
//         같은 칸에 섞어 넣지 않도록 안내하는 용도
//   koOnly: true면 영문 입력칸을 만들지 않음 (원래부터 언어 구분 없이 영문으로만 나가는 문구)
//   width/height: 이미지 권장 해상도. 업로드 시 이 비율로 자동 크롭됨

export const PAGE_SCHEMA = {
  home: {
    label: '홈',
    sections: [
      {
        label: '메인 상단 (히어로 슬라이드 위 문구)',
        note: '배경 사진은 "사이트 설정" 탭의 히어로 이미지에서 바꿉니다.',
        fields: [
          { key: 'heroEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.85rem', koOnly: true, ko: 'Respect for Pet Life' },
          { key: 'heroTitle', label: '큰 제목', type: 'textarea', size: '2.1rem', ko: '존중은 아주 작고 사소한 것에서부터 시작됩니다', en: 'Respect begins with small and thoughtful care.' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '1rem', ko: '(주)부명은 반려동물의 생명과 건강을 존중하는 정직한 품질로 펫 헬스케어의 미래를 열어갑니다.', en: '(주)BOOMYUNG creates a healthier future for pets through uncompromised quality and transparent craftsmanship.' },
          { key: 'heroButton', label: '버튼 문구', type: 'text', size: '0.85rem', ko: '기업 소개 자세히 보기', en: 'MORE ABOUT BOOMYUNG' },
        ],
      },
      {
        label: '품질 비전 섹션',
        note: '배경 사진은 "사이트 설정" 탭의 비전 이미지에서 바꿉니다.',
        fields: [
          { key: 'visionEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.85rem', koOnly: true, ko: 'Scientific Precision & Nature' },
          { key: 'visionTitle', label: '큰 제목', type: 'textarea', size: '2.1rem', ko: '영양과 기술, 그리고 신뢰로 빚어낸 품질', en: 'Crafted with precision, delivered with unwavering trust.' },
          { key: 'visionBody', label: '본문', type: 'textarea', size: '1rem', ko: '자연과 함께 숨 쉬는 강아지와 고양이를 위해 정직한 연구와 철저한 위생 관리를 실천합니다.', en: 'Providing healthier food, treats, and care products for cats and dogs in harmony with nature.' },
          { key: 'visionButton', label: '버튼 문구', type: 'text', size: '0.85rem', ko: '브랜드 포트폴리오', en: 'EXPLORE BRANDS' },
        ],
      },
      {
        label: '브랜드 라인업 섹션',
        note: '브랜드 카드 내용은 "브랜드 추가 등록" 탭에서 바꿉니다.',
        fields: [
          { key: 'lineupEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.78rem', koOnly: true, ko: 'Specialized Portfolios' },
          { key: 'lineupTitle', label: '섹션 제목', type: 'textarea', size: '1.25rem', ko: '부명이 만들어가는 대표 브랜드 라인업', en: 'Core Brand Lineup' },
          { key: 'lineupBody', label: '본문', type: 'textarea', size: '0.85rem', ko: '각 브랜드별 대표 상품을 소개합니다.', en: 'Introducing the flagship products for each brand.' },
        ],
      },
      {
        label: '국내 대형 유통 파트너 섹션',
        fields: [
          { key: 'retailEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.78rem', koOnly: true, ko: 'Trusted by Major Retail Networks' },
          { key: 'retailTitle', label: '섹션 제목', type: 'textarea', size: '1.25rem', ko: '부명과 함께하는 국내 대형 유통 파트너', en: 'Domestic Retail Partners' },
          { key: 'retailBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '이마트, 홈플러스, 코스트코, 쿠팡, 편의점 4사 등 국내 13개 이상 유통 채널에 검증된 제품을 공급합니다.', en: 'Supplying premium pet products to over 13 major hypermarkets, marts, and online channels in Korea.' },
        ],
      },
      {
        label: '펫 전문 유통사 섹션',
        fields: [
          { key: 'petRetailEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.78rem', koOnly: true, ko: 'Trusted by Pet Specialty Distributors' },
          { key: 'petRetailTitle', label: '섹션 제목', type: 'textarea', size: '1.25rem', ko: '부명과 함께 하는 국내 펫 전문 유통사', en: 'Domestic Pet Specialty Distributors' },
          { key: 'petRetailBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '선진펫, 꼬기오, 야옹아멍멍해봐, 더 키코 등 국내 대형 펫 유통 채널에 검증된 제품을 공급합니다.', en: 'Supplying verified products to major domestic pet specialty distribution channels including THEKICO, SUJINPET, Dog & Cat Paradise, and WellPet Company.' },
        ],
      },
      {
        label: '수출/B2B 문의 배너',
        fields: [
          { key: 'globalImage', label: '배경 사진', type: 'image', width: 2560, height: 1440, src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2560&q=80' },
          { key: 'globalEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.85rem', koOnly: true, ko: 'Global Partnership & Export' },
          { key: 'globalTitle', label: '큰 제목', type: 'textarea', size: '2.1rem', ko: '국내 대형 유통망을 넘어 세계 시장으로', en: 'Connecting domestic retail and global export markets.' },
          { key: 'globalBody', label: '본문', type: 'textarea', size: '1rem', ko: '대형 할인마트, 이커머스 및 글로벌 수출 네트워크를 기반으로 국내외 B2B 비즈니스 파트너십을 확장해 나갑니다.', en: 'Collaborating with leading retail partners and international buyers to deliver excellence worldwide.' },
          { key: 'globalButton', label: '버튼 문구', type: 'text', size: '0.85rem', ko: 'B2B 입점 및 수출 문의', en: 'INQUIRE B2B PARTNERSHIP' },
        ],
      },
    ],
  },

  about: {
    label: '회사소개',
    sections: [
      {
        label: '상단 배너',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 1440, src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2560&q=80' },
          { key: 'heroEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.85rem', koOnly: true, ko: 'CORPORATE OVERVIEW & CI' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.3rem', ko: '회사소개', en: 'About Us' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '30년이상 축적된 정직한 기술과 신뢰를 바탕으로 반려동물과 반려인의 행복한 내일을 열어갑니다.', en: 'Opening a happy tomorrow for pets and pet owners based on honest technology and trust accumulated over 30 years.' },
        ],
      },
      {
        label: '대표 인사말',
        fields: [
          { key: 'ceoEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.72rem', koOnly: true, ko: 'CEO MESSAGE' },
          { key: 'ceoHeading', label: '왼쪽 제목', type: 'textarea', size: '1.15rem', ko: '반려동물과 함께 행복한 세상을 꿈꿉니다', en: 'Dreaming of a happy world together with pets' },
          { key: 'ceoName', label: '대표 이름', type: 'text', size: '0.92rem', ko: '정성훈 대표이사', en: 'Seong-hoon Jeong, CEO' },
          { key: 'ceoCompany', label: '대표 직함/회사', type: 'text', size: '0.78rem', ko: '(주)부명 대표이사', en: '(주)BOOMYOUNG CO., LTD.' },
          { key: 'ceoSignature', label: '대표 서명 이미지', type: 'image', width: 600, height: 180, src: './assets/ceo_signature.png' },
          { key: 'ceoLead', label: '인사말 첫 문장 (손글씨체)', type: 'textarea', size: '1.35rem', ko: '안녕하십니까. 부명(BOOMYOUNG CO., LTD.) 대표이사 정성훈입니다.', en: 'Hello, I am Seong-hoon Jeong, CEO of BOOMYOUNG CO., LTD.' },
          { key: 'ceoBody', label: '인사말 본문 (손글씨체) — 빈 줄로 문단을 나눕니다', type: 'textarea', size: '1.35rem', ko: '부명은 반려동물과 반려인 모두에게 더 나은 제품과 서비스를 제공한다는 목표 아래 반려동물용품을 중심으로 상품 기획, 개발, 유통 및 물류 전반의 사업을 운영하고 있습니다.\n\n빠르게 변화하는 반려동물 시장의 트렌드와 소비자의 요구를 면밀히 분석하여 실용성과 품질을 갖춘 제품을 선보이고, 국내 주요 유통채널과의 안정적인 협력관계를 바탕으로 지속적인 성장을 이어가고 있습니다.\n\n앞으로도 신뢰를 바탕으로 하는 매장과 고객 모두가 만족할 수 있는 경영을 지향하며, 알찬 기획과 고품질 제조 역량으로 시장 지배력을 강화하고 가치 있는 미래를 만들어 가겠습니다. 감사합니다.', en: 'Under the goal of providing better products and services to both pets and pet owners, BOOMYOUNG operates across product planning, development, distribution, and logistics, centered around pet supplies.\n\nWe closely analyze fast-changing pet market trends and consumer demands to introduce practical and high-quality products, maintaining sustainable growth built on stable partnerships with major domestic distribution channels.\n\nGoing forward, we will pursue management that satisfies both stores and customers based on trust, strengthening market leadership through solid planning and high-quality manufacturing capabilities. Thank you.' },
        ],
      },
      {
        label: '기업 연혁 / 인프라 / CI 섹션 제목',
        fields: [
          { key: 'historyTitle', label: '기업 연혁 제목', type: 'text', size: '1.15rem', ko: '기업 연혁', en: 'Company History' },
          { key: 'infraTitle', label: '인프라 섹션 제목', type: 'text', size: '1.15rem', ko: '생산 및 R&D 인프라', en: 'Infrastructure' },
          { key: 'ciTitle', label: 'CI 섹션 제목', type: 'text', size: '1.15rem', ko: 'CI 소개', en: 'Corporate Identity' },
        ],
      },
    ],
  },

  trust: {
    label: '신뢰와 인증',
    sections: [
      {
        label: '상단 배너',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 1440, src: './assets/trust_hero.png' },
          { key: 'heroEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.85rem', koOnly: true, ko: 'QUALITY & GLOBAL TRUST' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.3rem', ko: '신뢰와 인증', en: 'Trust & Certification' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '엄격한 품질 표준과 글로벌 박람회 출품을 통해 신뢰를 실증합니다.', en: 'Uncompromising safety protocols & international exhibition records.' },
        ],
      },
      {
        label: '품질 인증 섹션',
        fields: [
          { key: 'certEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.72rem', koOnly: true, ko: 'CERTIFICATIONS' },
          { key: 'certTitle', label: '섹션 제목', type: 'text', size: '1.15rem', ko: '품질 및 안전 인증 시스템', en: 'Quality Management System' },
        ],
      },
      {
        label: '보유 특허 섹션',
        fields: [
          { key: 'patentEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.72rem', koOnly: true, ko: 'INTELLECTUAL PROPERTY' },
          { key: 'patentTitle', label: '섹션 제목', type: 'text', size: '1.15rem', ko: '보유 특허', en: 'Patents Held' },
          { key: 'patentBody', label: '본문', type: 'textarea', size: '0.9rem', ko: '(주)부명은 반려동물 사료 및 용품 관련 기술에 대해 특허청(KIPO)에 등록된 특허, 디자인등록, 실용신안을 보유하고 있습니다.', en: 'BOOMYUNG holds patents, design registrations and utility models registered with the Korean Intellectual Property Office (KIPO) for pet food and pet supply technologies.' },
        ],
      },
      {
        label: '유통 네트워크 섹션',
        fields: [
          { key: 'networkEyebrow', label: '대형 유통 - 작은 영문 라벨', type: 'text', size: '0.72rem', koOnly: true, ko: 'PARTNERSHIP' },
          { key: 'networkTitle', label: '대형 유통 - 섹션 제목', type: 'text', size: '1.15rem', ko: '신뢰로 인정받은 국내 대형 유통 네트워크', en: 'Domestic Distribution Network' },
          { key: 'petRetailTitle', label: '펫 전문 유통사 - 섹션 제목', type: 'text', size: '1.15rem', ko: '부명과 함께 하는 국내 펫 전문 유통사', en: 'Domestic Pet Specialty Distributors' },
          { key: 'petRetailBody', label: '펫 전문 유통사 - 본문', type: 'textarea', size: '0.85rem', ko: '선진펫, 꼬기오, 야옹아멍멍해봐, 더 키코 등 국내 대형 펫 유통 채널에 검증된 제품을 공급합니다.', en: 'Supplying verified products to major domestic pet specialty distribution channels including THEKICO, SUJINPET, Dog & Cat Paradise, and WellPet Company.' },
        ],
      },
    ],
  },

  catalog: {
    label: '제품 카탈로그',
    sections: [
      {
        label: '상단 배너',
        note: '제품 카드는 "신규 제품 추가" 탭에서 바꿉니다.',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 1440, src: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=2560&q=80' },
          { key: 'heroEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.85rem', koOnly: true, ko: 'CATALOG' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.3rem', ko: '제품 카탈로그', en: 'Product Catalog' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '(주)부명의 전체 펫 푸드 및 위생용품 카탈로그를 확인하실 수 있습니다.', en: 'Explore our complete portfolio of nutrition, treats, litter, and supplies.' },
        ],
      },
    ],
  },

  contact: {
    label: '문의하기',
    sections: [
      {
        label: '상단 배너',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 1440, src: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2560&q=80' },
          { key: 'heroEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.85rem', koOnly: true, ko: 'INQUIRY & SALES CONTACT' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.3rem', ko: 'B2B 입점 및 영업 담당자 문의', en: 'Contact Us & Sales Routing' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '(주)부명과 함께 성장할 국내외 파트너사의 문의 및 영업 담당자를 안내합니다.', en: 'Connect with BOOMYUNG for domestic retail distribution and global export partnerships.' },
        ],
      },
      {
        label: '영업 담당자 명함 섹션',
        fields: [
          { key: 'cardsEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.72rem', koOnly: true, ko: 'SALES REPRESENTATIVES' },
          { key: 'cardsTitle', label: '섹션 제목', type: 'textarea', size: '1.15rem', ko: '부명 영업1팀 · 영업2팀 담당자 명함 안내', en: 'Direct Sales Representatives Business Cards' },
          { key: 'cardsBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '문의 유형에 맞춰 담당 영업팀 명함을 확인하시거나 직접 연락을 주시면 더욱 빠르고 원활한 상담이 가능합니다.', en: 'Click on the card to inspect high-resolution business card details or reach out directly.' },
        ],
      },
      {
        label: '본사 안내',
        fields: [
          { key: 'hqEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.72rem', koOnly: true, ko: 'HEADQUARTERS' },
          { key: 'hqTitle', label: '제목', type: 'text', size: '1.15rem', ko: '(주)부명 본사 안내', en: 'Corporate Information' },
          { key: 'hqBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '제품 유통, 대형마트 입점, 해외 수출 및 OEM/ODM 제조 관련 문의를 남겨주시면 담당 파트너십 팀이 안내해 드립니다.', en: 'Feel free to contact us regarding OEM/ODM manufacturing, retail distribution, or global export inquiries.' },
          { key: 'hqAddress', label: '주소', type: 'textarea', size: '0.82rem', ko: '경기도 구리시 건원대로34번길 19 306 (주)부명', en: '306, 19, Geonwon-daero 34beon-gil, Guri-si, Gyeonggi-do, Korea' },
          { key: 'hqTel', label: '전화번호', type: 'text', size: '0.82rem', koOnly: true, ko: '031-553-8003' },
          { key: 'hqFax', label: '팩스번호', type: 'text', size: '0.82rem', koOnly: true, ko: '031-592-2460' },
          { key: 'hqBizNo', label: '사업자등록번호', type: 'text', size: '0.82rem', koOnly: true, ko: '132-81-49973' },
        ],
      },
    ],
  },

  brands: {
    label: '브랜드 (목록 페이지)',
    sections: [
      {
        label: '상단 배너',
        note: '브랜드 카드 내용은 "브랜드 추가 등록" 탭에서 바꿉니다.',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 1440, src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=2560&q=80' },
          { key: 'heroEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.85rem', koOnly: true, ko: 'OUR PORTFOLIO' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.3rem', ko: '브랜드 포트폴리오', en: 'Brand Ecosystem' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '(주)부명의 전문 펫 브랜드 라인업을 소개합니다.', en: 'Discover our specialized brands tailored for healthy pet life.' },
        ],
      },
    ],
  },

  importedBrands: {
    label: '수입브랜드 (목록 페이지)',
    sections: [
      {
        label: '상단 배너',
        fields: [
          { key: 'heroImage', label: '배경 사진', type: 'image', width: 2560, height: 1440, src: './assets/hero_slide_2.jpg' },
          { key: 'heroEyebrow', label: '작은 영문 라벨', type: 'text', size: '0.85rem', koOnly: true, ko: 'IMPORTED PORTFOLIO' },
          { key: 'heroTitle', label: '페이지 제목', type: 'text', size: '1.3rem', ko: '수입 브랜드', en: 'Imported Brands' },
          { key: 'heroBody', label: '본문', type: 'textarea', size: '0.82rem', ko: '(주)부명이 엄선하여 국내에 유통하는 글로벌 펫 브랜드를 소개합니다.', en: 'Global pet brands carefully selected and distributed by BOOMYUNG.' },
        ],
      },
    ],
  },
};

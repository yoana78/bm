// 브랜드 목록 데이터입니다. Brands.jsx(자사 브랜드), ImportedBrands.jsx(수입 브랜드),
// BrandDetail.jsx(브랜드 상세), 그리고 Catalog.jsx의 브랜드 필터에서 사용됩니다.
// 각 항목의 필드 설명:
//   id: 브랜드 고유 코드 (URL 및 제품 데이터와 연결에 사용)
//   nameKo/nameEn: 한국어/영어 브랜드명
//   tagline: 브랜드 슬로건
//   logo: 로고 이미지 경로, hasLogo: 로고 이미지 존재 여부
//   descriptionKo/descriptionEn: 브랜드 소개 문구
//   categories: 해당 브랜드의 제품 카테고리 목록 (현재 미사용, 빈 배열)
//   color: 브랜드 상징 색상 (카드 등 UI에 사용)
//   type: 'own'(자사 브랜드) 또는 'imported'(수입 브랜드) — 이 값으로 Brands/ImportedBrands 페이지에 분류되어 표시됨
export const brands = [
  {
    id: 'dayspo',
    nameKo: '데이스포',
    nameEn: 'DAYSPO',
    tagline: 'Total Care for All Pet Life',
    logo: './assets/brands/dayspo.png',
    hasLogo: true,
    descriptionKo: '프리미엄 펫 케어 전문브랜드',
    descriptionEn: 'Premium Pet Care Brand',
    categories: [],
    color: '#8B1A1A',
    type: 'own'
  },
  {
    id: 'bellbird',
    nameKo: '벨버드',
    nameEn: 'Bell bird',
    tagline: 'Delicious & Nutritious',
    logo: './assets/brands/bellbird.png',
    hasLogo: true,
    descriptionKo: '대중적인 반려동물 멀티 브랜드',
    descriptionEn: 'Popular Pet Multi-Brand',
    categories: [],
    color: '#1B3A91',
    type: 'own'
  },
  {
    id: 'evergrow',
    nameKo: '에버그로',
    nameEn: 'ever grow',
    tagline: 'Growing Together Healthy & Strong',
    logo: './assets/brands/evergrow.png',
    hasLogo: true,
    descriptionKo: '펫밀크와 초유를 활용한 면역력 케어 브랜드',
    descriptionEn: 'Immunity Care Brand with Pet Milk & Colostrum',
    categories: [],
    color: '#B8A082',
    type: 'own'
  },
  {
    id: 'howpet',
    nameKo: '하우펫',
    nameEn: 'HOWPET',
    tagline: 'How We Love Pets',
    logo: './assets/brands/howpet.png',
    hasLogo: true,
    descriptionKo: '반려동물의 더 건강한 삶을 위한 펫푸드 브랜드',
    descriptionEn: 'Pet Food Brand for Healthy Pet Life',
    categories: [],
    color: '#1B2B6B',
    type: 'own'
  },
  {
    id: 'ninaottosson',
    nameKo: '니나오토슨',
    nameEn: 'Nina Ottosson',
    tagline: 'Interactive Play, Sweden',
    logo: './assets/brands/imported/ninaottosson.png',
    hasLogo: true,
    descriptionKo: '반려동물의 지능 발달을 돕는 스웨덴 노즈워크 · 퍼즐 토이 브랜드',
    descriptionEn: 'Swedish nosework & puzzle toy brand for pet enrichment',
    categories: [],
    color: '#2B2118',
    type: 'imported'
  },
  {
    id: 'dono',
    nameKo: '도노',
    nameEn: 'DONO',
    tagline: 'Trusted Everyday Care',
    logo: './assets/brands/imported/dono.png',
    hasLogo: true,
    descriptionKo: '수입 반려동물 위생 및 관리용품 브랜드',
    descriptionEn: 'Imported pet hygiene & daily care brand',
    categories: [],
    color: '#C0392B',
    type: 'imported'
  },
  {
    id: 'reflex',
    nameKo: '리플렉스',
    nameEn: 'Reflex',
    tagline: 'Balanced Nutrition',
    logo: './assets/brands/imported/reflex.png',
    hasLogo: true,
    descriptionKo: '균형 잡힌 영양 설계의 수입 반려동물 사료 브랜드',
    descriptionEn: 'Imported pet food brand with balanced nutrition',
    categories: [],
    color: '#1E1E1E',
    type: 'imported'
  },
  {
    id: 'sulfodene',
    nameKo: '설퍼딘',
    nameEn: 'Sulfodene',
    tagline: 'Skin & Coat Care, USA',
    logo: './assets/brands/imported/sulfodene.png',
    hasLogo: true,
    descriptionKo: '피부 및 모질 케어 전문 미국 수입 브랜드',
    descriptionEn: 'American imported brand specialized in skin & coat care',
    categories: [],
    color: '#B71C1C',
    type: 'imported'
  },
  {
    id: 'petstage',
    nameKo: '펫스테이지',
    nameEn: 'Petstages',
    tagline: 'Products With Purpose',
    logo: './assets/brands/imported/petstage.png',
    hasLogo: true,
    descriptionKo: '반려동물 장난감 전문 미국 수입 브랜드',
    descriptionEn: 'American imported brand for purposeful pet toys',
    categories: [],
    color: '#D32F2F',
    type: 'imported'
  }
];



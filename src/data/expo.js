// 이 파일은 Trust.jsx(신뢰와 인증 페이지)의 "엑스포 갤러리"에 표시되는 박람회 사진 목록을 만듭니다.
// makeYear()는 연도별로 반복되는 사진 항목(전시회명, 연도, 장소, 이미지 경로)을 자동 생성하는 도우미 함수입니다.
function makeYear(year, titleKo, titleEn, locationKo, locationEn, count, prefix) {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      id: `expo-${year}-${n}`,
      titleKo: `${titleKo} #${i + 1}`,
      titleEn: `${titleEn} #${i + 1}`,
      category: 'Exhibition',
      year: String(year),
      locationKo,
      locationEn,
      image: `./assets/expo/${prefix}_${n}.jpg`
    };
  });
}

// 연도별 박람회 사진 목록 (2019, 2023~2025) — Trust.jsx의 엑스포 갤러리 그리드에서 사용
export const expoPhotos = [
  ...makeYear(2019, '2019 미국 올랜도 글로벌 펫 엑스포', '2019 Global Pet Expo, Orlando', '올랜도, 미국', 'Orlando, USA', 6, 'expo_2019'),
  ...makeYear(2023, '2023 태국 국제 펫 박람회', '2023 Pet Fair South East Asia', '방콕, 태국', 'Bangkok, Thailand', 12, 'expo_2023'),
  ...makeYear(2024, '2024 태국 국제 펫 박람회', '2024 Pet Fair South East Asia', '방콕, 태국', 'Bangkok, Thailand', 8, 'expo_2024'),
  ...makeYear(2025, '2025 태국 국제 펫 박람회', '2025 Pet Fair South East Asia', '방콕, 태국', 'Bangkok, Thailand', 8, 'expo')
];

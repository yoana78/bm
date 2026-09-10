// 이 파일은 화면에 아무것도 그리지 않는 유틸리티 컴포넌트입니다.
// 다른 페이지로 이동할 때마다 스크롤 위치를 맨 위로 되돌려서,
// 예를 들어 카탈로그를 아래로 스크롤한 뒤 상세 페이지로 이동해도 항상 페이지 상단부터 보이게 합니다.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation(); // 현재 주소 경로 (경로가 바뀔 때마다 아래 효과 재실행)
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

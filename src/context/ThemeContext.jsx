// 이 파일은 사이트 전체의 색상 테마(디자인 스킨) 상태를 관리하는 Context입니다.
// main.jsx에서 앱 전체를 감싸며, 어떤 컴포넌트에서든 useTheme()으로 현재 테마를 읽거나 바꿀 수 있습니다.
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 선택 가능한 테마 종류:
  // 'classic' (기본 - 모던 코퍼레이트 블루)
  // 'dark-executive' (프리미엄 다크 + 골드)
  // 'warm-studio' (따뜻한 베이지 + 소프트 블루)
  const [theme, setTheme] = useState('classic');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-root theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// 다른 컴포넌트에서 현재 테마 값과 setTheme 함수를 꺼내 쓰기 위한 훅
export function useTheme() {
  return useContext(ThemeContext);
}

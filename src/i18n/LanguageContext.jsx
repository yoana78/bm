// 이 파일은 다국어(한국어/영어) 전환 상태를 관리하는 Context입니다.
// main.jsx에서 앱 전체를 감싸며, 각 페이지/컴포넌트는 useLanguage()로 현재 언어와 번역 텍스트(t)를 가져다 씁니다.
import React, { createContext, useContext, useState } from 'react';
import ko from './ko';
import en from './en';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ko'); // 기본 언어는 한국어
  const t = lang === 'ko' ? ko : en; // 현재 언어에 맞는 번역 텍스트 묶음 (ko.js 또는 en.js)
  const toggleLang = () => setLang(prev => prev === 'ko' ? 'en' : 'ko'); // 헤더의 언어 전환 버튼에서 사용

  return (
    <LanguageContext.Provider value={{ lang, language: lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 다른 컴포넌트/페이지에서 현재 언어와 번역 텍스트를 꺼내 쓰기 위한 훅
export function useLanguage() {
  return useContext(LanguageContext);
}

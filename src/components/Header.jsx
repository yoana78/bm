// 이 파일은 헤더(상단 네비게이션) 컴포넌트입니다.
// 모든 페이지 상단에 고정 표시되며, 로고/메뉴/언어 전환 버튼을 포함합니다.
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Header() {
  const { lang, toggleLang } = useLanguage(); // 현재 언어(ko/en)와 전환 함수
  const isEn = lang === 'en';

  return (
    <header className="daesang-header">
      {/* SECTION: 좌측 로고 + 회사명 (클릭 시 홈으로 이동) */}
      <Link to="/" className="daesang-logo">
        <img 
          src="./assets/boomyung_ci_logo.png" 
          alt="BOOMYUNG CO., LTD." 
          style={{ height: '46px', objectFit: 'contain' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dh-blue)', letterSpacing: '0.02em', lineHeight: 1.1 }}>
            {isEn ? 'BOOMYUNG' : '(주)부명'}
          </span>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', letterSpacing: '0.08em' }}>
            BOOMYUNG CO., LTD.
          </span>
        </div>
      </Link>

      {/* SECTION: 상단 메인 메뉴 (홈/회사소개/브랜드/수입브랜드/카탈로그/신뢰와 인증/문의) */}
      <nav className="daesang-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>
          {isEn ? 'Home' : '홈'}
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
          {isEn ? 'About Us' : '회사소개'}
        </NavLink>
        <NavLink to="/brands" className={({ isActive }) => (isActive ? 'active' : '')}>
          {isEn ? 'Brands' : '브랜드'}
        </NavLink>
        <NavLink to="/imported-brands" className={({ isActive }) => (isActive ? 'active' : '')}>
          {isEn ? 'Imported Brands' : '수입브랜드'}
        </NavLink>
        <NavLink to="/catalog" className={({ isActive }) => (isActive ? 'active' : '')}>
          {isEn ? 'Product Catalog' : '제품 카탈로그'}
        </NavLink>
        <NavLink to="/trust" className={({ isActive }) => (isActive ? 'active' : '')}>
          {isEn ? 'Trust & Quality' : '신뢰와 인증'}
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
          {isEn ? 'Contact Us' : '문의하기'}
        </NavLink>
      </nav>

      {/* SECTION: 우측 언어 전환 버튼 (한국어 <-> 영어) */}
      <div className="daesang-header-right">
        <button className="daesang-lang" onClick={toggleLang} title={isEn ? 'Switch to Korean' : 'Switch to English'}>
          🌐 {isEn ? 'EN' : 'KR'} | {isEn ? '한국어' : 'English'}
        </button>
      </div>
    </header>
  );
}


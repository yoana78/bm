// 이 파일은 홈(메인) 페이지입니다 (주소: /).
// 상단 이미지 슬라이더, 브랜드 소개, 브랜드 라인업, 유통 파트너사 마퀴(무한 슬라이드),
// 그리고 하단 B2B 문의 유도 배너로 구성됩니다.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { brands } from '../data/brands';
import { partners } from '../data/partners';
import { petRetailPartners } from '../data/petRetailPartners';

export default function Home() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const { siteSettings } = useData(); // 관리자 페이지 "사이트 설정" 탭에서 등록한 히어로 이미지 목록/비전 섹션 배경 이미지
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 보여지는 히어로 슬라이드 번호

  // 히어로 슬라이드 5장은 전부 같은 문구를 공유하고 사진만 다름 — 관리자가 등록한 이미지 목록(siteSettings.heroImages)으로
  // 이 공통 문구를 감싸서 슬라이드 배열을 만든다. 이미지 추가/삭제는 관리자 페이지에서만 가능.
  const heroSlides = siteSettings.heroImages.map((image) => ({
    subTitle: "Respect for Pet Life",
    titleKo: "존중은 아주 작고 사소한 것에서부터 시작됩니다",
    titleEn: "Respect begins with small and thoughtful care.",
    descKo: "(주)부명은 반려동물의 생명과 건강을 존중하는 정직한 품질로 펫 헬스케어의 미래를 열어갑니다.",
    descEn: "(주)BOOMYUNG creates a healthier future for pets through uncompromised quality and transparent craftsmanship.",
    link: "/about",
    linkTextKo: "기업 소개 자세히 보기",
    linkTextEn: "MORE ABOUT BOOMYUNG",
    image
  }));

  // 히어로 슬라이드 자동 전환 타이머 (5초마다 다음 슬라이드로) - 관리자가 이미지를 전부 지운 경우(0장)에는 실행하지 않음
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 이전/다음 화살표 버튼 클릭 시 슬라이드 이동
  const handlePrev = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNext = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // 파트너사 로고를 두 배로 복제 - 마퀴(가로 무한 슬라이드)가 끊김 없이 반복되도록 함
  const marqueePartners = [...partners, ...partners];
  const marqueePetRetailPartners = [...petRetailPartners, ...petRetailPartners];

  return (
    <div className="daesang-home-wrap">
      {/* SECTION 1: 5-IMAGE HERO CAROUSEL (1.5x Height) */}
      <section className="hero-slider-container" style={{ height: '90vh', minHeight: '850px', position: 'relative', overflow: 'hidden' }}>
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`daesang-section hero-slide ${idx === currentSlide ? 'active' : ''}`}
            style={{
              height: '90vh',
              minHeight: '850px',
              backgroundImage: `url('${slide.image}')`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              opacity: idx === currentSlide ? 1 : 0,
              visibility: idx === currentSlide ? 'visible' : 'hidden',
              transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
              zIndex: idx === currentSlide ? 2 : 1
            }}
          >
            <div className="daesang-section-overlay" style={{ background: 'rgba(0,0,0,0.35)' }}></div>
            <div className="daesang-section-content" style={{ position: 'relative', zIndex: 3 }}>
              <span className="daesang-poetic-sub">{slide.subTitle}</span>
              <h1 className="daesang-poetic-title">
                {isEn ? slide.titleEn : slide.titleKo}
              </h1>
              <p className="daesang-poetic-desc">
                {isEn ? slide.descEn : slide.descKo}
              </p>
              <Link to={slide.link} className="daesang-btn-minimal">
                {isEn ? slide.linkTextEn : slide.linkTextKo}
              </Link>
            </div>
          </div>
        ))}

        {/* SECTION: 슬라이드 이전/다음 화살표 버튼 */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          style={{
            position: 'absolute',
            top: '50%',
            left: '30px',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.4)',
            color: '#FFFFFF',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(4px)'
          }}
        >
          &#10094;
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          style={{
            position: 'absolute',
            top: '50%',
            right: '30px',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.4)',
            color: '#FFFFFF',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(4px)'
          }}
        >
          &#10095;
        </button>

        {/* SECTION: 슬라이드 하단 점(페이지네이션) 인디케이터 */}
        <div
          style={{
            position: 'absolute',
            bottom: '35px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            gap: '10px'
          }}
        >
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === currentSlide ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                border: 'none',
                background: idx === currentSlide ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* SECTION: 히어로 하단 그라데이션 페이드 - 다음 섹션(비전 배경)과 자연스럽게 이어지도록 투명→검정으로 어두워짐.
            히어로 이미지가 관리자에 의해 계속 바뀌어도(색감이 매번 다름) 이 페이드 덕분에 항상 안정적으로 자연스러운 전환이 유지됨 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '220px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
          zIndex: 5,
          pointerEvents: 'none'
        }} />
      </section>

      {/* SECTION 2: BRAND VISION (Separate Full Section - 1.5x Height with Dogs & Cats Forest Image) */}
      <section className="daesang-section" style={{ height: '90vh', minHeight: '850px', backgroundImage: `url('${siteSettings.visionImage}')`, position: 'relative' }}>
        <div className="daesang-section-overlay" style={{ background: 'rgba(0,0,0,0.35)' }}></div>
        {/* SECTION: 비전 섹션 상단 그라데이션 페이드 - 히어로 하단 페이드와 맞닿아 두 섹션이 겹치듯 자연스럽게 연결됨 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '220px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        <div className="daesang-section-content" style={{ position: 'relative', zIndex: 3 }}>
          <span className="daesang-poetic-sub">Scientific Precision & Nature</span>
          <h2 className="daesang-poetic-title">
            {isEn 
              ? "Crafted with precision, delivered with unwavering trust." 
              : "영양과 기술, 그리고 신뢰로 빚어낸 품질"}
          </h2>
          <p className="daesang-poetic-desc">
            {isEn
              ? "Providing healthier food, treats, and care products for cats and dogs in harmony with nature."
              : "자연과 함께 숨 쉬는 강아지와 고양이를 위해 정직한 연구와 철저한 위생 관리를 실천합니다."}
          </p>
          <Link to="/brands" className="daesang-btn-minimal">
            {isEn ? 'EXPLORE BRANDS' : '브랜드 포트폴리오'}
          </Link>
        </div>
      </section>

      {/* SECTION 2: BRAND LINEUP (4 Core Brands, Single Row 4-Column Layout) */}
      <section className="daesang-white-section" style={{ padding: '70px 40px' }}>
        <div className="daesang-container-wide">
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--dh-blue)', letterSpacing: '0.08em', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
              Specialized Portfolios
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dh-navy)', marginBottom: '8px', wordBreak: 'keep-all' }}>
              {isEn ? 'Core Brand Lineup' : '부명이 만들어가는 대표 브랜드 라인업'}
            </h2>
            <p style={{ color: 'var(--dh-text-muted)', fontSize: '0.85rem', lineHeight: '1.5', wordBreak: 'keep-all' }}>
              {isEn
                ? 'Introducing the flagship products for each brand.'
                : '각 브랜드별 대표 상품을 소개합니다.'}
            </p>
          </div>

          <div className="daesang-grid-brands" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '28px' }}>
            {brands.map((b, idx) => {
              const logoHeightMap = { bellbird: 77, howpet: 58, petstages: 58 };
              const logoHeight = logoHeightMap[b.id] || 64;
              return (
              <Link to={`/brands/${b.id}`} key={b.id} className="daesang-brand-item" style={{ textDecoration: 'none', background: '#FFFFFF', padding: '24px', borderRadius: '10px', border: '1px solid var(--dh-border)', transition: 'all 0.2s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', minHeight: '68px' }}>
                  <span className="daesang-brand-num" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dh-blue)' }}>0{idx + 1}</span>
                  {b.logo && (
                    <img src={b.logo} alt={b.nameKo} style={{ height: `${logoHeight}px`, maxWidth: '200px', objectFit: 'contain' }} />
                  )}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dh-navy)', marginBottom: '6px' }}>
                  {isEn ? (b.nameEn || b.nameKo) : b.nameKo}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--dh-text-muted)', lineHeight: '1.5' }}>
                  {isEn ? b.descriptionEn : b.descriptionKo}
                </p>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: DOMESTIC PARTNERS MARQUEE WALL */}
      <section style={{ background: '#FFFFFF', padding: '50px 0', borderTop: '1px solid var(--dh-border)' }}>
        <div className="daesang-container-wide" style={{ marginBottom: '24px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--dh-blue)', letterSpacing: '0.08em', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
            Trusted by Major Retail Networks
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dh-navy)', wordBreak: 'keep-all' }}>
            {isEn ? 'Domestic Retail Partners' : '부명과 함께하는 국내 대형 유통 파트너'}
          </h2>
          <p style={{ color: 'var(--dh-text-muted)', fontSize: '0.82rem', marginTop: '6px', wordBreak: 'keep-all' }}>
            {isEn
              ? 'Supplying premium pet products to over 13 major hypermarkets, marts, and online channels in Korea.'
              : '이마트, 홈플러스, 코스트코, 쿠팡, 편의점 4사 등 국내 13개 이상 유통 채널에 검증된 제품을 공급합니다.'}
          </p>
        </div>

        {/* SECTION: 대형 유통사 로고 무한 마퀴(가로 스크롤) */}
        <div className="marquee-container">
          <div className="marquee-track">
            {marqueePartners.map((p, idx) => (
              <div key={`${p.id}-${idx}`} className="marquee-item" title={isEn ? p.nameEn : p.nameKo} style={{ width: '150px', height: '75px', padding: '6px' }}>
                <img src={p.logo} alt={p.nameKo} style={{ maxHeight: '95%', maxWidth: '95%', objectFit: 'contain', transform: 'scale(1.2)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3-2: 국내 펫 전문 유통사 카드 섹션 */}
      <section style={{ background: '#FFFFFF', padding: '50px 0', borderTop: '1px solid var(--dh-border)' }}>
        <div className="daesang-container-wide" style={{ marginBottom: '24px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--dh-blue)', letterSpacing: '0.08em', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
            Trusted by Pet Specialty Distributors
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dh-navy)', wordBreak: 'keep-all' }}>
            {isEn ? 'Domestic Pet Specialty Distributors' : '부명과 함께 하는 국내 펫 전문 유통사'}
          </h2>
          <p style={{ color: 'var(--dh-text-muted)', fontSize: '0.82rem', marginTop: '6px', wordBreak: 'keep-all' }}>
            {isEn
              ? 'Supplying verified products to major domestic pet specialty distribution channels including THEKICO, SUJINPET, Dog & Cat Paradise, and WellPet Company.'
              : '선진펫, 꼬기오, 야옹아멍멍해봐, 더 키코 등 국내 대형 펫 유통 채널에 검증된 제품을 공급합니다.'}
          </p>
        </div>

        {/* SECTION: 펫 전문 유통사 로고 무한 마퀴(가로 스크롤) - 대형유통사 섹션과 동일한 카드/로고 사이즈 */}
        <div className="marquee-container">
          <div className="marquee-track">
            {marqueePetRetailPartners.map((p, idx) => (
              <div
                key={`${p.id}-${idx}`}
                className="marquee-item"
                title={p.logo ? (isEn ? p.nameEn : p.nameKo) : undefined}
                style={{ width: '150px', height: '75px', padding: '6px', borderStyle: p.logo ? 'solid' : 'dashed' }}
              >
                {p.logo ? (
                  <img src={p.logo} alt={p.nameKo} style={{ maxHeight: '55%', maxWidth: '80%', objectFit: 'contain' }} />
                ) : (
                  <span style={{ fontSize: '0.66rem', color: '#CBD5E1', fontWeight: 600, textAlign: 'center' }}>
                    {isEn ? 'Coming Soon' : '로고 추가 예정'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: GLOBAL REACH & CONTACT CTA */}
      <section className="daesang-section" style={{ height: '70vh', minHeight: '650px', backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2560&q=80')" }}>
        <div className="daesang-section-overlay" style={{ background: 'rgba(0,0,0,0.35)' }}></div>
        <div className="daesang-section-content" style={{ position: 'relative', zIndex: 3 }}>
          <span className="daesang-poetic-sub">Global Partnership & Export</span>
          <h2 className="daesang-poetic-title">
            {isEn 
              ? "Connecting domestic retail and global export markets." 
              : "국내 대형 유통망을 넘어 세계 시장으로"}
          </h2>
          <p className="daesang-poetic-desc">
            {isEn
              ? "Collaborating with leading retail partners and international buyers to deliver excellence worldwide."
              : "대형 할인마트, 이커머스 및 글로벌 수출 네트워크를 기반으로 국내외 B2B 비즈니스 파트너십을 확장해 나갑니다."}
          </p>
          <Link to="/contact" className="daesang-btn-minimal">
            {isEn ? 'INQUIRE B2B PARTNERSHIP' : 'B2B 입점 및 수출 문의'}
          </Link>
        </div>
      </section>
    </div>
  );
}



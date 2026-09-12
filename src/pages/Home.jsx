// 이 파일은 홈(메인) 페이지입니다 (주소: /).
// 상단 이미지 슬라이더, 브랜드 소개, 브랜드 라인업, 유통 파트너사 마퀴(무한 슬라이드),
// 그리고 하단 B2B 문의 유도 배너로 구성됩니다.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { partners } from '../data/partners';
import { petRetailPartners } from '../data/petRetailPartners';
import { usePageContent } from '../content/usePageContent';

export default function Home() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const { siteSettings, brands } = useData(); // 관리자 페이지 "사이트 설정" 탭에서 등록한 히어로 이미지 목록/비전 섹션 배경 이미지, 브랜드 목록
  const { txt, img } = usePageContent('home'); // 관리자 페이지 "페이지 문구·이미지" 탭에서 고칠 수 있는 문구/사진
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 보여지는 히어로 슬라이드 번호

  // 히어로 슬라이드는 전부 같은 문구를 공유하고 사진만 다름 — 관리자가 등록한 이미지 목록(siteSettings.heroImages)으로
  // 이 공통 문구를 감싸서 슬라이드 배열을 만든다. 이미지 추가/삭제는 관리자 페이지에서만 가능.
  const heroSlides = siteSettings.heroImages.map((image) => ({ image }));

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
              <span className="daesang-poetic-sub">{txt('heroEyebrow')}</span>
              <h1 className="daesang-poetic-title cms-text">
                {txt('heroTitle')}
              </h1>
              <p className="daesang-poetic-desc cms-text">
                {txt('heroBody')}
              </p>
              <Link to="/about" className="daesang-btn-minimal">
                {txt('heroButton')}
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
          <span className="daesang-poetic-sub">{txt('visionEyebrow')}</span>
          <h2 className="daesang-poetic-title cms-text">
            {txt('visionTitle')}
          </h2>
          <p className="daesang-poetic-desc cms-text">
            {txt('visionBody')}
          </p>
          <Link to="/brands" className="daesang-btn-minimal">
            {txt('visionButton')}
          </Link>
        </div>
      </section>

      {/* SECTION 2: BRAND LINEUP (4 Core Brands, Single Row 4-Column Layout) */}
      <section className="daesang-white-section" style={{ padding: '70px 40px' }}>
        <div className="daesang-container-wide">
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--dh-blue)', letterSpacing: '0.08em', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
              {txt('lineupEyebrow')}
            </span>
            <h2 className="cms-text" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dh-navy)', marginBottom: '8px', wordBreak: 'keep-all' }}>
              {txt('lineupTitle')}
            </h2>
            <p className="cms-text" style={{ color: 'var(--dh-text-muted)', fontSize: '0.85rem', lineHeight: '1.5', wordBreak: 'keep-all' }}>
              {txt('lineupBody')}
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
                    <img src={b.logo} alt={b.nameKo} style={{ height: `${logoHeight}px`, maxWidth: '200px', objectFit: 'contain', transform: `scale(${b.logoScale || 1})` }} />
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
            {txt('retailEyebrow')}
          </span>
          <h2 className="cms-text" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dh-navy)', wordBreak: 'keep-all' }}>
            {txt('retailTitle')}
          </h2>
          <p className="cms-text" style={{ color: 'var(--dh-text-muted)', fontSize: '0.82rem', marginTop: '6px', wordBreak: 'keep-all' }}>
            {txt('retailBody')}
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
            {txt('petRetailEyebrow')}
          </span>
          <h2 className="cms-text" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dh-navy)', wordBreak: 'keep-all' }}>
            {txt('petRetailTitle')}
          </h2>
          <p className="cms-text" style={{ color: 'var(--dh-text-muted)', fontSize: '0.82rem', marginTop: '6px', wordBreak: 'keep-all' }}>
            {txt('petRetailBody')}
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
      <section className="daesang-section" style={{ height: '70vh', minHeight: '650px', backgroundImage: `url('${img('globalImage')}')` }}>
        <div className="daesang-section-overlay" style={{ background: 'rgba(0,0,0,0.35)' }}></div>
        <div className="daesang-section-content" style={{ position: 'relative', zIndex: 3 }}>
          <span className="daesang-poetic-sub">{txt('globalEyebrow')}</span>
          <h2 className="daesang-poetic-title cms-text">
            {txt('globalTitle')}
          </h2>
          <p className="daesang-poetic-desc cms-text">
            {txt('globalBody')}
          </p>
          <Link to="/contact" className="daesang-btn-minimal">
            {txt('globalButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}



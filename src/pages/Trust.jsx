// 이 파일은 "신뢰와 인증" 페이지입니다 (주소: /trust).
// 인증서(ISO 등), 보유 특허/디자인등록, 박람회 참가 사진 갤러리, 유통 파트너사 목록을 한 페이지에 모아 보여줍니다.
import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { partners } from '../data/partners';
import { petRetailPartners } from '../data/petRetailPartners';
import { buildExpoData } from '../content/expoData';
import { usePageContent } from '../content/usePageContent';
import HeroMedia from '../components/HeroMedia';

export default function Trust() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const { siteSettings } = useData();
  const { txt, media } = usePageContent('trust'); // 관리자 페이지에서 고칠 수 있는 배너/섹션 문구

  // 기존 연도 + 관리자 페이지에서 추가한 연도를 합친 박람회 사진 목록
  const { photos: expoPhotos, meta: expoYearMeta } = buildExpoData(siteSettings.expoYears);

  // 현재 팝업(모달)으로 확대해서 보고 있는 항목 상태 (각각 null이면 닫힘)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedPatent, setSelectedPatent] = useState(null);

  // 인증서 목록 데이터 (ISO 14001, ISO 22000, HACCP, AAFCO)
  const certifications = [
    {
      code: 'ISO 14001',
      titleKo: '환경경영시스템 (ISO 14001)',
      titleEn: 'Environmental Management System',
      descKo: '생산 전 과정에서 환경 영향을 최소화하는 국제 표준 환경경영시스템을 적용합니다.',
      descEn: 'Certified environmental management system minimizing environmental impact across production processes.',
      image: './assets/certifications/iso14001.png',
      imageEn: './assets/certifications/iso14001_en.png'
    },
    {
      code: 'ISO 22000',
      titleKo: '식품안전경영시스템 (ISO 22000)',
      titleEn: 'Food Safety Management System',
      descKo: '원료 입고부터 제조, 포장 전 과정에 걸쳐 국제 표준 식품안전 경영시스템을 적용합니다.',
      descEn: 'Certified international food safety management from raw materials to final packaging.',
      image: './assets/certifications/iso22000.png',
      imageEn: './assets/certifications/iso22000_en.png'
    },
    {
      code: 'HACCP',
      titleKo: 'HACCP 위해요소 중점관리',
      titleEn: 'Hazard Analysis Critical Control Point',
      descKo: '제조 공정상 발생할 수 있는 위해요소를 사전 차단하여 안전한 사료와 간식을 생산합니다.',
      descEn: 'Rigorous monitoring and prevention of biological, chemical, and physical hazards.',
      image: './assets/certifications/haccp.png',
      imageEn: './assets/certifications/haccp_en.png'
    },
    {
      code: 'AAFCO',
      titleKo: 'AAFCO 미국사료관리협회 영양기준',
      titleEn: 'AAFCO Nutritional Guidelines Compliant',
      descKo: '미국사료관리협회(AAFCO)의 개·고양이 필수 영양 가이드라인을 준수합니다.',
      descEn: 'Formulated to meet global AAFCO nutritional standards for dogs and cats.',
      image: null
    }
  ];

  // Patents / design registrations / utility model. The certificates
  // themselves only exist in Korean (KIPO issues no separate English
  // copy) but already carry the official bilingual boilerplate; the
  // titleEn below is our own translation of the specific invention
  // title shown as a caption under the image, not a fabricated document.
  const patents = [
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2252390',
      titleKo: '반려 동물용 육포 및 그 제조방법',
      titleEn: 'Pet Jerky and Manufacturing Method Thereof',
      image: './assets/patents/patent_2252390.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2042458',
      titleKo: '벤토나이트를 함유한 고양이 모래 및 그 제조방법',
      titleEn: 'Bentonite-Containing Cat Litter and Manufacturing Method Thereof',
      image: './assets/patents/patent_2042458.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2042457',
      titleKo: '두부 부산물을 함유한 고양이 모래 및 그 제조방법',
      titleEn: 'Tofu-Byproduct Cat Litter and Manufacturing Method Thereof',
      image: './assets/patents/patent_2042457.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2248006',
      titleKo: '노즈워크매트',
      titleEn: 'Nosework Mat',
      image: './assets/patents/patent_2248006.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2233264',
      titleKo: '반려 동물용 육포 포장방법',
      titleEn: 'Packaging Method for Pet Jerky',
      image: './assets/patents/patent_2233264.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2254626',
      titleKo: '치석제거가 가능한 반려동물용 껌',
      titleEn: 'Tartar-Removing Chew Gum for Pets',
      image: './assets/patents/patent_2254626.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2246000',
      titleKo: '원료육이 코팅된 반려동물용 간식 및 이의 제조방법',
      titleEn: 'Meat-Coated Pet Treat and Manufacturing Method Thereof',
      image: './assets/patents/patent_2246000.jpg'
    },
    {
      type: 'patent',
      typeKo: '특허',
      typeEn: 'Patent',
      no: '10-2956733',
      titleKo: '반려동물 안구를 위한 식품 조성물',
      titleEn: 'Food Composition for Pet Eye Health',
      image: './assets/patents/patent_2956733.jpg'
    },
    {
      type: 'design',
      typeKo: '디자인등록',
      typeEn: 'Design Registration',
      no: '30-0833217',
      titleKo: '애견용 패드',
      titleEn: 'Pet Pad',
      image: './assets/patents/design_0833217.png'
    },
    {
      type: 'design',
      typeKo: '디자인등록',
      typeEn: 'Design Registration',
      no: '30-0847166',
      titleKo: '애완동물용 목줄',
      titleEn: 'Pet Leash',
      image: './assets/patents/design_0847166.png'
    },
  ];

  // 박람회 연도별 대표 제목/설명 (data/expo.js의 사진들을 연도로 묶을 때 사용)

  // expoPhotos(전체 사진 목록)를 연도별 그룹으로 재구성 (연도마다 하나의 섹션을 렌더링하기 위함)
  const expoYearGroups = [];
  expoPhotos.forEach((photo, index) => {
    const meta = expoYearMeta[photo.year] || { labelKo: photo.year, labelEn: photo.year, descKo: '', descEn: '' };
    let group = expoYearGroups.find(g => g.year === photo.year);
    if (!group) {
      group = { year: photo.year, ...meta, items: [] };
      expoYearGroups.push(group);
    }
    group.items.push({ photo, index });
  });

  // 박람회 사진 확대보기(라이트박스) 열기/닫기/이전-다음 이동 함수들
  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % expoPhotos.length);
    }
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + expoPhotos.length) % expoPhotos.length);
    }
  };

  return (
    <div className="daesang-sub-page">
      {/* SECTION: 페이지 상단 히어로 배너 (제목/부제) */}
      <HeroMedia className="daesang-sub-hero" media={media('heroImage')}>
        <div className="daesang-section-overlay"></div>
        <div className="daesang-sub-hero-content">
          <span className="daesang-poetic-sub">{txt('heroEyebrow')}</span>
          <h1 className="cms-text">{txt('heroTitle')}</h1>
          <p className="cms-text">{txt('heroBody')}</p>
        </div>
      </HeroMedia>

      {/* SECTION: 인증서 카드 그리드 (클릭 시 인증서 이미지 팝업) */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <span className="daesang-brand-num">{txt('certEyebrow')}</span>
          <h2 className="daesang-section-h2 cms-text">{txt('certTitle')}</h2>

          <div className="daesang-trust-grid">
            {certifications.map(cert => {
              const hasImage = !!cert.image;
              return (
                <div
                  key={cert.code}
                  className="daesang-trust-card"
                  onClick={hasImage ? () => setSelectedCert(cert) : undefined}
                  style={hasImage ? { cursor: 'pointer' } : undefined}
                  title={hasImage ? (isEn ? 'Click to view certificate' : '클릭하면 인증서를 볼 수 있습니다') : undefined}
                >
                  <span className="trust-code">{cert.code}</span>
                  <h3>{isEn ? cert.titleEn : cert.titleKo}</h3>
                  <p>{isEn ? cert.descEn : cert.descKo}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: 보유 특허/디자인등록 그리드 (클릭 시 증서 이미지 팝업) */}
      <section className="daesang-white-section" style={{ background: '#F8F9FA', borderTop: '1px solid #EAEAEA' }}>
        <div className="daesang-container-wide">
          <span className="daesang-brand-num">{txt('patentEyebrow')}</span>
          <h2 className="daesang-section-h2 cms-text">{txt('patentTitle')}</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '-8px', marginBottom: '20px' }}>
            {txt('patentBody')}
          </p>

          <div className="patents-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
            {patents.map(p => (
              <div
                key={p.no}
                onClick={() => setSelectedPatent(p)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  aspectRatio: '210 / 297',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ flex: 1, minHeight: 0, background: '#F3F4F6', overflow: 'hidden' }}>
                  <img src={p.image} alt={p.titleKo} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{ padding: '8px 10px', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--dh-blue)', letterSpacing: '0.02em' }}>
                    {isEn ? p.typeEn : p.typeKo} {p.no}
                  </span>
                  <p style={{
                    fontSize: '0.75rem', color: '#374151', margin: '3px 0 0',
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {isEn ? p.titleEn : p.titleKo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: 연도별 해외 박람회 참가 사진 갤러리 (연도마다 하나의 섹션으로 반복 렌더링) */}
      {expoYearGroups.map(({ year, labelKo, labelEn, descKo, descEn, items }, groupIdx) => (
        <section
          key={year}
          className="daesang-white-section"
          style={{
            borderTop: '1px solid #EAEAEA',
            background: groupIdx % 2 === 1 ? '#F8F9FA' : undefined
          }}
        >
          <div className="daesang-container-wide">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="daesang-brand-num">GLOBAL EXHIBITION</span>
                <h2 className="daesang-section-h2" style={{ marginBottom: '8px' }}>
                  {isEn ? labelEn : labelKo}
                </h2>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>
                  {isEn ? descEn : descKo}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {items.map(({ photo, index }) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    height: '180px',
                    background: '#EAEAEA',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                  }}
                >
                  <img
                    src={photo.image}
                    alt={isEn ? photo.titleEn : photo.titleKo}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7) 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '10px 12px'
                  }}>
                    <span style={{ color: '#FFF', fontSize: '0.78rem', opacity: 0.9 }}>
                      {isEn ? photo.locationEn : photo.locationKo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* SECTION: 대형 유통 파트너사(마트/편의점 등) 로고 벽 */}
      <section className="daesang-white-section" style={{ background: expoYearGroups.length % 2 === 1 ? '#F8F9FA' : undefined, borderTop: '1px solid #EAEAEA' }}>
        <div className="daesang-container-wide">
          <span className="daesang-brand-num">{txt('networkEyebrow')}</span>
          <h2 className="daesang-section-h2 cms-text">{txt('networkTitle')}</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginTop: '30px' }}>
            {partners.map(p => (
              <div
                key={p.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '110px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <img src={p.logo} alt={p.nameKo} style={{ maxHeight: '70px', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '0.82rem', color: '#666', marginTop: '4px', fontWeight: 500 }}>
                  {isEn ? p.nameEn : p.nameKo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: 반려동물 전문 유통사 로고 벽 */}
      <section className="daesang-white-section" style={{ background: expoYearGroups.length % 2 === 0 ? '#F8F9FA' : undefined, borderTop: '1px solid #EAEAEA' }}>
        <div className="daesang-container-wide">
          <span className="daesang-brand-num">{txt('networkEyebrow')}</span>
          <h2 className="daesang-section-h2 cms-text">{txt('petRetailTitle')}</h2>
          <p style={{ color: 'var(--dh-text-muted)', fontSize: '0.85rem', marginTop: '-16px', marginBottom: '20px', wordBreak: 'keep-all' }}>
            {txt('petRetailBody')}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }} className="pet-retail-grid">
            {petRetailPartners.map(p => (
              <div
                key={p.id}
                style={{
                  background: p.logo ? '#FFFFFF' : '#FAFAFA',
                  border: p.logo ? '1px solid #E5E7EB' : '1px dashed #E5E7EB',
                  borderRadius: '10px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: p.logo ? 'flex-start' : 'center',
                  height: '110px',
                  boxShadow: p.logo ? '0 2px 6px rgba(0,0,0,0.02)' : undefined
                }}
              >
                {p.logo ? (
                  <>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <img src={p.logo} alt={p.nameKo} style={{ maxHeight: '45px', maxWidth: '90px', objectFit: 'contain' }} />
                    </div>
                    <span style={{ fontSize: '0.82rem', color: '#666', marginTop: '4px', fontWeight: 500 }}>
                      {isEn ? p.nameEn : p.nameKo}
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 600 }}>
                    {isEn ? 'Coming Soon' : '로고 추가 예정'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: 인증서 확대 팝업 */}
      {selectedCert !== null && (
        <div className="modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCert(null)}>&times;</button>
            <img
              src={isEn ? selectedCert.imageEn : selectedCert.image}
              alt={isEn ? selectedCert.titleEn : selectedCert.titleKo}
            />
            <div className="modal-caption">
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
                  {selectedCert.code} — {isEn ? selectedCert.titleEn : selectedCert.titleKo}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: 특허/디자인등록 증서 확대 팝업 */}
      {selectedPatent !== null && (
        <div className="modal-backdrop" onClick={() => setSelectedPatent(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPatent(null)}>&times;</button>
            <img src={selectedPatent.image} alt={selectedPatent.titleKo} />
            <div className="modal-caption" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
                {(isEn ? selectedPatent.typeEn : selectedPatent.typeKo)} {selectedPatent.no}
              </h4>
              <span style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>
                {isEn ? selectedPatent.titleEn : selectedPatent.titleKo}
              </span>
              {isEn && (
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  Original certificate issued in Korean by the Korean Intellectual Property Office (KIPO); title translated above for reference.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: 박람회 사진 확대(라이트박스) 팝업 - 이전/다음 이동 가능 */}
      {selectedPhotoIndex !== null && (
        <div className="modal-backdrop" onClick={closeLightbox}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeLightbox}>&times;</button>
            <img 
              src={expoPhotos[selectedPhotoIndex].image} 
              alt={expoPhotos[selectedPhotoIndex].titleKo} 
            />
            <div className="modal-caption">
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
                  {isEn ? expoPhotos[selectedPhotoIndex].titleEn : expoPhotos[selectedPhotoIndex].titleKo}
                </h4>
                <span style={{ fontSize: '0.85rem', color: '#AAA' }}>
                  {isEn ? expoPhotos[selectedPhotoIndex].locationEn : expoPhotos[selectedPhotoIndex].locationKo} ({selectedPhotoIndex + 1} / {expoPhotos.length})
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="modal-nav-btn" onClick={prevPhoto}>&larr; {isEn ? 'Prev' : '이전'}</button>
                <button className="modal-nav-btn" onClick={nextPhoto}>{isEn ? 'Next' : '다음'} &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 이 파일은 "제품 카탈로그" 페이지입니다 (주소: /catalog).
// 카테고리(사료/간식/모래/용품)와 브랜드로 제품을 필터링해서 목록으로 보여주고,
// 각 카드를 클릭하면 제품 상세 페이지(/catalog/:productId)로 이동합니다.
import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { usePageContent } from '../content/usePageContent';
import HeroMedia from '../components/HeroMedia';

// 카테고리 한글명 -> 영문명 매핑 (영어 모드일 때 표시용)
const CATEGORY_EN = {
  '사료': 'Feed',
  '간식': 'Treats',
  '모래': 'Litter',
  '용품': 'Supplies'
};

export default function Catalog() {
  const { lang } = useLanguage();
  const { brands, products } = useData();
  const { txt, media } = usePageContent('catalog'); // 관리자 페이지에서 고칠 수 있는 배너 문구/사진
  const isEn = lang === 'en';
  const [searchParams] = useSearchParams(); // 다른 페이지에서 ?category=..&brand=.. 형태로 넘어온 값 읽기

  const initialCategory = searchParams.get('category') || '전체';
  const initialBrand = searchParams.get('brand') || '전체';

  // 현재 선택된 카테고리/브랜드 필터 상태
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const isFirstRender = useRef(true);

  // 필터를 바꿀 때마다 페이지 맨 위로 스크롤 (단, 첫 진입 시에는 제외)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [selectedCategory, selectedBrand]);

  // 선택된 카테고리/브랜드 조건에 맞는 제품만 추려내기
  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === '전체' || p.category === selectedCategory;
    const matchBrand = selectedBrand === '전체' || p.brandId === selectedBrand;
    return matchCat && matchBrand;
  });

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

      {/* SECTION: 필터 영역 + 제품 그리드 */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          {/* SECTION: 카테고리/브랜드 필터 버튼들 */}
          <div className="daesang-filter-bar">
            <div className="filter-group">
              <span className="filter-label">CATEGORY:</span>
              {['전체', '사료', '간식', '모래', '용품'].map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === '전체' ? (isEn ? 'ALL' : '전체') : (isEn ? CATEGORY_EN[cat] : cat)}
                </button>
              ))}
            </div>

            <div className="filter-group">
              <span className="filter-label">BRAND:</span>
              <button
                className={`filter-btn ${selectedBrand === '전체' ? 'active' : ''}`}
                onClick={() => setSelectedBrand('전체')}
              >
                {isEn ? 'ALL BRANDS' : '전체 브랜드'}
              </button>
              {brands.map(b => (
                <button
                  key={b.id}
                  className={`filter-btn ${selectedBrand === b.id ? 'active' : ''}`}
                  onClick={() => setSelectedBrand(b.id)}
                >
                  {isEn ? (b.nameEn || b.nameKo) : b.nameKo}
                </button>
              ))}
            </div>
          </div>

          <div style={{ margin: '24px 0 40px', color: '#71717A', fontSize: '0.9rem' }}>
            TOTAL {filteredProducts.length} PRODUCTS
          </div>

          {/* SECTION: 필터링된 제품 카드 목록 */}
          <div className="daesang-product-catalog-grid">
            {filteredProducts.map(p => {
              const b = brands.find(brand => brand.id === p.brandId);
              return (
                <Link to={`/catalog/${p.id}`} key={p.id} className="daesang-catalog-card">
                  <div className="catalog-card-image" style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                    <img 
                      src={p.image} 
                      alt={p.nameKo} 
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                      onError={(e) => {
                        e.target.onerror = null;
                        if (b?.logo) {
                          e.target.src = b.logo;
                        } else {
                          e.target.style.display = 'none';
                        }
                      }}
                    />
                  </div>
                  <div className="catalog-card-header">
                    <span className="catalog-brand-name">{isEn ? (b?.nameEn || b?.nameKo) : b?.nameKo}</span>
                    <span className="catalog-cat-badge">{isEn ? (CATEGORY_EN[p.category] || p.category) : p.category}</span>
                  </div>
                  <h3>{isEn ? p.nameEn : p.nameKo}</h3>
                  <p className="catalog-spec">{p.spec || (isEn ? 'See specification' : '규격 정보 참조')}</p>
                  <div className="catalog-card-footer">
                    <span>CODE: {p.code}</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

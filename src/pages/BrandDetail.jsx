// 이 파일은 "브랜드 상세" 페이지입니다 (주소: /brands/:brandId, /imported-brands/:brandId).
// 브랜드 목록/수입 브랜드 목록 페이지에서 카드를 클릭하면 이 페이지로 이동하며,
// 해당 브랜드 소개와 그 브랜드에 속한 제품들을 함께 보여줍니다.
import React from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import './BrandDetail.css';

const BrandDetail = () => {
  const { brandId } = useParams(); // 주소창의 :brandId 값
  const { lang } = useLanguage();
  const { brands, products } = useData();
  const location = useLocation();
  const isImportedRoute = location.pathname.startsWith('/imported-brands');

  const brand = brands.find(b => b.id === brandId);

  // 존재하지 않는 브랜드 id로 접근하면 목록 페이지로 돌려보냄
  if (!brand) {
    return <Navigate to={isImportedRoute ? '/imported-brands' : '/brands'} replace />;
  }

  const isEn = lang === 'en';

  // Filter only authentic products for this brand
  const brandProducts = products.filter(p => p.brandId === brand.id);

  return (
    <div className="brand-detail-page">
      {/* SECTION: 브랜드 히어로 영역 (브랜드 색상 배경, 로고, 슬로건, 소개 문구) */}
      <section className="brand-detail-hero" style={{ '--brand-bg': brand.color || '#1B3A91' }}>
        <div className="container">
          <div className="brand-hero-content">
            <div className="brand-logo-large-container">
              {brand.hasLogo ? (
                <img src={brand.logo} alt={isEn ? brand.nameEn : brand.nameKo} className="brand-logo-large" style={{ transform: `scale(${brand.logoScale || 1})` }} />
              ) : (
                <h1 className="brand-text-logo-large">{isEn ? brand.nameEn : brand.nameKo}</h1>
              )}
            </div>
            <h2>{isEn ? brand.nameEn : brand.nameKo}</h2>
            <p className="brand-hero-tagline">{isEn ? (brand.taglineEn || brand.tagline) : brand.tagline}</p>
            <p className="brand-hero-desc">
              {isEn
                ? 'Aiming for a healthy life for pets through top quality and innovative research. We satisfy both customers and pets through strict quality control and reliable ingredients.'
                : '최고의 품질과 혁신적인 연구로 반려동물의 건강한 삶을 지향합니다. 엄격한 품질 관리와 믿을 수 있는 원료를 통해 고객과 반려동물 모두에게 만족을 드립니다.'}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: 이 브랜드에 속한 제품 목록 (없으면 안내 문구 표시) */}
      <section className="brand-products-section">
        <div className="container">
          {brandProducts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8', fontSize: '0.9rem' }}>
              {isEn ? 'Products for this brand will be added soon.' : '해당 브랜드의 제품이 곧 추가될 예정입니다.'}
            </p>
          ) : (
          <div className="products-grid">
            {brandProducts.map(product => (
              <Link to={`/catalog/${product.id}`} className="product-card" key={product.id}>
                <div className="product-image-container" style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', padding: '12px', borderRadius: '8px 8px 0 0' }}>
                  <img 
                    src={product.image} 
                    alt={product.nameKo} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      if (brand.logo) {
                        e.target.src = brand.logo;
                      } else {
                        e.target.style.display = 'none';
                      }
                    }}
                  />
                </div>
                <div className="product-card-info">
                  <div className="product-tags">
                    <span className="tag category">{product.category}</span>
                    <span className="tag pet-type">{product.petType}</span>
                  </div>
                  <h4>{isEn ? product.nameEn : product.nameKo}</h4>
                  <p className="product-spec">{product.spec}</p>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrandDetail;

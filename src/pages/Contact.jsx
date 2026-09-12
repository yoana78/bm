// 이 파일은 "문의하기" 페이지입니다 (주소: /contact).
// 영업 담당자 명함, 회사 연락처 정보, 문의 입력 폼을 보여줍니다.
// 이 사이트는 서버가 없는 정적 사이트라서, 문의 폼은 Web3Forms(무료 폼-이메일 중계 서비스)를 통해
// 방문자가 버튼만 누르면 자동으로 이메일이 전송되도록 구현되어 있습니다 (메일 앱을 열 필요 없음).
// 수신 이메일은 Web3Forms 계정에 등록된 주소로 가며, https://web3forms.com 에서 바꿀 수 있습니다.
import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { usePageContent } from '../content/usePageContent';
import { useSiteList } from '../content/siteLists';
import HeroMedia from '../components/HeroMedia';

const WEB3FORMS_ACCESS_KEY = '8207939c-fd68-4c59-ae20-62ea022b6952';

export default function Contact() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const { brands, siteSettings } = useData();
  const { txt, media } = usePageContent('contact'); // 관리자 페이지에서 고칠 수 있는 문구/사진
  const businessCards = useSiteList('businessCards'); // 관리자 페이지에서 수정할 수 있는 명함 목록

  // 문의 폼 입력값 상태
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    category: 'export', // export, domestic, other
    brand: brands[0]?.id || '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const [activeCardModal, setActiveCardModal] = useState(null); // 확대해서 보고 있는 명함 이미지 (없으면 null)

  // 폼 입력 필드가 바뀔 때마다 상태 업데이트
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 폼 제출 시 실행 - Web3Forms API로 문의 내용을 전송해 방문자가 메일 앱을 열지 않고도 바로 접수되게 함
  const handleSubmit = async (e) => {
    e.preventDefault();
    const typeLabel = formData.category === 'export'
      ? (isEn ? 'Global Export' : '해외수출')
      : formData.category === 'domestic'
      ? (isEn ? 'Domestic Retail' : '국내입점')
      : (isEn ? 'General' : '기타');

    const selectedBrand = brands.find(b => b.id === formData.brand);
    const brandLabel = selectedBrand ? (isEn ? (selectedBrand.nameEn || selectedBrand.nameKo) : selectedBrand.nameKo) : '-';

    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[BOOMYUNG 문의 - ${typeLabel}] ${formData.company || '(회사명 미입력)'}`,
          from_name: formData.company || formData.name,
          '문의 유형': typeLabel,
          '회사명': formData.company,
          '담당자': formData.name,
          email: formData.email,
          '연락처': formData.phone,
          '국가/지역': formData.country,
          '관심 브랜드': brandLabel,
          '상세 문의 내용': formData.message
        })
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || 'submit failed');

      alert(isEn
        ? '[' + typeLabel + '] Thank you. Our B2B sales team will contact you shortly.'
        : `[${typeLabel}] 문의가 접수되었습니다. 담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.`);
      setFormData({ company: '', name: '', email: '', phone: '', country: '', category: 'export', brand: brands[0]?.id || '', message: '' });
    } catch (err) {
      alert(isEn
        ? 'Failed to send your inquiry. Please try again or contact us directly by phone/email.'
        : '문의 전송에 실패했습니다. 잠시 후 다시 시도하시거나 전화/이메일로 직접 문의해 주세요.');
    } finally {
      setSubmitting(false);
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

      {/* SECTION 1: BUSINESS CARDS SHOWCASE (영업 1팀 / 2팀 명함) */}
      <section className="daesang-white-section" style={{ borderBottom: '1px solid var(--dh-border)' }}>
        <div className="daesang-container-wide">
          <div style={{ marginBottom: '24px' }}>
            <span className="daesang-brand-num">{txt('cardsEyebrow')}</span>
            <h2 className="daesang-section-h2 cms-text" style={{ marginBottom: '8px' }}>
              {txt('cardsTitle')}
            </h2>
            <p className="cms-text" style={{ color: 'var(--dh-text-muted)', fontSize: '0.82rem' }}>
              {txt('cardsBody')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {businessCards.map(card => {
              const currentImg = isEn ? card.imgEn : card.imgKr;
              return (
                <div
                  key={card.id}
                  className="business-card"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--dh-border)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0, 102, 179, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--dh-blue)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {isEn ? card.titleEn : card.titleKo}
                    </span>
                  </div>

                  <div
                    className="business-card-image"
                    onClick={() => setActiveCardModal(currentImg)}
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid var(--dh-border)',
                      cursor: 'pointer',
                      background: '#FFFFFF',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      aspectRatio: '936 / 520',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <img
                      src={currentImg}
                      alt={isEn ? card.titleEn : card.titleKo}
                      style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', transition: 'transform 0.25s ease' }}
                    />
                  </div>

                  <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--dh-text-muted)', textAlign: 'center', lineHeight: 1.45 }}>
                    {isEn ? card.descEn : card.descKo}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: FORM & HEADQUARTERS INFO */}
      <section className="daesang-white-section">
        <div className="daesang-container-wide">
          <div className="daesang-contact-grid">
            <div className="contact-info-col">
              <span className="daesang-brand-num">{txt('hqEyebrow')}</span>
              <h2 className="cms-text">{txt('hqTitle')}</h2>
              <p className="contact-desc cms-text">
                {txt('hqBody')}
              </p>

              <div className="contact-meta">
                <div className="meta-row">
                  <strong>ADDRESS:</strong>
                  <span className="cms-text">{txt('hqAddress')}</span>
                </div>
                <div className="meta-row">
                  <strong>TEL:</strong>
                  <span>{txt('hqTel')}</span>
                </div>
                <div className="meta-row">
                  <strong>FAX:</strong>
                  <span>{txt('hqFax')}</span>
                </div>
                <div className="meta-row">
                  <strong>E-MAIL:</strong>
                  <span>{siteSettings.contactEmail}</span>
                </div>
                <div className="meta-row">
                  <strong>{isEn ? 'BIZ REG NO.:' : '사업자등록번호:'}</strong>
                  <span>{txt('hqBizNo')}</span>
                </div>
              </div>
            </div>

            <div className="contact-form-col">
              <form onSubmit={handleSubmit} className="daesang-contact-form">
                {/* SECTION: 문의 유형 선택 (수출/국내입점/기타) */}
                <div className="form-group">
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--dh-navy)' }}>
                    {isEn ? 'Inquiry Type / Category *' : '문의 유형 (유입 목적) *'}
                  </label>
                  <select name="category" value={formData.category} onChange={handleChange} style={{ fontWeight: 600, background: '#F8FAFC' }}>
                    <option value="export">✈️ {isEn ? 'Global Export Partnership (해외 수출 문의)' : '해외 수출 문의 (Global Export)'}</option>
                    <option value="domestic">🛒 {isEn ? 'Domestic Retail Distribution (국내 유통/입점 문의)' : '국내 대형마트 / 편의점 / 이커머스 입점 문의'}</option>
                    <option value="other">🤝 {isEn ? 'Other / OEM / ODM (기타 및 제품 제휴)' : '기타 / OEM · ODM / 일반 제휴 문의'}</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{isEn ? 'Company Name *' : '회사명 (업체명) *'}</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder={isEn ? "e.g. Boomyung International" : "예: (주)부명유통"} />
                  </div>
                  <div className="form-group">
                    <label>{isEn ? 'Contact Person *' : '담당자 성함 *'}</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{isEn ? 'Email *' : '이메일 주소 *'}</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>{isEn ? 'Phone / Contact *' : '연락처 *'}</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{isEn ? 'Country / Region' : '국가 / 지역'}</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder={isEn ? "e.g. South Korea, USA, Thailand" : "예: 대한민국, 태국, 미국 등"} />
                  </div>
                  <div className="form-group">
                    <label>{isEn ? 'Interested Brand' : '관심 브랜드'}</label>
                    <select name="brand" value={formData.brand} onChange={handleChange}>
                      {brands.map(b => (
                        <option key={b.id} value={b.id}>{isEn ? (b.nameEn || b.nameKo) : b.nameKo}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>{isEn ? 'Inquiry Details *' : '상세 문의 내용 *'}</label>
                  <textarea name="message" rows="5" required value={formData.message} onChange={handleChange} placeholder={isEn ? "Please describe your business inquiry..." : "희망 품목, 희망 수량, 예상 공급 시기 등을 자유롭게 적어주세요."}></textarea>
                </div>

                <button type="submit" className="daesang-form-submit" disabled={submitting} style={submitting ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}>
                  {submitting ? (isEn ? 'Sending...' : '전송 중...') : (isEn ? 'SUBMIT INQUIRY' : '문의 접수하기')} →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 명함 이미지 확대 팝업 (명함 클릭 시 표시) */}
      {activeCardModal && (
        <div className="modal-backdrop" onClick={() => setActiveCardModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', background: '#FFFFFF', padding: '24px' }}>
            <button className="modal-close-btn" onClick={() => setActiveCardModal(null)}>&times;</button>
            <img src={activeCardModal} alt="Business Card High-Res" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>
        </div>
      )}
    </div>
  );
}


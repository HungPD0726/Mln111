import { IoArrowBack, IoSparkles } from 'react-icons/io5';
import './TarotDetailPage.css';

const TarotDetailPage = ({ card, onBack }) => {
  if (!card) {
    return (
      <div className="tarot-detail-page">
        <div className="loading">
          <div className="spinner-large"></div>
          <p>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tarot-detail-page">
      {/* Background Effects */}
      <div className="detail-bg-effects">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      <div className="detail-container">
        {/* Back Button */}
        <button className="back-btn" onClick={onBack}>
          <IoArrowBack />
          <span>Quay lại</span>
        </button>

        {/* Card Display */}
        <div className="detail-content">
          {/* Card Image Section */}
          <div className="detail-card-section" data-aos="fade-right">
            <div className="detail-card-wrapper">
              <div className="detail-card-image">
                <img src={card.image} alt={card.nameVi} />
                <div className="card-shine"></div>
              </div>
              <div className="card-type-badge">
                {card.type === 'major' ? '⭐ Major Arcana' : '🌙 Minor Arcana'}
              </div>
            </div>
          </div>

          {/* Card Information Section */}
          <div className="detail-info-section" data-aos="fade-left">
            <div className="detail-header">
              <h1 className="detail-title">{card.nameVi}</h1>
              <p className="detail-subtitle">{card.name}</p>
            </div>

            {/* Placeholder for detailed information */}
            <div className="detail-meanings">
              <div className="meaning-card">
                <div className="meaning-header">
                  <IoSparkles className="meaning-icon" />
                  <h3>Ý Nghĩa Chung</h3>
                </div>
                <p className="meaning-content">
                  {card.upright || 'Thông tin chi tiết sẽ được cập nhật sau...'}
                </p>
              </div>

              <div className="meaning-card">
                <div className="meaning-header">
                  <span className="meaning-icon">🍀</span>
                  <h3>May Mắn</h3>
                </div>
                <p className="meaning-content">
                  {card.luck || 'Thông tin chi tiết sẽ được cập nhật sau...'}
                </p>
              </div>

              <div className="meaning-card">
                <div className="meaning-header">
                  <span className="meaning-icon">💖</span>
                  <h3>Tình Yêu</h3>
                </div>
                <p className="meaning-content">
                  {card.love || 'Thông tin chi tiết sẽ được cập nhật sau...'}
                </p>
              </div>

              <div className="meaning-card">
                <div className="meaning-header">
                  <span className="meaning-icon">💼</span>
                  <h3>Sự Nghiệp</h3>
                </div>
                <p className="meaning-content">
                  {card.career || 'Thông tin chi tiết sẽ được cập nhật sau...'}
                </p>
              </div>

              {card.reversed && (
                <div className="meaning-card reversed-card">
                  <div className="meaning-header">
                    <span className="meaning-icon">⚠️</span>
                    <h3>Bài Ngược</h3>
                  </div>
                  <p className="meaning-content">{card.reversed}</p>
                </div>
              )}
            </div>

            {/* Placeholder Note */}
            <div className="detail-note">
              <p>
                <IoSparkles /> 
                <em>Thông tin chi tiết và giải nghĩa sâu hơn sẽ được cập nhật trong tương lai...</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotDetailPage;

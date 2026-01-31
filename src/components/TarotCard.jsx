import { useState } from 'react';
import './TarotCard.css';

const TarotCard = ({ card, position, isRevealed, onReveal, isReversed, category, onCardSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryInfo = () => {
    const categories = {
      luck: { 
        name: 'May Mắn', 
      },
      love: { 
        name: 'Tình Yêu', 
      },
      career: { 
        name: 'Sự Nghiệp', 
      }
    };
    return categories[category] || categories.luck;
  };

  const categoryInfo = getCategoryInfo();

  const getMeaning = () => {
    if (!card) return '';
    
    const meanings = {
      luck: card.luck,
      love: card.love,
      career: card.career
    };
    
    return isReversed ? card.reversed : meanings[category];
  };

  return (
    <div className="tarot-card-wrapper">
      {/* Category Header - Simple Text */}
      <div className="card-category-header">
        <h4 className="category-title">{categoryInfo.name.toUpperCase()}</h4>
      </div>

      {/* Card Container */}
      <div 
        className={`tarot-card-3d ${isRevealed ? 'revealed' : ''} ${isHovered ? 'hovered' : ''}`}
        onClick={!isRevealed ? onReveal : null}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ '--category-color': categoryInfo.color }}
      >
        {/* Card Inner (flip container) */}
        <div className="card-inner">
          {/* Card Back */}
          <div className="card-face card-back">
            <div className="card-back-design">
              <div className="card-back-border">
                <div className="card-back-pattern">
                  <div className="mystical-symbol">✦</div>
                  <div className="mystical-circles">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                  </div>
                  <div className="mystical-stars">
                    <span>✧</span>
                    <span>✧</span>
                    <span>✧</span>
                    <span>✧</span>
                  </div>
                </div>
              </div>
            </div>
            {!isRevealed && (
              <div className="click-hint">
                <span className="hint-icon">👆</span>
                <span className="hint-text">Click để lật</span>
              </div>
            )}
          </div>

          {/* Card Front - Full Image */}
          <div className="card-face card-front">
            {card && (
              <>
                {/* Full Card Image - NO overlays */}
                <div className={`card-image-full ${isReversed ? 'reversed-image' : ''}`}>
                  <img 
                    src={card.image} 
                    alt={card.nameVi}
                    className="card-image"
                  />
                </div>

                {/* Card Decorations */}
                <div className="card-decorations">
                  <div className="corner-decoration top-left">✦</div>
                  <div className="corner-decoration top-right">✦</div>
                  <div className="corner-decoration bottom-left">✦</div>
                  <div className="corner-decoration bottom-right">✦</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Glow Effect */}
        {isRevealed && (
          <div className="card-glow" style={{ '--glow-color': categoryInfo.color }}></div>
        )}
      </div>

      {/* Card Info - Below Card when revealed */}
      {isRevealed && card && (
        <div className="card-info-below">
          {/* Reversed Badge - Below card */}
          {isReversed && (
            <div className="reversed-badge">
              <span className="reversed-icon">⚠️</span>
              <span className="reversed-text">BÀI NGƯỢC</span>
            </div>
          )}

          <h3 className="card-name">{card.nameVi}</h3>
          <p className="card-name-en">{card.name}</p>
          
          <div className="card-meaning">
            <p className="meaning-text">{getMeaning()}</p>
          </div>

          <button 
            className="view-details-btn"
            onClick={() => onCardSelect && onCardSelect(card)}
          >
            <span>Xem chi tiết</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TarotCard;

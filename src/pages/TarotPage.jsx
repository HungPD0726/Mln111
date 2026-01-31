import { useState, useEffect } from 'react';
import tarotCards from '../data/tarotData';
import TarotCard from '../components/TarotCard';
import ZodiacSection from '../components/ZodiacSection';
import { IoSparkles, IoRefresh } from 'react-icons/io5';
import './TarotPage.css';

const TarotPage = ({ onCardSelect }) => {
  const [activeTab, setActiveTab] = useState('tarot'); // 'tarot' or 'zodiac'
  const [selectedCards, setSelectedCards] = useState([null, null, null]);
  const [revealedCards, setRevealedCards] = useState([false, false, false]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnToday, setHasDrawnToday] = useState(false);

  useEffect(() => {
    checkTodayReading();
  }, []);

  const checkTodayReading = () => {
    const today = new Date().toDateString();
    const lastReading = localStorage.getItem('tarotLastReading');
    const savedCards = localStorage.getItem('tarotTodayCards');

    if (lastReading === today && savedCards) {
      setHasDrawnToday(true);
      const cards = JSON.parse(savedCards);
      
      // Backward compatibility: convert old format to new format
      const formattedCards = cards.map((card, index) => {
        if (card.data) {
          return card; // Already in new format
        }
        // Old format: convert to new format
        return {
          data: card,
          isReversed: false,
          category: ['luck', 'love', 'career'][index]
        };
      });
      
      setSelectedCards(formattedCards);
      setRevealedCards([true, true, true]);
    }
  };

  const getRandomCards = () => {
    const deck = [...tarotCards];
    const categories = ['luck', 'love', 'career'];
    
    // Fisher-Yates shuffle for unbiased randomization
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    
    // Return first 3 cards with reversed status and category
    return [0, 1, 2].map(index => ({
      data: deck[index],
      isReversed: Math.random() < 0.5, // 50% chance of being reversed
      category: categories[index]
    }));
  };

  const handleDrawCards = () => {
    if (isDrawing) return;

    setIsDrawing(true);
    setRevealedCards([false, false, false]);
    
    // Simulate card shuffling
    setTimeout(() => {
      const cards = getRandomCards();
      setSelectedCards(cards);
      setIsDrawing(false);
      
      // Save to localStorage
      const today = new Date().toDateString();
      localStorage.setItem('tarotLastReading', today);
      localStorage.setItem('tarotTodayCards', JSON.stringify(cards));
      setHasDrawnToday(true);
    }, 1000);
  };

  const handleRevealCard = (index) => {
    const newRevealed = [...revealedCards];
    newRevealed[index] = true;
    setRevealedCards(newRevealed);
  };

  const handleReset = () => {
    localStorage.removeItem('tarotLastReading');
    localStorage.removeItem('tarotTodayCards');
    setSelectedCards([null, null, null]);
    setRevealedCards([false, false, false]);
    setHasDrawnToday(false);
  };

  const allCardsRevealed = revealedCards.every(r => r);

  return (
    <div className="tarot-page">
      {/* Shooting Stars Effect */}
      <div className="shooting-stars">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      <div className="tarot-container">
        {/* Main Header - Always visible */}
        <div className="main-header" data-aos="fade-down">
          <h1 className="main-title">
            <IoSparkles className="title-icon" />
            Bói Toán Huyền Bí
            <IoSparkles className="title-icon" />
          </h1>
          <p className="main-subtitle">Khám phá vận mệnh và tương lai của bạn</p>
        </div>

        {/* Tab Switcher */}
        <div className="tab-switcher" data-aos="fade-up">
          <button
            className={`tab-btn ${activeTab === 'tarot' ? 'active' : ''}`}
            onClick={() => setActiveTab('tarot')}
          >
            🔮 Tarot
          </button>
          <button
            className={`tab-btn ${activeTab === 'zodiac' ? 'active' : ''}`}
            onClick={() => setActiveTab('zodiac')}
          >
            ⭐ Cung Hoàng Đạo
          </button>
        </div>

        {/* Section Header - Changes based on tab */}
        {activeTab === 'tarot' && (
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">Bói Bài Tarot</h2>
            <p className="section-subtitle">Khám phá vận mệnh qua những lá bài huyền bí</p>
          </div>
        )}

        {/* Content */}
        {activeTab === 'tarot' ? (
          <div className="tarot-content">
            {/* Instructions */}
            {selectedCards[0] === null && (
              <div className="instructions" data-aos="fade-up">
                <h3>Cách Rút Bài</h3>
                <p>Bạn sẽ rút 3 lá bài để xem vận may trong:</p>
                <ul>
                  <li><strong>May Mắn</strong> - Vận may chung trong cuộc sống</li>
                  <li><strong>Tình Yêu</strong> - Tình cảm và các mối quan hệ</li>
                  <li><strong>Sự Nghiệp</strong> - Công việc và học tập</li>
                </ul>
                <p className="note">✨ Hãy tập trung suy nghĩ về câu hỏi của bạn trước khi rút bài</p>
              </div>
            )}

            {/* Draw Button */}
            {selectedCards[0] === null && (
              <button
                className="draw-btn"
                onClick={handleDrawCards}
                disabled={isDrawing}
                data-aos="zoom-in"
              >
                {isDrawing ? (
                  <>
                    <div className="spinner"></div>
                    Đang xáo bài...
                  </>
                ) : (
                  <>
                    <IoSparkles />
                    Rút Bài
                  </>
                )}
              </button>
            )}

            {/* Cards Display */}
            {selectedCards[0] !== null && (
              <>
                <div className="cards-container">
                  {selectedCards.map((card, index) => (
                    <TarotCard
                      key={index}
                      card={card.data}
                      position={index}
                      isRevealed={revealedCards[index]}
                      onReveal={() => handleRevealCard(index)}
                      isReversed={card.isReversed}
                      category={card.category}
                      onCardSelect={onCardSelect}
                    />
                  ))}
                </div>

                {/* Reset Button */}
                {allCardsRevealed && (
                  <div className="action-buttons" data-aos="fade-up">
                    <button className="reset-btn" onClick={handleReset}>
                      <IoRefresh />
                      Rút Lại
                    </button>
                    {hasDrawnToday && (
                      <p className="daily-note">
                        💫 Bạn đã rút bài hôm nay. Kết quả đã được lưu!
                      </p>
                    )}
                  </div>
                )}

                {!allCardsRevealed && (
                  <div className="reveal-hint" data-aos="fade-up">
                    <p>👆 Click vào từng lá bài để xem kết quả</p>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <ZodiacSection />
        )}
      </div>
    </div>
  );
};

export default TarotPage;

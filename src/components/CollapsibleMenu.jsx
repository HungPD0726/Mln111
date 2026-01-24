import { useState } from 'react';
import { IoBookSharp, IoGameController, IoInformationCircle, IoClose, IoSparkles, IoMenu, IoPeopleSharp, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import './CollapsibleMenu.css';

const CollapsibleMenu = ({ currentView, onViewChange, onOpenAbout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhilosophersOpen, setIsPhilosophersOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const togglePhilosophers = () => {
    setIsPhilosophersOpen(!isPhilosophersOpen);
  };

  const handleMenuItemClick = (view) => {
    if (view === 'about') {
      onOpenAbout();
    } else {
      onViewChange(view);
    }
    setIsOpen(false); // Close menu after selection
  };

  const menuItems = [
    { id: 'learning', icon: IoBookSharp, label: 'Học tập' },
    { id: 'game', icon: IoGameController, label: 'Trò chơi' },
    { id: 'tarot', icon: IoSparkles, label: 'Tarot' }
  ];

  const philosopherItems = [
    { id: 'lenin', label: 'Vladimir Lenin' },
    { id: 'karlmarx', label: 'Karl Marx' },
    { id: 'engels', label: 'Friedrich Engels' }
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button 
        className="menu-toggle-btn" 
        onClick={toggleMenu}
        aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
      >
        {isOpen ? <IoClose /> : <IoMenu />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="menu-overlay" onClick={toggleMenu}></div>
      )}

      {/* Sidebar Menu */}
      <div className={`collapsible-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2 className="menu-title">
            <IoSparkles className="menu-title-icon" />
            Menu
          </h2>
        </div>

        <nav className="menu-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                className={`menu-item ${isActive ? 'active' : ''}`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                <Icon className="menu-item-icon" />
                <span className="menu-item-label">{item.label}</span>
              </button>
            );
          })}

          {/* Philosophers Submenu */}
          <div className="submenu-container">
            <button
              className={`menu-item submenu-trigger ${isPhilosophersOpen ? 'active' : ''}`}
              onClick={togglePhilosophers}
            >
              <IoPeopleSharp className="menu-item-icon" />
              <span className="menu-item-label">Nhà Triết Học</span>
              {isPhilosophersOpen ? <IoChevronUp className="submenu-arrow" /> : <IoChevronDown className="submenu-arrow" />}
            </button>
            
            <div className={`submenu ${isPhilosophersOpen ? 'open' : ''}`}>
              {philosopherItems.map((item) => {
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    className={`submenu-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick(item.id)}
                  >
                    <span className="submenu-item-label">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* About Button */}
          <button
            className="menu-item"
            onClick={() => handleMenuItemClick('about')}
          >
            <IoInformationCircle className="menu-item-icon" />
            <span className="menu-item-label">Giới thiệu</span>
          </button>
        </nav>

        <div className="menu-footer">
          <p className="menu-footer-text">365 Ngày Marx-Lenin</p>
        </div>
      </div>
    </>
  );
};

export default CollapsibleMenu;

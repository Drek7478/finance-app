import React, { useState, useEffect } from 'react';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Deteksi perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'fa-dashboard', color: '#667eea' },
    { id: 'transactions', name: 'Transaksi', icon: 'fa-exchange', color: '#48bb78' },
    { id: 'advice', name: 'Saran', icon: 'fa-lightbulb-o', color: '#ed8936' },
    { id: 'report', name: 'Laporan', icon: 'fa-bar-chart', color: '#4299e1' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Overlay untuk mobile
  const overlay = isMobile && isOpen && (
    <div 
      onClick={toggleSidebar}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999,
        transition: 'all 0.3s ease'
      }}
    />
  );

  // Tombol hamburger untuk mobile
  const hamburgerButton = isMobile && (
    <button
      onClick={toggleSidebar}
      style={{
        position: 'fixed',
        top: '16px',
        left: '16px',
        zIndex: 1001,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '12px',
        padding: '12px',
        color: 'white',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <i className="fa fa-bars fa-lg"></i>
    </button>
  );

  return (
    <>
      {hamburgerButton}
      {overlay}
      
      <div 
        className="vh-100 position-fixed"
        style={{ 
          width: '280px', 
          top: 0, 
          left: isMobile ? (isOpen ? '0' : '-280px') : '0',
          zIndex: 1000,
          background: 'white',
          boxShadow: '2px 0 12px rgba(0,0,0,0.05)',
          transition: 'left 0.3s ease',
          overflowY: 'auto'
        }}
      >
        {/* Logo Area */}
        <div className="text-center py-4 mb-3" style={{ borderBottom: '1px solid #edf2f7' }}>
          <div className="mx-auto mb-3 d-flex align-items-center justify-content-center">
            <img 
              src="/logo.png"
              alt="AturDana Logo"
              style={{
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                objectFit: 'contain',
                borderRadius: '16px',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              style={{
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '18px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="fa fa-pie-chart text-white" style={{ fontSize: isMobile ? '28px' : '36px' }}></i>
            </div>
          </div>
          
          <h5 className="mb-1 fw-bold" style={{ color: '#1a202c', fontSize: isMobile ? '18px' : '22px' }}>
            AturDana
          </h5>
          <small className="text-muted" style={{ fontSize: '10px' }}>
            MANAJEMEN KEUANGAN TERPADU
          </small>
          
          {isMobile && isOpen && (
            <button
              onClick={toggleSidebar}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <i className="fa fa-times"></i>
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="px-3">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                if (isMobile) setIsOpen(false);
              }}
              className="w-100 d-flex align-items-center gap-3 mb-2"
              style={{
                padding: isMobile ? '14px 16px' : '12px 16px',
                borderRadius: '14px',
                border: 'none',
                background: activeMenu === item.id ? `linear-gradient(135deg, ${item.color}12 0%, ${item.color}08 100%)` : 'transparent',
                color: activeMenu === item.id ? item.color : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                fontWeight: activeMenu === item.id ? '600' : '400',
              }}
            >
              <div 
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: isMobile ? '40px' : '36px',
                  height: isMobile ? '40px' : '36px',
                  background: activeMenu === item.id ? `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)` : '#f1f5f9',
                  borderRadius: '12px'
                }}
              >
                <i 
                  className={`fa ${item.icon}`} 
                  style={{ 
                    fontSize: isMobile ? '18px' : '16px', 
                    color: activeMenu === item.id ? 'white' : item.color,
                  }}
                ></i>
              </div>
              <span className="flex-grow-1 text-start" style={{ fontSize: isMobile ? '15px' : '14px' }}>
                {item.name}
              </span>
              {activeMenu === item.id && (
                <i className="fa fa-chevron-right" style={{ fontSize: '12px', color: item.color }}></i>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ borderTop: '1px solid #edf2f7', background: 'white' }}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <i className="fa fa-database text-muted fa-sm"></i>
              <small className="text-muted" style={{ fontSize: '10px' }}>© 2024 AturDana</small>
            </div>
            <i className="fa fa-heart-o text-danger fa-sm" style={{ fontSize: '10px' }}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
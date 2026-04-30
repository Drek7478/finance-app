import React from 'react';

const Dashboard = ({ totalMoney, transactions, isMobile }) => {
  const currentMonth = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  
  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const recentTransactions = transactions.slice(0, isMobile ? 3 : 5);

  const stats = [
    { title: 'Saldo', value: `Rp ${totalMoney.toLocaleString()}`, icon: 'fa-wallet', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { title: 'Pemasukan', value: `Rp ${monthlyIncome.toLocaleString()}`, icon: 'fa-arrow-up', color: '#48bb78' },
    { title: 'Pengeluaran', value: `Rp ${monthlyExpense.toLocaleString()}`, icon: 'fa-arrow-down', color: '#f56565' },
  ];

  return (
    <div>
      <div className="mb-4">
        <h2 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: 'bold', color: '#1a202c' }}>
          Dashboard
        </h2>
        <p className="text-muted" style={{ fontSize: isMobile ? '12px' : '14px' }}>
          <i className="fa fa-calendar me-1"></i> {currentMonth}
        </p>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat, idx) => (
          <div className="col-6 col-md-4" key={idx}>
            <div className="stat-card" style={{ background: stat.color, color: 'white', padding: isMobile ? '16px' : '20px' }}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <i className={`fa ${stat.icon} fa-${isMobile ? 'lg' : '2x'}`} style={{ opacity: 0.9 }}></i>
              </div>
              <h6 style={{ fontSize: isMobile ? '11px' : '13px', opacity: 0.9 }}>{stat.title}</h6>
              <h5 className="fw-bold mb-0" style={{ fontSize: isMobile ? '14px' : '20px' }}>
                {stat.value.length > 15 ? stat.value.substring(0, 12) + '...' : stat.value}
              </h5>
            </div>
          </div>
        ))}
      </div>

      <div className="card-modern p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0" style={{ fontSize: isMobile ? '14px' : '16px' }}>
            <i className="fa fa-clock-o me-2" style={{ color: '#667eea' }}></i>
            Transaksi Terbaru
          </h6>
          <small className="text-muted">{transactions.length} total</small>
        </div>
        
        {recentTransactions.length === 0 ? (
          <div className="text-center py-4">
            <i className="fa fa-inbox fa-2x text-muted mb-2"></i>
            <p className="text-muted mb-0 small">Belum ada transaksi</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            {recentTransactions.map(t => (
              <div key={t.id} className="d-flex justify-content-between align-items-center p-2 p-md-3 rounded-3" style={{ background: '#f7fafc' }}>
                <div className="d-flex align-items-center gap-2 gap-md-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: isMobile ? '32px' : '40px', height: isMobile ? '32px' : '40px', background: t.type === 'income' ? '#48bb7820' : '#f5656520' }}>
                    <i className={`fa ${t.type === 'income' ? 'fa-arrow-up' : 'fa-arrow-down'}`} style={{ color: t.type === 'income' ? '#48bb78' : '#f56565', fontSize: isMobile ? '12px' : '14px' }}></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-semibold" style={{ fontSize: isMobile ? '13px' : '14px' }}>{t.description.length > 20 ? t.description.substring(0, 20) + '...' : t.description}</h6>
                    <small className="text-muted" style={{ fontSize: isMobile ? '10px' : '11px' }}>{t.date}</small>
                  </div>
                </div>
                <span className={`fw-semibold ${t.type === 'income' ? 'text-success' : 'text-danger'}`} style={{ fontSize: isMobile ? '12px' : '14px' }}>
                  {t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
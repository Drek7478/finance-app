import React from 'react';

const TransactionList = ({ transactions, onDelete, isMobile }) => {
  if (transactions.length === 0) {
    return (
      <div className="card-modern p-3 p-md-4 text-center">
        <i className="fa fa-inbox fa-2x fa-3x text-muted mb-3"></i>
        <p className="text-muted mb-0 small">Belum ada transaksi</p>
      </div>
    );
  }

  return (
    <div className="card-modern p-3 p-md-4">
      <h6 className="fw-bold mb-3" style={{ fontSize: isMobile ? '16px' : '18px' }}>
        <i className="fa fa-list-ul me-2" style={{ color: '#667eea' }}></i>
        Riwayat Transaksi
      </h6>
      
      <div className="d-flex flex-column gap-2" style={{ maxHeight: isMobile ? '400px' : '500px', overflowY: 'auto' }}>
        {transactions.map((t) => (
          <div key={t.id} className="d-flex justify-content-between align-items-center p-2 p-md-3 rounded-3" style={{ background: '#f7fafc' }}>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-semibold" style={{ fontSize: isMobile ? '13px' : '14px' }}>
                  {t.description.length > 25 ? t.description.substring(0, 25) + '...' : t.description}
                </span>
                <span className={`fw-semibold ${t.type === 'income' ? 'text-success' : 'text-danger'}`} style={{ fontSize: isMobile ? '12px' : '14px' }}>
                  {t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString()}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted" style={{ fontSize: isMobile ? '10px' : '11px' }}>
                  <i className="fa fa-calendar me-1"></i>{t.date}
                </small>
                <button
                  onClick={() => onDelete(t.id)}
                  className="border-0 bg-transparent text-danger"
                  style={{ fontSize: isMobile ? '11px' : '12px', cursor: 'pointer' }}
                >
                  <i className="fa fa-trash-o me-1"></i> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-2 text-center">
        <small className="text-muted">Total {transactions.length} transaksi</small>
      </div>
    </div>
  );
};

export default TransactionList;
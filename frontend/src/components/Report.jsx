import React from 'react';

const Report = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseCategories = {
    'Makanan': ['makan', 'minum', 'restoran', 'cafe', 'makanan'],
    'Transportasi': ['transport', 'bensin', 'ojek', 'taxi', 'gojek', 'grab'],
    'Hiburan': ['nonton', 'game', 'music', 'liburan', 'netflix', 'spotify'],
    'Belanja': ['belanja', 'pakaian', 'baju', 'sepatu', 'tas'],
    'Lainnya': []
  };

  const categorizedExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      let category = 'Lainnya';
      for (const [cat, keywords] of Object.entries(expenseCategories)) {
        if (keywords.some(keyword => t.description.toLowerCase().includes(keyword))) {
          category = cat;
          break;
        }
      }
      acc[category] = (acc[category] || 0) + t.amount;
      return acc;
    }, {});

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: '#1a202c', fontSize: '28px' }}>Laporan Keuangan</h2>
        <p className="text-muted" style={{ fontSize: '14px' }}>Analisis keuanganmu</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="stat-card text-center" style={{ background: '#48bb78', color: 'white' }}>
            <i className="fa fa-arrow-up fa-2x mb-2"></i>
            <h6 className="mb-1">Total Pemasukan</h6>
            <h4 className="fw-bold mb-0">Rp {totalIncome.toLocaleString()}</h4>
          </div>
        </div>
        <div className="col-md-6">
          <div className="stat-card text-center" style={{ background: '#f56565', color: 'white' }}>
            <i className="fa fa-arrow-down fa-2x mb-2"></i>
            <h6 className="mb-1">Total Pengeluaran</h6>
            <h4 className="fw-bold mb-0">Rp {totalExpense.toLocaleString()}</h4>
          </div>
        </div>
      </div>

      <div className="card-modern p-4 mb-4">
        <h6 className="fw-bold mb-3">Kategori Pengeluaran</h6>
        {Object.keys(categorizedExpenses).length === 0 ? (
          <p className="text-muted text-center py-3 mb-0">Belum ada data pengeluaran</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {Object.entries(categorizedExpenses)
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => {
                const percentage = totalExpense > 0 ? (amount / totalExpense * 100).toFixed(0) : 0;
                return (
                  <div key={category}>
                    <div className="d-flex justify-content-between mb-1">
                      <span style={{ fontSize: '13px' }}>{category}</span>
                      <span className="fw-semibold" style={{ fontSize: '13px' }}>Rp {amount.toLocaleString()}</span>
                    </div>
                    <div className="rounded-3 overflow-hidden" style={{ height: '8px', background: '#e2e8f0' }}>
                      <div 
                        className="h-100 rounded-3"
                        style={{ width: `${percentage}%`, background: 'linear-gradient(90deg, #667eea, #764ba2)' }}
                      ></div>
                    </div>
                    <small className="text-muted" style={{ fontSize: '11px' }}>{percentage}% dari total pengeluaran</small>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className="card-modern p-4">
        <h6 className="fw-bold mb-3">Semua Transaksi</h6>
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ fontSize: '12px' }}>Tanggal</th>
                <th style={{ fontSize: '12px' }}>Deskripsi</th>
                <th style={{ fontSize: '12px' }} className="text-end">Nominal</th>
                <th style={{ fontSize: '12px' }} className="text-end">Tipe</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    Belum ada transaksi
                  </td>
                </tr>
              ) : (
                transactions.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ fontSize: '13px' }}>{t.date}</td>
                    <td style={{ fontSize: '13px' }}>{t.description}</td>
                    <td className="text-end" style={{ fontSize: '13px' }}>Rp {t.amount.toLocaleString()}</td>
                    <td className="text-end">
                      <span className={`badge bg-${t.type === 'income' ? 'success' : 'danger'} bg-opacity-10 px-2 py-1 rounded-pill`}
                            style={{ fontSize: '11px', color: t.type === 'income' ? '#48bb78' : '#f56565' }}>
                        {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
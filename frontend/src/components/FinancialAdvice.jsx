import React from 'react';

const FinancialAdvice = ({ totalMoney }) => {
  const getWeeklySuggestion = () => {
    if (totalMoney <= 0) {
      return {
        message: "Anda tidak memiliki uang, segera cari pemasukan.",
        color: "#f56565",
        icon: "fa-exclamation-triangle"
      };
    }
    
    const daysLeft = 7;
    const dailyMax = totalMoney / daysLeft;
    
    if (dailyMax < 20000) {
      return {
        message: `Batasi pengeluaran maksimal Rp ${dailyMax.toLocaleString()}/hari untuk 7 hari ke depan.`,
        color: "#ed8936",
        icon: "fa-exclamation-circle"
      };
    } else if (dailyMax < 50000) {
      return {
        message: `Saran: maksimal Rp ${dailyMax.toLocaleString()}/hari agar keuangan stabil.`,
        color: "#4299e1",
        icon: "fa-info-circle"
      };
    } else {
      return {
        message: `Anda bisa mengeluarkan hingga Rp ${dailyMax.toLocaleString()}/hari. Tetap bijak!`,
        color: "#48bb78",
        icon: "fa-check-circle"
      };
    }
  };

  const getTodaySuggestion = () => {
    if (totalMoney <= 0) return "Fokus cari pemasukan, hindari pengeluaran hari ini.";
    const maxToday = totalMoney * 0.3;
    if (maxToday < 10000) {
      return `Hari ini batasi belanja < Rp ${maxToday.toLocaleString()}, hanya untuk kebutuhan darurat.`;
    }
    return `Hari ini maksimal belanja Rp ${maxToday.toLocaleString()} untuk kebutuhan penting.`;
  };

  const weeklyAdvice = getWeeklySuggestion();

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: '#1a202c', fontSize: '28px' }}>Saran Keuangan</h2>
        <p className="text-muted" style={{ fontSize: '14px' }}>Rekomendasi untukmu</p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card-modern p-4" style={{ borderTop: `4px solid ${weeklyAdvice.color}` }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className={`fa ${weeklyAdvice.icon} fa-lg`} style={{ color: weeklyAdvice.color }}></i>
              <h6 className="fw-bold mb-0">Saran Mingguan (7 Hari)</h6>
            </div>
            <p className="mb-0" style={{ fontSize: '14px', lineHeight: '1.5' }}>{weeklyAdvice.message}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-modern p-4" style={{ borderTop: '4px solid #4299e1' }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="fa fa-sun-o fa-lg" style={{ color: '#4299e1' }}></i>
              <h6 className="fw-bold mb-0">Saran Hari Ini</h6>
            </div>
            <p className="mb-0" style={{ fontSize: '14px', lineHeight: '1.5' }}>{getTodaySuggestion()}</p>
          </div>
        </div>
      </div>

      <div className="card-modern p-4 mt-4">
        <h6 className="fw-bold mb-3" style={{ color: '#1a202c' }}>
          <i className="fa fa-lightbulb-o me-2" style={{ color: '#ed8936' }}></i>
          Tips Mengatur Keuangan
        </h6>
        <div className="row g-2">
          {[
            'Catat setiap pengeluaran sekecil apapun',
            'Targetkan tabungan minimal 20% dari pemasukan',
            'Hindari pembelian impulsif (tunggu 24 jam)',
            'Evaluasi keuangan setiap minggu',
            'Buat anggaran bulanan yang realistis',
            'Prioritaskan kebutuhan daripada keinginan'
          ].map((tip, i) => (
            <div className="col-md-6" key={i}>
              <div className="d-flex align-items-center gap-2 p-2 rounded-3" style={{ background: '#f7fafc' }}>
                <i className="fa fa-check-circle" style={{ color: '#48bb78', fontSize: '12px' }}></i>
                <span style={{ fontSize: '13px' }}>{tip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialAdvice;
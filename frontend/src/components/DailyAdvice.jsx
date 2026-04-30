import React from 'react';

const DailyAdvice = ({ totalMoney }) => {
  // Diasumsikan sisa hari ini dari jam sekarang sampai tengah malam (misal sisa 12 jam dari jam 12 siang)
  // Tapi untuk demo, kita anggap sisa hari ini = 1 hari penuh (24 jam)
  // Lebih realistis: user bisa input sisa hari ini? Lebih sederhana: saran per hari dari total uang
  
  const getDailySuggestion = () => {
    if (totalMoney <= 0) return "Anda tidak memiliki uang, segera cari pemasukan.";
    
    // Asumsi: uang ini harus cukup untuk kebutuhan hari ini (makan, transport, dll)
    // Kita kasih saran maksimal pengeluaran per hari agar tidak boncos terlalu cepat
    // Misal uang untuk 7 hari ke depan
    const daysLeft = 7;
    const dailyMax = totalMoney / daysLeft;
    
    if (dailyMax < 20000) {
      return `⚠️ Saran: Anda hanya boleh mengeluarkan maksimal Rp ${dailyMax.toLocaleString()} per hari untuk 7 hari ke depan. Sangat hemat!`;
    } else if (dailyMax < 50000) {
      return `📌 Saran: Batasi pengeluaran maksimal Rp ${dailyMax.toLocaleString()} per hari agar keuangan stabil 7 hari.`;
    } else {
      return `✅ Saran: Dengan saldo Rp ${totalMoney.toLocaleString()}, Anda bisa mengeluarkan hingga Rp ${dailyMax.toLocaleString()} per hari untuk 7 hari ke depan. Tetap bijak!`;
    }
  };

  // Saran khusus untuk "hari ini" (pengeluaran hari ini)
  const getTodaySuggestion = () => {
    if (totalMoney <= 0) return "Hari ini jangan keluar uang, fokus cari pemasukan.";
    // Asumsi sisa hari ini (misal dari jam sekarang, kita asumsi 12 jam tersisa)
    // Kita sederhanakan: maksimal pengeluaran hari ini = 30% dari total uang
    const maxToday = totalMoney * 0.3;
    if (maxToday < 10000) {
      return `Hari ini sebaiknya jangan belanja > Rp ${maxToday.toLocaleString()}. Prioritas hanya kebutuhan darurat.`;
    } else {
      return `💡 Hari ini Anda bisa membelanjakan maksimal Rp ${maxToday.toLocaleString()} untuk kebutuhan penting. Sisakan untuk esok.`;
    }
  };

  return (
    <div className="row mb-4">
      <div className="col-md-6 mb-3">
        <div className="card card-custom bg-warning bg-opacity-10 p-3 border-warning">
          <h5><i className="fa fa-calendar-day me-2"></i> Saran Harian (Hari Ini)</h5>
          <p className="mb-0">{getTodaySuggestion()}</p>
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <div className="card card-custom bg-info bg-opacity-10 p-3 border-info">
          <h5><i className="fa fa-chart-line me-2"></i> Saran Mingguan (7 Hari)</h5>
          <p className="mb-0">{getDailySuggestion()}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyAdvice;
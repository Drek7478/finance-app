import React, { useState } from 'react';

const TransactionForm = ({ onAdd, isMobile }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || amount <= 0) {
      alert('Isi deskripsi dan nominal yang valid');
      return;
    }
    
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    const success = await onAdd({
      description,
      amount: parseFloat(amount),
      type,
      date: today
    });
    
    if (success !== false) {
      setDescription('');
      setAmount('');
    }
    setLoading(false);
  };

  return (
    <div className="card-modern p-3 p-md-4">
      <h6 className="fw-bold mb-3" style={{ fontSize: isMobile ? '16px' : '18px' }}>
        <i className="fa fa-plus-circle me-2" style={{ color: '#667eea' }}></i>
        Tambah Transaksi
      </h6>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold" style={{ fontSize: isMobile ? '12px' : '13px' }}>
            Deskripsi
          </label>
          <input
            type="text"
            className="input-modern"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Contoh: Makan siang, Gaji"
            style={{ padding: isMobile ? '10px 12px' : '10px 16px', fontSize: isMobile ? '14px' : '14px' }}
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label fw-semibold" style={{ fontSize: isMobile ? '12px' : '13px' }}>
            Nominal (Rp)
          </label>
          <input
            type="number"
            className="input-modern"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            style={{ padding: isMobile ? '10px 12px' : '10px 16px', fontSize: isMobile ? '14px' : '14px' }}
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label fw-semibold" style={{ fontSize: isMobile ? '12px' : '13px' }}>
            Tipe
          </label>
          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={() => setType('expense')}
              className="flex-grow-1 py-2 rounded-3 border-0 fw-semibold"
              style={{
                background: type === 'expense' ? '#f56565' : '#e2e8f0',
                color: type === 'expense' ? 'white' : '#4a5568',
                fontSize: isMobile ? '13px' : '14px',
                padding: isMobile ? '10px' : '12px'
              }}
            >
              <i className="fa fa-arrow-down me-1"></i> Pengeluaran
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className="flex-grow-1 py-2 rounded-3 border-0 fw-semibold"
              style={{
                background: type === 'income' ? '#48bb78' : '#e2e8f0',
                color: type === 'income' ? 'white' : '#4a5568',
                fontSize: isMobile ? '13px' : '14px',
                padding: isMobile ? '10px' : '12px'
              }}
            >
              <i className="fa fa-arrow-up me-1"></i> Pemasukan
            </button>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn-modern btn-modern-primary w-100 fw-semibold"
          disabled={loading}
          style={{ padding: isMobile ? '12px' : '12px' }}
        >
          {loading ? (
            <><i className="fa fa-spinner fa-spin me-2"></i> Menyimpan...</>
          ) : (
            <><i className="fa fa-save me-2"></i> Simpan</>
          )}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
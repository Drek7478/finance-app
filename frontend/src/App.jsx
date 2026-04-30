import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FinancialAdvice from './components/FinancialAdvice';
import Report from './components/Report';

const API_URL = import.meta.env.VITE_API_URL || 'http://finance-app.test/backend';

const App = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const menuTitles = {
      dashboard: 'Dashboard',
      transactions: 'Transaksi',
      advice: 'Saran',
      report: 'Laporan'
    };
    document.title = `${menuTitles[activeMenu]} | AturDana`;
  }, [activeMenu]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const transactionsRes = await fetch(`${API_URL}/get_transactions.php`);
      const transactionsData = await transactionsRes.json();
      
      const summaryRes = await fetch(`${API_URL}/get_summary.php`);
      const summaryData = await summaryRes.json();
      
      if (transactionsData.success && summaryData.success) {
        setTransactions(transactionsData.data);
        setTotalMoney(summaryData.data.balance);
      } else {
        throw new Error('Failed to load data');
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const response = await fetch(`${API_URL}/add_transaction.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();
      if (data.success) {
        await loadData();
        return true;
      }
      throw new Error(data.message);
    } catch (err) {
      alert('Gagal menambahkan transaksi');
      return false;
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm('Hapus transaksi?')) return false;
    try {
      const response = await fetch(`${API_URL}/delete_transaction.php?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        await loadData();
        return true;
      }
      throw new Error(data.message);
    } catch (err) {
      alert('Gagal menghapus transaksi');
      return false;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <i className="fa fa-spinner fa-spin fa-3x text-primary"></i>
          <p className="mt-3">Memuat data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-5">
          <i className="fa fa-exclamation-triangle fa-3x text-danger"></i>
          <p className="mt-3 text-danger">{error}</p>
          <button className="btn btn-primary mt-3" onClick={loadData}>
            <i className="fa fa-refresh me-2"></i>Coba Lagi
          </button>
        </div>
      );
    }

    switch(activeMenu) {
      case 'dashboard':
        return <Dashboard totalMoney={totalMoney} transactions={transactions} isMobile={isMobile} />;
      case 'transactions':
        return (
          <div className="row g-3">
            <div className={isMobile ? 'col-12' : 'col-md-5'}>
              <TransactionForm onAdd={addTransaction} isMobile={isMobile} />
            </div>
            <div className={isMobile ? 'col-12' : 'col-md-7'}>
              <TransactionList transactions={transactions} onDelete={deleteTransaction} isMobile={isMobile} />
            </div>
          </div>
        );
      case 'advice':
        return <FinancialAdvice totalMoney={totalMoney} isMobile={isMobile} />;
      case 'report':
        return <Report transactions={transactions} isMobile={isMobile} />;
      default:
        return <Dashboard totalMoney={totalMoney} transactions={transactions} isMobile={isMobile} />;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div 
        className="flex-grow-1 p-3 p-md-4" 
        style={{ 
          marginLeft: isMobile ? '0' : '280px',
          width: '100%',
          transition: 'margin-left 0.3s ease'
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
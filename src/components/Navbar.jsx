import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  TrendingUp, 
  CreditCard, 
  Receipt, 
  FileSpreadsheet, 
  Sparkles,
  Plus
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAddCar, onExportExcel, netProfit }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('ar-EG').format(val || 0);
  };

  const navItems = [
    { id: 'dashboard', label: 'لوحة التحليلات', icon: LayoutDashboard },
    { id: 'inventory', label: 'المخزون والسيارات', icon: Car },
    { id: 'sales', label: 'المبيعات والأرباح', icon: TrendingUp },
    { id: 'installments', label: 'الأقساط والمستحقات', icon: CreditCard },
    { id: 'expenses', label: 'مصروفات المعرض', icon: Receipt },
    { id: 'excel', label: 'شيتات Excel', icon: FileSpreadsheet }
  ];

  return (
    <>
      {/* Top Header Banner */}
      <header style={{
        background: 'rgba(2, 6, 23, 0.95)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        <div style={{
          maxWidth: '1350px',
          margin: '0 auto',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.1)'
            }}>
              <span style={{ fontSize: '1.3rem' }}>💎</span>
            </div>
            <div>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.3px',
                lineHeight: 1.2
              }}>
                معرض الماسة للسيارات
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.3px' }}>
                نظام إدارة المبيعات والتكلفة والأرباح
              </div>
            </div>
          </div>

          {/* Profit Pill & Add Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="no-mobile-pill" style={{
              background: 'rgba(99, 102, 241, 0.06)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              padding: '6px 16px',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles size={15} color="var(--accent-primary)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>صافي الربح العام:</span>
              <span className="currency-emerald" style={{ fontSize: '0.92rem' }}>
                {formatCurrency(netProfit)} ج.م
              </span>
            </div>

            <button className="btn-accent" onClick={onOpenAddCar}>
              <Plus size={18} />
              <span>إضافة سيارة جديدة</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          borderTop: '1px solid rgba(148, 163, 184, 0.06)'
        }} className="no-mobile-pill">
          <div style={{
            maxWidth: '1350px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            gap: '2px',
            overflowX: 'auto'
          }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                    color: isActive ? 'var(--accent-light)' : 'var(--text-muted)',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    padding: '12px 18px',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    borderRadius: '0'
                  }}
                >
                  <Icon size={17} color={isActive ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: 'rgba(2, 6, 23, 0.98)',
        borderTop: '1px solid rgba(148, 163, 184, 0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 4px'
      }} className="mobile-only-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: isActive ? 'var(--accent-primary)' : '#64748b',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                fontSize: '0.68rem',
                fontWeight: isActive ? 700 : 500,
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @media (max-width: 991px) {
          .no-mobile-pill {
            display: none !important;
          }
        }
        @media (min-width: 992px) {
          .mobile-only-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

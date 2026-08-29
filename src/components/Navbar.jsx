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
        background: 'rgba(10, 13, 20, 0.95)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(15px)'
      }}>
        <div style={{
          maxWidth: '1350px',
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          
          {/* Logo & Brand Emblem */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1f2738 0%, #0d121c 100%)',
              border: '1.5px solid var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--gold-glow)'
            }}>
              <span style={{ fontSize: '1.4rem' }}>💎</span>
            </div>
            <div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                background: 'var(--gold-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.3px',
                lineHeight: 1.2
              }}>
                معرض الماسة للسيارات
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                نظام إدارة المبيعات والتكلفة والأرباح
              </div>
            </div>
          </div>

          {/* Quick Header Profit Pill & Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="no-mobile-pill" style={{
              background: 'rgba(229, 193, 88, 0.08)',
              border: '1px solid var(--border-active)',
              padding: '6px 14px',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles size={16} color="var(--gold-primary)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 700 }}>صافي الربح العام:</span>
              <span className="currency-emerald" style={{ fontSize: '0.95rem' }}>
                {formatCurrency(netProfit)} ج.م
              </span>
            </div>

            <button className="btn-gold" onClick={onOpenAddCar}>
              <Plus size={18} />
              <span>إضافة سيارة جديدة</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{
          background: '#0e131f',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)'
        }} className="no-mobile-pill">
          <div style={{
            maxWidth: '1350px',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            gap: '6px',
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
                    background: isActive ? 'rgba(229, 193, 88, 0.12)' : 'transparent',
                    color: isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                    border: 'none',
                    borderBottom: isActive ? '2.5px solid var(--gold-primary)' : '2.5px solid transparent',
                    padding: '12px 18px',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={18} color={isActive ? 'var(--gold-primary)' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '65px',
        background: 'rgba(10, 13, 20, 0.98)',
        borderTop: '1px solid var(--border-color)',
        backdropFilter: 'blur(16px)',
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
                color: isActive ? 'var(--gold-primary)' : '#6b7280',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                fontSize: '0.7rem',
                fontWeight: isActive ? 800 : 600,
                width: '100%',
                height: '100%',
                cursor: 'pointer'
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

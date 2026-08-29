import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Car, 
  Receipt, 
  CreditCard, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';

export default function Dashboard({ kpis, cars, expenses, installments, onNavigateTab, onOpenAddCar }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('ar-EG').format(val || 0);
  };

  const soldCars = cars.filter(c => c.status === 'sold');
  const availableCars = cars.filter(c => c.status === 'available');
  const inPrepCars = cars.filter(c => c.status === 'in_prep');

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner / Welcome Owner */}
      <div className="glass-card" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid var(--border-active)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
              <Sparkles size={18} />
              <span>مرحباً بك في نظام معرض الماسة للسيارات</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)' }}>
              لوحة التحكم والمؤشرات المالية الشاملة
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
              ملخص دقيق ومباشر لجميع الأرباح، حركة رأس المال، المبيعات والمصروفات الإدارية.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-accent" onClick={() => onNavigateTab('sales')}>
              <TrendingUp size={18} />
              <span>سجل المبيعات والتسليم</span>
            </button>
            <button className="btn-outline" onClick={() => onNavigateTab('excel')}>
              <span>تصدير شيت Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        
        {/* Card 1: Net Profit (صافي الربح) */}
        <div className="glass-card" style={{
          padding: '20px',
          borderRight: '4px solid var(--emerald)',
          background: 'linear-gradient(180deg, rgba(52, 211, 153, 0.06) 0%, rgba(15, 23, 42, 0.9) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>صافي الربح النهائي المعالج</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--emerald-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={20} color="var(--emerald)" />
            </div>
          </div>
          <div className="currency-emerald" style={{ fontSize: '1.85rem', marginBottom: '6px' }}>
            {formatCurrency(kpis.netProfit)} ج.م
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>أرباح المبيعات خصم مصروفات المعرض</span>
          </div>
        </div>

        {/* Card 2: Active Inventory Capital (رأس المال في السيارات المتاحة) */}
        <div className="glass-card" style={{
          padding: '20px',
          borderRight: '4px solid var(--accent-primary)',
          background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.06) 0%, rgba(15, 23, 42, 0.9) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>رأس المال المعلق بالمخزون</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={20} color="var(--accent-primary)" />
            </div>
          </div>
          <div className="currency-accent" style={{ fontSize: '1.85rem', marginBottom: '6px' }}>
            {formatCurrency(kpis.inventoryCapital)} ج.م
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            تكلفة شراء وتجهيز {kpis.availableCarsCount} سيارة متاحة بالمعرض
          </div>
        </div>

        {/* Card 3: Gross Sales Revenue (إجمالي إيرادات المبيعات) */}
        <div className="glass-card" style={{
          padding: '20px',
          borderRight: '4px solid var(--sapphire)',
          background: 'linear-gradient(180deg, rgba(96, 165, 250, 0.06) 0%, rgba(15, 23, 42, 0.9) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>إجمالي إيرادات المبايعات</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--sapphire-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={20} color="var(--sapphire)" />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#93c5fd', marginBottom: '6px', fontFamily: 'monospace' }}>
            {formatCurrency(kpis.totalSalesRevenue)} ج.م
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            من إجمالي {kpis.soldCarsCount} سيارة مباعة بالمعرض
          </div>
        </div>

        {/* Card 4: Total Showroom Expenses (إجمالي المصروفات العامة) */}
        <div className="glass-card" style={{
          padding: '20px',
          borderRight: '4px solid var(--ruby)',
          background: 'linear-gradient(180deg, rgba(251, 113, 133, 0.06) 0%, rgba(15, 23, 42, 0.9) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>مصروفات المعرض التشغيلية</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--ruby-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Receipt size={20} color="var(--ruby)" />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fca5a5', marginBottom: '6px', fontFamily: 'monospace' }}>
            {formatCurrency(kpis.totalExpenses)} ج.م
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            إيجارات، كهرباء، رواتب، وتسويق
          </div>
        </div>

        {/* Card 5: Outstanding Installments (أقساط ومستحقات العملاء) */}
        <div className="glass-card" style={{
          padding: '20px',
          borderRight: '4px solid var(--amber)',
          background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.06) 0%, rgba(15, 23, 42, 0.9) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>ديون وأقساط العملاء المتبقية</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--amber-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={20} color="var(--amber)" />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fcd34d', marginBottom: '6px', fontFamily: 'monospace' }}>
            {formatCurrency(kpis.totalInstallmentsDebt)} ج.م
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            مستحقات آجلة قيد التحصيل الفعلي
          </div>
        </div>
      </div>

      {/* Middle Section: Quick Status Breakdown & Recent Sales */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        
        {/* Cars Inventory Status Panel */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Car size={20} />
              <span>حالة أسطول السيارات الحالي</span>
            </h3>
            <button className="btn-outline" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => onNavigateTab('inventory')}>
              عرض الكل
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              background: '#0f172a',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid rgba(148, 163, 184, 0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-emerald">متاحة للمعرض</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>سيارات جاهزة للتسليم</span>
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--emerald)' }}>{availableCars.length}</span>
            </div>

            <div style={{
              background: '#0f172a',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid rgba(148, 163, 184, 0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-amber">قيد التجهيز والصيانة</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>في السمكرة والتلميع</span>
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--amber)' }}>{inPrepCars.length}</span>
            </div>

            <div style={{
              background: '#0f172a',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid rgba(148, 163, 184, 0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-sapphire">تم البيع بنجاح</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>تم تسليمها للعملاء</span>
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--sapphire)' }}>{soldCars.length}</span>
            </div>
          </div>
        </div>

        {/* Recent Sold Cars & Profit Highlights */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--accent-primary)" />
              <span>آخر السيارات المباعة وأرباحها</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {soldCars.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                لم يتم تسجيل عمليات بيع حتى الآن
              </div>
            ) : (
              soldCars.slice(0, 3).map(car => (
                <div key={car.id} style={{
                  background: '#0f172a',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid rgba(99, 102, 241, 0.1)'
                }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {car.brand} {car.model} ({car.year})
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      المشتري: {car.saleDetails?.buyerName || 'عميل معرض'} | {car.saleDetails?.paymentMethod === 'cash' ? 'كاش' : 'تقسيط'}
                    </div>
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <div className="currency-emerald" style={{ fontSize: '1rem' }}>
                      +{formatCurrency(car.saleDetails?.netProfit)} ج.م
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-light)' }}>
                      ربح {car.saleDetails?.profitMargin}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Car, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  TrendingUp, 
  DollarSign, 
  Wrench,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Inventory({ cars, onOpenAddCar, onEditCar, onDeleteCar, onOpenSellModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('ar-EG').format(val || 0);
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (car.plateNumber && car.plateNumber.includes(searchTerm));

    const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="badge badge-emerald"><CheckCircle2 size={13} /> متاحة للمعرض</span>;
      case 'sold':
        return <span className="badge badge-sapphire"><TrendingUp size={13} /> تم البيع</span>;
      case 'in_prep':
        return <span className="badge badge-amber"><Wrench size={13} /> قيد التجهيز والصيانة</span>;
      default:
        return <span className="badge badge-amber"><AlertCircle size={13} /> محجوزة</span>;
    }
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Controls Bar */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Car size={24} color="var(--accent-primary)" />
              <span>إدارة المخزون وأسطول السيارات ({filteredCars.length})</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
              إدخال وتتبع بيانات السيارات، تكلفة الشراء، المصروفات، وأسعار البيع المستهدفة.
            </p>
          </div>

          <button className="btn-accent" onClick={onOpenAddCar}>
            <Plus size={18} />
            <span>إضافة سيارة جديدة</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '16px',
          flexWrap: 'wrap'
        }}>
          {/* Search Input */}
          <div style={{ flex: '1 1 280px', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', right: '14px', top: '14px' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingRight: '42px' }}
              placeholder="ابحث بالماركة، الموديل، رقم الشاسي VIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'all', label: 'الكل' },
              { id: 'available', label: 'المتاحة' },
              { id: 'sold', label: 'المباعة' },
              { id: 'in_prep', label: 'قيد التجهيز' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setStatusFilter(btn.id)}
                style={{
                  background: statusFilter === btn.id ? 'var(--accent-gradient)' : 'rgba(148, 163, 184, 0.06)',
                  color: statusFilter === btn.id ? '#020617' : 'var(--text-main)',
                  border: statusFilter === btn.id ? '1px solid transparent' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 16px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cars Grid List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '18px'
      }}>
        {filteredCars.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            لا توجد سيارات مطابقة للبحث المطلوب
          </div>
        ) : (
          filteredCars.map(car => (
            <div key={car.id} className="glass-card" style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
              position: 'relative'
            }}>
              
              {/* Top Header Card */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 800 }}>{car.id}</span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.3 }}>
                      {car.brand} {car.model}
                    </h3>
                  </div>
                  {getStatusBadge(car.status)}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <span style={{ background: '#0f172a', border: '1px solid var(--border-color)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    موديل: <strong style={{ color: 'var(--text-main)' }}>{car.year}</strong>
                  </span>
                  <span style={{ background: '#0f172a', border: '1px solid var(--border-color)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    اللون: <strong style={{ color: 'var(--text-main)' }}>{car.color}</strong>
                  </span>
                  {car.plateNumber && (
                    <span style={{ background: '#0f172a', border: '1px solid var(--border-color)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      اللوحة: <strong style={{ color: 'var(--text-main)' }}>{car.plateNumber}</strong>
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace', background: 'rgba(148, 163, 184, 0.03)', border: '1px solid var(--border-color)', padding: '6px 10px', borderRadius: '6px', marginBottom: '14px' }}>
                  VIN: {car.vin}
                </div>
              </div>

              {/* Financial Breakdown per Car */}
              <div style={{
                background: '#0f172a',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                border: '1px solid rgba(148, 163, 184, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>سعر الشراء:</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{formatCurrency(car.purchasePrice)} ج.م</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>مصروفات الصيانة/التجهيز:</span>
                  <span style={{ color: 'var(--ruby)', fontWeight: 700 }}>+{formatCurrency(car.prepExpenses)} ج.م</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderTop: '1px solid rgba(148, 163, 184, 0.08)', paddingTop: '6px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>إجمالي التكلفة:</span>
                  <span className="currency-accent" style={{ fontSize: '1rem' }}>{formatCurrency(car.totalCost)} ج.م</span>
                </div>

                {car.status === 'sold' && car.saleDetails ? (
                  <div style={{
                    background: 'rgba(52, 211, 153, 0.08)',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(52, 211, 153, 0.2)',
                    marginTop: '4px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--emerald)' }}>سعر البيع الفعلي:</span>
                      <span style={{ fontWeight: 800, color: 'var(--emerald)' }}>{formatCurrency(car.saleDetails.actualSalePrice)} ج.م</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginTop: '2px' }}>
                      <span style={{ color: 'var(--emerald)', fontWeight: 800 }}>صافي الربح المحقق:</span>
                      <span className="currency-emerald">+{formatCurrency(car.saleDetails.netProfit)} ج.م ({car.saleDetails.profitMargin}%)</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>البيع المستهدف:</span>
                    <span style={{ color: 'var(--emerald)', fontWeight: 700 }}>{formatCurrency(car.targetSalePrice)} ج.م</span>
                  </div>
                )}
              </div>

              {/* Card Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', paddingTop: '6px' }}>
                {car.status !== 'sold' ? (
                  <button className="btn-accent" style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }} onClick={() => onOpenSellModal(car)}>
                    <TrendingUp size={16} />
                    <span>إتمام بيع</span>
                  </button>
                ) : (
                  <button className="btn-outline" style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem', borderColor: 'var(--sapphire)', color: '#93c5fd' }}>
                    <span>تم التسليم</span>
                  </button>
                )}

                <button className="btn-outline" style={{ padding: '8px' }} title="تعديل" onClick={() => onEditCar(car)}>
                  <Edit3 size={16} />
                </button>
                <button className="btn-danger" style={{ padding: '8px' }} title="حذف" onClick={() => onDeleteCar(car.id)}>
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

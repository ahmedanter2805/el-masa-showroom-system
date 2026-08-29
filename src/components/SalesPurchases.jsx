import React, { useState } from 'react';
import { 
  TrendingUp, 
  Printer, 
  Search, 
  FileText, 
  Sparkles,
  DollarSign, 
  UserCheck, 
  Calendar 
} from 'lucide-react';

export default function SalesPurchases({ cars, onPrintInvoice }) {
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('ar-EG').format(val || 0);
  };

  const soldCars = cars.filter(c => c.status === 'sold' && c.saleDetails);

  const filteredSales = soldCars.filter(car => {
    const details = car.saleDetails;
    return (
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (details?.buyerName && details.buyerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (details?.buyerPhone && details.buyerPhone.includes(searchTerm))
    );
  });

  const totalRevenue = filteredSales.reduce((sum, c) => sum + (c.saleDetails?.actualSalePrice || 0), 0);
  const totalCost = filteredSales.reduce((sum, c) => sum + (c.totalCost || 0), 0);
  const totalProfit = filteredSales.reduce((sum, c) => sum + (c.saleDetails?.netProfit || 0), 0);

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Sales Header Card */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={24} color="var(--accent-primary)" />
              <span>سجل وعقود مبيعات معرض الماسة ({filteredSales.length})</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
              تتبع تفصيلي لكل سيارة تم بيعها، سعر البيع الفعلي، حساب الربح الصافي وطباعة المبايعات.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.25)', padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.78rem', color: '#a7f3d0' }}>إجمالي أرباح المبيعات المعروضة:</span>
              <div className="currency-emerald" style={{ fontSize: '1.1rem' }}>+{formatCurrency(totalProfit)} ج.م</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginTop: '16px', position: 'relative', maxWidth: '400px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', right: '14px', top: '14px' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingRight: '42px' }}
            placeholder="ابحث باسم المشتري، السيارة، أو رقم التليفون..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Sales Transactions Table */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>كود السيارة</th>
              <th>بيانات السيارة</th>
              <th>رقم الشاسي (VIN)</th>
              <th>التكلفة الشاملة</th>
              <th>سعر البيع الفعلي</th>
              <th>صافي الربح</th>
              <th>نسبة الربح %</th>
              <th>اسم وتليفون المشتري</th>
              <th>طريقة الدفع</th>
              <th>تاريخ البيع</th>
              <th style={{ textAlign: 'center' }}>الطباعة والخيارات</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  لا توجد مبيعات مسجلة مطابقة للبحث
                </td>
              </tr>
            ) : (
              filteredSales.map(car => {
                const s = car.saleDetails;
                return (
                  <tr key={car.id}>
                    <td>
                      <span style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>{car.id}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{car.brand} {car.model}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>موديل {car.year} | {car.color}</div>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{car.vin}</span>
                    </td>
                    <td>{formatCurrency(car.totalCost)} ج.م</td>
                    <td>
                      <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{formatCurrency(s.actualSalePrice)} ج.م</span>
                    </td>
                    <td>
                      <span className="currency-emerald">+{formatCurrency(s.netProfit)} ج.م</span>
                    </td>
                    <td>
                      <span className="badge badge-emerald">%{s.profitMargin}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{s.buyerName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-light)' }}>{s.buyerPhone}</div>
                    </td>
                    <td>
                      {s.paymentMethod === 'cash' ? (
                        <span className="badge badge-emerald">كاش (نقدي)</span>
                      ) : (
                        <span className="badge badge-amber">تقسيط مباشر</span>
                      )}
                    </td>
                    <td>{s.saleDate}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className="btn-accent" 
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => onPrintInvoice(car)}
                      >
                        <Printer size={14} />
                        <span>طباعة الفاتورة والعقد</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          {filteredSales.length > 0 && (
            <tfoot>
              <tr style={{ background: '#0f172a', fontWeight: 900, borderTop: '2px solid var(--border-color)' }}>
                <td colSpan="3" style={{ color: 'var(--accent-light)' }}>إجمالي مبيعات جدول العرض الحالي:</td>
                <td>{formatCurrency(totalCost)} ج.م</td>
                <td style={{ color: 'var(--text-main)' }}>{formatCurrency(totalRevenue)} ج.م</td>
                <td className="currency-emerald">+{formatCurrency(totalProfit)} ج.م</td>
                <td colSpan="5"></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { TrendingUp, DollarSign, X, Sparkles, User, Phone, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SaleModal({ car, isOpen, onClose, onConfirmSale }) {
  if (!isOpen || !car) return null;

  const [actualSalePrice, setActualSalePrice] = useState(car.targetSalePrice || car.totalCost * 1.1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerNationalId, setBuyerNationalId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [downPayment, setDownPayment] = useState('');
  const [installmentMonthly, setInstallmentMonthly] = useState('');
  const [installmentCount, setInstallmentCount] = useState('12');
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const saleVal = Number(actualSalePrice) || 0;
  const netProfit = saleVal - (car.totalCost || 0);
  const profitMargin = car.totalCost > 0 ? ((netProfit / car.totalCost) * 100).toFixed(1) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone || !actualSalePrice) return;

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onConfirmSale(car.id, {
      actualSalePrice: saleVal,
      buyerName,
      buyerPhone,
      buyerNationalId,
      paymentMethod,
      downPayment: paymentMethod === 'cash' ? saleVal : (Number(downPayment) || 0),
      installmentMonthly: Number(installmentMonthly) || 0,
      installmentCount: Number(installmentCount) || 0,
      saleDate,
      notes
    });

    onClose();
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('ar-EG').format(val || 0);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '620px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <TrendingUp size={22} color="var(--emerald)" />
            <span>إتمام بيع السيارة: {car.brand} {car.model}</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            
            {/* Live Profit Preview Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(18, 24, 36, 0.95) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <span>إجمالي التكلفة الحسابية على المعرض:</span>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{formatCurrency(car.totalCost)} ج.م</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={18} color="var(--emerald)" />
                  <span>صافي الربح المتوقع لهذه السيارة:</span>
                </span>
                <span className="currency-emerald" style={{ fontSize: '1.3rem' }}>
                  +{formatCurrency(netProfit)} ج.م (%{profitMargin})
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">سعر البيع الفعلي (ج.م) *</label>
              <input
                type="number"
                className="form-input"
                style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--emerald)' }}
                value={actualSalePrice}
                onChange={(e) => setActualSalePrice(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">اسم العميل المشتري *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="الاسم الثلاثي..."
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">رقم تليفون المشتري *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="010..."
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">الرقم القومي للمشتري (اختياري)</label>
              <input
                type="text"
                className="form-input"
                placeholder="14 رقم قومي لتسجيل المبايعة"
                value={buyerNationalId}
                onChange={(e) => setBuyerNationalId(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">طريقة الدفع *</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: paymentMethod === 'cash' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)', padding: '10px 16px', borderRadius: '8px', border: paymentMethod === 'cash' ? '1px solid #10b981' : '1px solid transparent', flex: 1 }}>
                  <input type="radio" name="payMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                  <span style={{ fontWeight: 800, color: paymentMethod === 'cash' ? '#34d399' : '#fff' }}>دفع كاش (نقدي)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: paymentMethod === 'installment' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.05)', padding: '10px 16px', borderRadius: '8px', border: paymentMethod === 'installment' ? '1px solid #f59e0b' : '1px solid transparent', flex: 1 }}>
                  <input type="radio" name="payMethod" value="installment" checked={paymentMethod === 'installment'} onChange={() => setPaymentMethod('installment')} />
                  <span style={{ fontWeight: 800, color: paymentMethod === 'installment' ? '#fbbf24' : '#fff' }}>تقسيط مباشر</span>
                </label>
              </div>
            </div>

            {paymentMethod === 'installment' && (
              <div style={{ background: '#0f172a', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fbbf24', marginBottom: '10px' }}>
                  تفاصيل التقسيط والأقساط الشهري
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">الدفعة المقدمة (ج.م) *</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="0"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">القسط الشهري (ج.م) *</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="0"
                      value={installmentMonthly}
                      onChange={(e) => setInstallmentMonthly(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">تاريخ عقد البيع</label>
              <input
                type="date"
                className="form-input"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
              />
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>إلغاء</button>
            <button type="submit" className="btn-accent">
              <TrendingUp size={18} />
              <span>تأكيد وتسجيل عملية البيع</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

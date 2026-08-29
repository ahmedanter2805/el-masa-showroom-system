import React from 'react';
import { Printer, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function InvoicePrint({ car, onClose }) {
  if (!car || !car.saleDetails) return null;

  const s = car.saleDetails;
  const formatCurrency = (val) => new Intl.NumberFormat('ar-EG').format(val || 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#06080e',
      zIndex: 2000,
      overflowY: 'auto',
      padding: '20px'
    }}>
      
      {/* Top Action Bar (Hidden on Print) */}
      <div className="no-print" style={{
        maxWidth: '850px',
        margin: '0 auto 20px auto',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        background: '#121824',
        padding: '12px 20px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <button className="btn-outline" onClick={onClose}>
          <ArrowRight size={18} />
          <span>الرجوع إلى السيستم</span>
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-accent" onClick={handlePrint}>
            <Printer size={18} />
            <span>طباعة العقد والفاتورة فوراً (PDF)</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Page */}
      <div className="printable-area" style={{
        maxWidth: '850px',
        margin: '0 auto',
        background: '#ffffff',
        color: '#111827',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        direction: 'rtl'
      }}>
        
        {/* Header Branding */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          borderBottom: '3px solid #d4af37',
          paddingBottom: '20px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: '#0b0e14', letterSpacing: '-0.5px' }}>
              💎 معرض الماسة للسيارات
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#b8860b', marginTop: '2px' }}>
              بيع وشراء جميع أنواع السيارات الحديثة
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '4px' }}>
              الفرع الرئيسي | هاتف: 01012345678 - 01122334455
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{
              background: '#0b0e14',
              color: '#ffd700',
              padding: '6px 16px',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '1rem',
              display: 'inline-block'
            }}>
              عقد مبايعة واستلام سيارة
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '6px' }}>
              رقم المبايعة: <strong>{car.id}</strong>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
              تاريخ العقد: <strong>{s.saleDate}</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Parties Info */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ background: '#f3f4f6', padding: '8px 12px', borderRadius: '6px', fontSize: '1.05rem', fontWeight: '800', borderRight: '4px solid #d4af37', marginBottom: '12px' }}>
            أولاً: بيانات الطرف الأول والطرف الثاني
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '800', color: '#111827', marginBottom: '4px' }}>الطرف الأول (البائع):</div>
              <div>معرض الماسة للسيارات</div>
              <div>سجل تجاري / ترخيص مبيعات سيارات</div>
            </div>

            <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '800', color: '#111827', marginBottom: '4px' }}>الطرف الثاني (المشتري):</div>
              <div>اسم العميل: <strong>{s.buyerName}</strong></div>
              <div>رقم التليفون: <strong>{s.buyerPhone}</strong></div>
              {s.buyerNationalId && <div>الرقم القومي: <strong>{s.buyerNationalId}</strong></div>}
            </div>
          </div>
        </div>

        {/* Section 2: Vehicle Dossier */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ background: '#f3f4f6', padding: '8px 12px', borderRadius: '6px', fontSize: '1.05rem', fontWeight: '800', borderRight: '4px solid #d4af37', marginBottom: '12px' }}>
            ثانياً: مواصفات السيارة المبيعة
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb', fontSize: '0.92rem' }}>
            <tbody>
              <tr style={{ background: '#f9fafb' }}>
                <td style={{ padding: '10px 14px', fontWeight: '800', border: '1px solid #e5e7eb', width: '20%' }}>الماركة والموديل:</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e5e7eb', width: '30%' }}>{car.brand} {car.model}</td>
                <td style={{ padding: '10px 14px', fontWeight: '800', border: '1px solid #e5e7eb', width: '20%' }}>سنة الصنع:</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e5e7eb', width: '30%' }}>{car.year}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', fontWeight: '800', border: '1px solid #e5e7eb' }}>اللون الخارجى:</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e5e7eb' }}>{car.color}</td>
                <td style={{ padding: '10px 14px', fontWeight: '800', border: '1px solid #e5e7eb' }}>رقم اللوحة:</td>
                <td style={{ padding: '10px 14px', border: '1px solid #e5e7eb' }}>{car.plateNumber || 'بدون نمر'}</td>
              </tr>
              <tr style={{ background: '#f9fafb' }}>
                <td style={{ padding: '10px 14px', fontWeight: '800', border: '1px solid #e5e7eb' }}>رقم الشاسي (VIN):</td>
                <td colSpan="3" style={{ padding: '10px 14px', border: '1px solid #e5e7eb', fontFamily: 'monospace', fontWeight: '800', letterSpacing: '0.5px' }}>
                  {car.vin}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Financial Agreement */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ background: '#f3f4f6', padding: '8px 12px', borderRadius: '6px', fontSize: '1.05rem', fontWeight: '800', borderRight: '4px solid #d4af37', marginBottom: '12px' }}>
            ثالثاً: القيمة وطريقة السداد
          </h3>

          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: '8px', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>إجمالي قيمة السيارة الإجمالية:</span>
              <strong style={{ fontSize: '1.1rem', color: '#b8860b' }}>{formatCurrency(s.actualSalePrice)} جنيه مصري</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>طريقة السداد المعتمدة:</span>
              <strong>{s.paymentMethod === 'cash' ? 'دفع كامل المبلغ كاش (نقداً)' : 'دفع بنظام التقسيط المباشر'}</strong>
            </div>

            {s.paymentMethod === 'installment' && (
              <div style={{ borderTop: '1px dashed #d4af37', paddingTop: '8px', marginTop: '8px' }}>
                <div>الدفعة المقدمة المدفوعة: <strong>{formatCurrency(s.downPayment)} ج.م</strong></div>
                <div>القسط الشهري المتفق عليه: <strong>{formatCurrency(s.installmentMonthly)} ج.م</strong> لمدة <strong>{s.installmentCount}</strong> شهراً.</div>
              </div>
            )}
          </div>
        </div>

        {/* Signatures */}
        <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', textAlign: 'center', fontSize: '0.95rem' }}>
          <div>
            <div style={{ fontWeight: '800', marginBottom: '40px' }}>توقيع الطرف الأول (المعرض)</div>
            <div style={{ borderBottom: '1px dashed #9ca3af', width: '80%', margin: '0 auto' }}></div>
          </div>

          <div>
            <div style={{ fontWeight: '800', marginBottom: '40px' }}>توقيع الطرف الثاني (المشتري)</div>
            <div style={{ borderBottom: '1px dashed #9ca3af', width: '80%', margin: '0 auto' }}></div>
          </div>

          <div>
            <div style={{ fontWeight: '800', marginBottom: '40px' }}>توقيع الشاهد</div>
            <div style={{ borderBottom: '1px dashed #9ca3af', width: '80%', margin: '0 auto' }}></div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.78rem', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
          نشكركم لتعاملكم مع معرض الماسة للسيارات | تم إصدار العقد إلكترونياً
        </div>

      </div>
    </div>
  );
}

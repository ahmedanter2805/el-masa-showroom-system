import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  PlusCircle, 
  History 
} from 'lucide-react';

export default function Installments({ installments, onRecordPayment }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInst, setSelectedInst] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(null);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('ar-EG').format(val || 0);
  };

  const filteredInstallments = installments.filter(inst => (
    inst.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.buyerPhone.includes(searchTerm) ||
    inst.carTitle.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const totalDebt = filteredInstallments.reduce((sum, i) => sum + i.totalAmount, 0);
  const totalPaid = filteredInstallments.reduce((sum, i) => sum + i.paidAmount, 0);
  const totalRemaining = filteredInstallments.reduce((sum, i) => sum + i.remainingAmount, 0);

  const handleCollectSubmit = (e) => {
    e.preventDefault();
    if (!selectedInst || !paymentAmount) return;
    onRecordPayment(selectedInst.id, paymentAmount, paymentNote);
    setSelectedInst(null);
    setPaymentAmount('');
    setPaymentNote('');
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Installments Header Card */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CreditCard size={24} color="var(--accent-primary)" />
              <span>إدارة وتتبع الأقساط والمستحقات ({filteredInstallments.length})</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
              متابعة الأقساط الشهرية للعملاء، تحصيل الدفعات وتحديث المبالغ المتبقية تلقائياً.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.25)', padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.78rem', color: '#fcd34d' }}>إجمالي الأقساط المتبقية للتحصيل:</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--amber)', fontFamily: 'monospace' }}>{formatCurrency(totalRemaining)} ج.م</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginTop: '16px', position: 'relative', maxWidth: '400px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', right: '14px', top: '14px' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingRight: '42px' }}
            placeholder="ابحث باسم العميل، التليفون، أو نوع السيارة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Installments Table */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>كود العقد</th>
              <th>العميل ورقم التليفون</th>
              <th>السيارة المباعة</th>
              <th>إجمالي المتبقي</th>
              <th>المسدد سابقاً</th>
              <th>المبلغ المتبقي حالياً</th>
              <th>القسط الشهري</th>
              <th>تاريخ الاستحقاق</th>
              <th>الحالة</th>
              <th style={{ textAlign: 'center' }}>الخيارات والتحصيل</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstallments.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  لا توجد سجلات أقساط مطابقة للبحث
                </td>
              </tr>
            ) : (
              filteredInstallments.map(inst => (
                <tr key={inst.id}>
                  <td>
                    <span style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>{inst.id}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{inst.buyerName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--accent-light)' }}>{inst.buyerPhone}</div>
                  </td>
                  <td>{inst.carTitle}</td>
                  <td>{formatCurrency(inst.totalAmount)} ج.م</td>
                  <td style={{ color: 'var(--emerald)', fontWeight: 700 }}>{formatCurrency(inst.paidAmount)} ج.م</td>
                  <td style={{ color: 'var(--ruby)', fontWeight: 800 }}>{formatCurrency(inst.remainingAmount)} ج.م</td>
                  <td style={{ fontWeight: 700 }}>{formatCurrency(inst.monthlyAmount)} ج.م</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                      <Calendar size={13} />
                      {inst.dueDate}
                    </span>
                  </td>
                  <td>
                    {inst.remainingAmount <= 0 ? (
                      <span className="badge badge-emerald"><CheckCircle2 size={13} /> مكتمل السداد</span>
                    ) : (
                      <span className="badge badge-amber"><Clock size={13} /> جارِ التحصيل</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      {inst.remainingAmount > 0 && (
                        <button 
                          className="btn-accent" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                          onClick={() => {
                            setSelectedInst(inst);
                            setPaymentAmount(inst.monthlyAmount);
                          }}
                        >
                          <PlusCircle size={14} />
                          <span>تحصيل قسط</span>
                        </button>
                      )}
                      <button 
                        className="btn-outline" 
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                        title="سجل الدفعات"
                        onClick={() => setShowHistoryModal(inst)}
                      >
                        <History size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Collect Payment Modal */}
      {selectedInst && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="modal-title">
                <CreditCard size={22} color="var(--accent-primary)" />
                <span>تحصيل قسط شهري لـ {selectedInst.buyerName}</span>
              </div>
              <button onClick={() => setSelectedInst(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>
            
            <form onSubmit={handleCollectSubmit}>
              <div className="modal-body">
                <div style={{ background: '#0f172a', padding: '14px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>السيارة: <strong style={{ color: 'var(--text-main)' }}>{selectedInst.carTitle}</strong></div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--ruby)', marginTop: '4px' }}>المبلغ المتبقي الكلي: <strong>{formatCurrency(selectedInst.remainingAmount)} ج.م</strong></div>
                </div>

                <div className="form-group">
                  <label className="form-label">مبلغ القسط المحصل (ج.م) *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ملاحظات التحصيل (اختياري)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="مثال: تحصيل قسط شهر 9 نقداً"
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setSelectedInst(null)}>إلغاء</button>
                <button type="submit" className="btn-accent">تأكيد التحصيل</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View History Modal */}
      {showHistoryModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="modal-title">
                <History size={22} color="var(--accent-primary)" />
                <span>سجل تحصيلات {showHistoryModal.buyerName}</span>
              </div>
              <button onClick={() => setShowHistoryModal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div className="modal-body">
              {(!showHistoryModal.history || showHistoryModal.history.length === 0) ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                  لا توجد دفعات محصلة مسبقاً
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {showHistoryModal.history.map(item => (
                    <div key={item.id} style={{ background: '#0f172a', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--emerald)' }}>+{formatCurrency(item.amount)} ج.م</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.note || 'تحصيل قسط'}</div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowHistoryModal(null)}>إغلاق</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

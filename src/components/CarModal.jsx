import React, { useState, useEffect } from 'react';
import { Car, Plus, Save, X, DollarSign } from 'lucide-react';

export default function CarModal({ isOpen, onClose, onSave, carToEdit }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    vin: '',
    plateNumber: '',
    purchasePrice: '',
    prepExpenses: '',
    targetSalePrice: '',
    status: 'available',
    purchaseDate: new Date().toISOString().split('T')[0],
    supplierName: '',
    supplierPhone: '',
    notes: ''
  });

  useEffect(() => {
    if (carToEdit) {
      setFormData({
        id: carToEdit.id,
        brand: carToEdit.brand || '',
        model: carToEdit.model || '',
        year: carToEdit.year || new Date().getFullYear(),
        color: carToEdit.color || '',
        vin: carToEdit.vin || '',
        plateNumber: carToEdit.plateNumber || '',
        purchasePrice: carToEdit.purchasePrice || '',
        prepExpenses: carToEdit.prepExpenses || '',
        targetSalePrice: carToEdit.targetSalePrice || '',
        status: carToEdit.status || 'available',
        purchaseDate: carToEdit.purchaseDate || new Date().toISOString().split('T')[0],
        supplierName: carToEdit.supplierName || '',
        supplierPhone: carToEdit.supplierPhone || '',
        notes: carToEdit.notes || ''
      });
    } else {
      setFormData({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        vin: '',
        plateNumber: '',
        purchasePrice: '',
        prepExpenses: '0',
        targetSalePrice: '',
        status: 'available',
        purchaseDate: new Date().toISOString().split('T')[0],
        supplierName: '',
        supplierPhone: '',
        notes: ''
      });
    }
  }, [carToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const purchaseVal = Number(formData.purchasePrice) || 0;
  const prepVal = Number(formData.prepExpenses) || 0;
  const totalCostCalculated = purchaseVal + prepVal;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <Car size={22} color="var(--accent-primary)" />
            <span>{carToEdit ? `تعديل بيانات سيارة (${carToEdit.id})` : 'إضافة سيارة جديدة للمخزون'}</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">الماركة (Brand) *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="مثال: تويوتا، هيونداي، مرسيدس"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">الموديل والفئة *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="مثال: كورولا 1.6 Active"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">سنة الصنع *</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">اللون *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="مثال: أسود ميتاليك"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">رقم اللوحة</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="مثال: أ ب ج 123"
                  value={formData.plateNumber}
                  onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">رقم الشاسي (VIN) *</label>
              <input
                type="text"
                className="form-input"
                placeholder="أدخل رقم الشاسي المكون من 17 حرف ورقم..."
                value={formData.vin}
                onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                required
              />
            </div>

            {/* Financials Calculation Section */}
            <div style={{ background: '#090d14', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-light)', marginBottom: '12px' }}>
                التكاليف المالية وسعر البيع
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">سعر الشراء الفعلي (ج.م) *</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0"
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">مصروفات الصيانة والترخيص (ج.م)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0"
                    value={formData.prepExpenses}
                    onChange={(e) => setFormData({ ...formData, prepExpenses: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(229, 193, 88, 0.08)', padding: '10px 14px', borderRadius: '8px', marginBottom: '12px', border: '1px solid var(--border-active)' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>إجمالي التكلفة الحسابية على المعرض:</span>
                <span className="currency-accent" style={{ fontSize: '1.1rem' }}>
                  {new Intl.NumberFormat('ar-EG').format(totalCostCalculated)} ج.م
                </span>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">سعر البيع المستهدف (ج.م) *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0"
                  value={formData.targetSalePrice}
                  onChange={(e) => setFormData({ ...formData, targetSalePrice: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">اسم البائع / المورد</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="اسم الشخص أو المعرض"
                  value={formData.supplierName}
                  onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">تليفون المورد</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="010..."
                  value={formData.supplierPhone}
                  onChange={(e) => setFormData({ ...formData, supplierPhone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">ملاحظات وحالة السيارة</label>
              <textarea
                className="form-textarea"
                rows="2"
                placeholder="حالة الفابريكا، الكتالوجات، المفتاح السبير..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>إلغاء</button>
            <button type="submit" className="btn-accent">
              <Save size={18} />
              <span>حفظ السيارة في المخزون</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

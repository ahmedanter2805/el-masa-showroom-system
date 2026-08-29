import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Trash2, 
  DollarSign, 
  Calendar, 
  Tag, 
  Building, 
  Zap, 
  Megaphone, 
  Users 
} from 'lucide-react';

export default function Expenses({ expenses, onAddExpense, onDeleteExpense }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('rent');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('ar-EG').format(val || 0);
  };

  const totalExpenseSum = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAddExpense({
      title,
      category,
      amount,
      date,
      notes
    });
    setTitle('');
    setAmount('');
    setNotes('');
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'rent': return { label: 'إيجار المقر', icon: Building, color: 'var(--accent-primary)' };
      case 'utilities': return { label: 'مرافق وكهرباء', icon: 'var(--sapphire)' };
      case 'marketing': return { label: 'تسويق وإعلانات', icon: Megaphone, color: '#c084fc' };
      case 'salaries': return { label: 'رواتب موظفين', icon: Users, color: 'var(--emerald)' };
      default: return { label: 'مصروفات أخرى', icon: Tag, color: 'var(--text-muted)' };
    }
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Expenses Header Card */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Receipt size={24} color="var(--accent-primary)" />
              <span>مصروفات وتكاليف المعرض التشغيلية</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
              سجل المصروفات العامة (إيجار، رواتب، كهرباء، تسويق) المخصومة من أرباح السيارات لخصم صافي الربح.
            </p>
          </div>

          <div style={{ background: 'rgba(251, 113, 133, 0.1)', border: '1px solid rgba(251, 113, 133, 0.25)', padding: '8px 18px', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.78rem', color: '#fca5a5' }}>إجمالي المصروفات التشغيلية:</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--ruby)', fontFamily: 'monospace' }}>
              {formatCurrency(totalExpenseSum)} ج.م
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Form + List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        
        {/* Expense Entry Form */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-light)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} color="var(--accent-primary)" />
            <span>تسجيل مصروف جديد</span>
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">عنوان المصروف *</label>
              <input
                type="text"
                className="form-input"
                placeholder="مثال: إيجار معرض شهر أغسطس"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">التصنيف *</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="rent">إيجار مقر المعرض</option>
                <option value="utilities">كهرباء ومرافق</option>
                <option value="marketing">تسويق وإعلانات</option>
                <option value="salaries">رواتب وعمالة</option>
                <option value="other">أخرى</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">المبلغ الإجمالي (ج.م) *</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">تاريخ الصرف *</label>
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">ملاحظات إضافية</label>
              <input
                type="text"
                className="form-input"
                placeholder="تفاصيل تصفية المصروف..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-accent" style={{ width: '100%', marginTop: '10px' }}>
              <Plus size={18} />
              <span>إضافة المصروف الحسابي</span>
            </button>
          </form>
        </div>

        {/* Expense Log History List */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-light)', marginBottom: '16px' }}>
            سجل المصروفات المخصومة ({expenses.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '500px', overflowY: 'auto', paddingRight: '4px' }}>
            {expenses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                لا توجد مصروفات إدارية مسجلة
              </div>
            ) : (
              expenses.map(exp => {
                const catInfo = getCategoryLabel(exp.category);
                const Icon = catInfo.icon;
                return (
                  <div key={exp.id} style={{
                    background: '#0f172a',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'rgba(99, 102, 241, 0.08)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={18} color={catInfo.color} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.95rem' }}>{exp.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {catInfo.label} | {exp.date}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ fontWeight: 900, color: 'var(--ruby)', fontSize: '1rem', fontFamily: 'monospace' }}>
                        -{formatCurrency(exp.amount)} ج.م
                      </div>
                      <button 
                        className="btn-danger" 
                        style={{ padding: '6px' }}
                        title="حذف"
                        onClick={() => onDeleteExpense(exp.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

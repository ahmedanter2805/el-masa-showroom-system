import React, { useRef, useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Upload, 
  Smartphone, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Sparkles
} from 'lucide-react';
import { importCarsFromExcel } from '../utils/excel';

export default function ExcelManager({ cars, installments, expenses, kpis, onExport, onImportCars, onResetDemo }) {
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setImportStatus(null);
    try {
      const importedCars = await importCarsFromExcel(file);
      if (importedCars && importedCars.length > 0) {
        onImportCars(importedCars);
        setImportStatus({ type: 'success', message: `تم استيراد ${importedCars.length} سيارة بنجاح إلى السيستم!` });
      } else {
        setImportStatus({ type: 'error', message: 'لم يتم العثور على بيانات سيارات صحيحة في الملف.' });
      }
    } catch (err) {
      console.error(err);
      setImportStatus({ type: 'error', message: 'حدث خطأ أثناء قراءة ملف Excel. تأكد من صيغة الملف (.xlsx أو .csv).' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Excel Hub Banner */}
      <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(18, 24, 36, 0.95) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyCenter: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <FileSpreadsheet size={26} color="#34d399" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold-light)' }}>
              مركز ربط وتصدير شيتات Excel والتليفون
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              احتفظ ببيانات معرض الماسة كاملاً على تليفونك، صدّر تقارير الأرباح والمبيعات، أو ارفع شيت جاهز.
            </p>
          </div>
        </div>
      </div>

      {/* Main Actions Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        
        {/* Export to Excel Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-primary)', fontWeight: 800, marginBottom: '10px' }}>
              <Download size={22} />
              <span style={{ fontSize: '1.15rem' }}>تصدير حسابات المعرض لملف Excel</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
              ينشئ ملف Excel منظم ومطابق للمعايير المحاسبية يحتوي على <strong>5 أوراق عمل (Sheets)</strong>:
            </p>
            <ul style={{ color: 'var(--text-main)', fontSize: '0.85rem', paddingRight: '20px', lineHeight: 1.8, marginBottom: '20px' }}>
              <li>ورقة المخزون والسيارات المتاحة</li>
              <li>ورقة سجل المبيعات والأرباح الصافية</li>
              <li>ورقة الأقساط والمستحقات والديون</li>
              <li>ورقة المصروفات التشغيلية</li>
              <li>ورقة الملخص المالي الشامل للمعرض</li>
            </ul>
          </div>

          <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} onClick={onExport}>
            <Download size={20} />
            <span>تنزيل ملف Excel (.xlsx) الآن</span>
          </button>
        </div>

        {/* Import from Excel Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#60a5fa', fontWeight: 800, marginBottom: '10px' }}>
              <Upload size={22} />
              <span style={{ fontSize: '1.15rem' }}>استيراد سيارات من شيت Excel</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
              قم برفع ملف Excel أو CSV قديم متاح لديك لإضافة السيارات وتكاليف الشراء تلقائياً للسيستم.
            </p>
            
            <input 
              type="file" 
              accept=".xlsx, .xls, .csv" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />

            {importStatus && (
              <div style={{
                background: importStatus.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                border: `1px solid ${importStatus.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                color: importStatus.type === 'success' ? '#34d399' : '#f87171',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {importStatus.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{importStatus.message}</span>
              </div>
            )}
          </div>

          <button 
            className="btn-outline" 
            style={{ width: '100%', justifyContent: 'center', padding: '12px', borderColor: '#3b82f6', color: '#93c5fd' }}
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            <Upload size={20} />
            <span>{loading ? 'جارِ معالجة الشيت...' : 'اختر ملف Excel من جهازك'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Usage Guide */}
      <div className="glass-card" style={{ padding: '20px', borderRight: '4px solid var(--gold-primary)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold-light)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Smartphone size={20} color="var(--gold-primary)" />
          <span>طريقة فتح شيت Excel وحفظه على الهاتف المحمول (التليفون)</span>
        </h3>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>
          <p>1. اضغط على زر <strong>"تنزيل ملف Excel"</strong> في الأعلى لتنزيل الملف فوراً.</p>
          <p>2. يمكنك فتح الملف مباشرة على تليفونك باستخدام تطبيق <strong>Microsoft Excel</strong> أو <strong>Google Sheets</strong>.</p>
          <p>3. لإرسال الشيت لتليفونك بسهولة: أرسل الملف لنفسك على واتساب (WhatsApp) أو احفظه على Google Drive لفتحه في أي وقت!</p>
        </div>
      </div>

      {/* Reset & Backup Section */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>إعادة تعيين البيانات الافتراضية للمعرض:</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>تسترجع البيانات النموذجية الأولية للتجربة والتوضيح.</span>
        </div>
        <button className="btn-outline" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#fca5a5' }} onClick={onResetDemo}>
          <RefreshCw size={16} />
          <span>إعادة ضبط البيانات العرضية</span>
        </button>
      </div>
    </div>
  );
}

// البيانات الإفتراضية العرضية لمعرض الماسة للسيارات
export const INITIAL_CARS = [
  {
    id: 'CAR-101',
    brand: 'تويوتا',
    model: 'كورولا 1.6 Active',
    year: 2024,
    color: 'أبيض لؤلؤي',
    vin: 'NMTBB3JE70R098123',
    plateNumber: 'س ج د 9541',
    purchasePrice: 1250000,
    prepExpenses: 15000,
    totalCost: 1265000,
    targetSalePrice: 1380000,
    status: 'available',
    purchaseDate: '2026-08-10',
    supplierName: 'الحاج أحمد عبدالفتاح',
    supplierPhone: '01012345678',
    notes: 'حالة الفابريكا بالكامل، صيانة توكيل'
  },
  {
    id: 'CAR-102',
    brand: 'هيونداي',
    model: 'إلنترا CN7 فئة أصلية',
    year: 2023,
    color: 'أسود ميتاليك',
    vin: 'KMHDH4AE9LU456789',
    plateNumber: 'م ن ر 4123',
    purchasePrice: 980000,
    prepExpenses: 20000,
    totalCost: 1000000,
    targetSalePrice: 1120000,
    status: 'sold',
    purchaseDate: '2026-07-15',
    supplierName: 'المهندس كريم محمود',
    supplierPhone: '01122334455',
    notes: 'تم البيع كاش بشرط الفحص الكامل',
    saleDetails: {
      actualSalePrice: 1110000,
      netProfit: 110000, // 1110000 - 1000000
      profitMargin: 11.0,
      buyerName: 'د. محمد طارق العوضي',
      buyerPhone: '01299887766',
      buyerNationalId: '29205141203948',
      paymentMethod: 'cash',
      downPayment: 1110000,
      installmentMonthly: 0,
      installmentCount: 0,
      saleDate: '2026-08-01',
      notes: 'تم تسليم المبايعة وكتالوجات السيارة'
    }
  },
  {
    id: 'CAR-103',
    brand: 'كيا',
    model: 'سبورتاج Highline',
    year: 2024,
    color: 'رمادي فائر',
    vin: 'KNAFX812DR6543210',
    plateNumber: 'ق ط ر 8765',
    purchasePrice: 1650000,
    prepExpenses: 25000,
    totalCost: 1675000,
    targetSalePrice: 1850000,
    status: 'sold',
    purchaseDate: '2026-06-20',
    supplierName: 'معرض السلام للسيارات',
    supplierPhone: '01055443322',
    notes: 'بيع بنظام التقسيط المباشر',
    saleDetails: {
      actualSalePrice: 1880000,
      netProfit: 205000, // 1880000 - 1675000
      profitMargin: 12.2,
      buyerName: 'الأستاذ عصام الشريف',
      buyerPhone: '01066778899',
      buyerNationalId: '28804151602931',
      paymentMethod: 'installment',
      downPayment: 880000,
      installmentMonthly: 50000,
      installmentCount: 20,
      saleDate: '2026-07-05',
      notes: 'دفعة مقدمة 880,000 والباقي على 20 شهر'
    }
  },
  {
    id: 'CAR-104',
    brand: 'مرسيدس',
    model: 'E200 Exclusive',
    year: 2022,
    color: 'كحلي ميتاليك',
    vin: 'WDD2130421A987654',
    plateNumber: 'د هـ و 1111',
    purchasePrice: 3100000,
    prepExpenses: 40000,
    totalCost: 3140000,
    targetSalePrice: 3450000,
    status: 'available',
    purchaseDate: '2026-08-20',
    supplierName: 'الشيخ خالد آل ثاني',
    supplierPhone: '01500112233',
    notes: 'عداد 35,000 كم، فابريكا بالكامل بدون أي خدوش'
  },
  {
    id: 'CAR-105',
    brand: 'بي إم دبليو',
    model: '320i Luxury Line',
    year: 2023,
    color: 'أسود ملوكي',
    vin: 'WBA5R11090F123987',
    plateNumber: 'ب ن م 7890',
    purchasePrice: 2200000,
    prepExpenses: 30000,
    totalCost: 2230000,
    targetSalePrice: 2450000,
    status: 'in_prep',
    purchaseDate: '2026-08-25',
    supplierName: 'الشركة المصرية لتجارة السيارات',
    supplierPhone: '01000998877',
    notes: 'في التلميع والفرش الجلدي بالتأمين'
  },
  {
    id: 'CAR-106',
    brand: 'نيسان',
    model: 'صني Super Saloon',
    year: 2024,
    color: 'فضي براق',
    vin: 'JN1ANAA15U0112233',
    plateNumber: 'ر س ط 3344',
    purchasePrice: 650000,
    prepExpenses: 8000,
    totalCost: 658000,
    targetSalePrice: 720000,
    status: 'available',
    purchaseDate: '2026-08-28',
    supplierName: 'معرض الأمل',
    supplierPhone: '01211223344',
    notes: 'زيرو تسليم فوري'
  }
];

export const INITIAL_INSTALLMENTS = [
  {
    id: 'INST-101',
    carId: 'CAR-103',
    carTitle: 'كيا سبورتاج Highline (2024)',
    buyerName: 'الأستاذ عصام الشريف',
    buyerPhone: '01066778899',
    totalAmount: 1000000,
    paidAmount: 100000,
    remainingAmount: 900000,
    monthlyAmount: 50000,
    dueDate: '2026-09-05',
    status: 'pending',
    history: [
      { id: 'PAY-1', date: '2026-08-05', amount: 50000, note: 'قسط شهر أغسطس' },
      { id: 'PAY-2', date: '2026-07-05', amount: 50000, note: 'قسط شهر يوليو' }
    ]
  }
];

export const INITIAL_EXPENSES = [
  {
    id: 'EXP-1',
    title: 'إيجار مقر المعرض الرئيسي',
    category: 'rent',
    amount: 35000,
    date: '2026-08-01',
    notes: 'شهر أغسطس 2026'
  },
  {
    id: 'EXP-2',
    title: 'فواتير الكهرباء والمرافق',
    category: 'utilities',
    amount: 4200,
    date: '2026-08-10',
    notes: 'استهلاك التكييفات والإضاءة'
  },
  {
    id: 'EXP-3',
    title: 'حملة إعلانات فيسبوك وتيك توك',
    category: 'marketing',
    amount: 12000,
    date: '2026-08-15',
    notes: 'حملة ترويج سيارات الزيرو'
  },
  {
    id: 'EXP-4',
    title: 'رواتب موظفي المبيعات والأمن',
    category: 'salaries',
    amount: 28000,
    date: '2026-08-25',
    notes: 'مرتبات فريق العمل'
  }
];

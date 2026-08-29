import * as XLSX from 'xlsx';

// Export full showroom database to a multi-sheet Excel file (.xlsx)
export const exportToExcel = (cars, installments, expenses, kpis) => {
  const workbook = XLSX.utils.book_new();

  // Sheet 1: Inventory & Available Cars (المخزون والسيارات)
  const carsData = cars.map(car => ({
    'رقم الكود': car.id,
    'الماركة': car.brand,
    'الموديل': car.model,
    'سنة الصنع': car.year,
    'اللون': car.color,
    'رقم الشاسي (VIN)': car.vin,
    'رقم اللوحة': car.plateNumber || '-',
    'سعر الشراء (ج.م)': car.purchasePrice,
    'مصروفات الصيانة والتجهيز': car.prepExpenses,
    'إجمالي التكلفة (ج.م)': car.totalCost,
    'سعر البيع المستهدف': car.targetSalePrice,
    'الحالة': car.status === 'available' ? 'متاحة للمعرض' : car.status === 'sold' ? 'مباعة' : car.status === 'in_prep' ? 'قيد التجهيز' : 'محجوزة',
    'تاريخ الشراء': car.purchaseDate,
    'اسم المورد / البائع': car.supplierName || '-',
    'تليفون المورد': car.supplierPhone || '-',
    'ملاحظات': car.notes || ''
  }));
  const carsSheet = XLSX.utils.json_to_sheet(carsData);
  XLSX.utils.book_append_sheet(workbook, carsSheet, 'المخزون والسيارات');

  // Sheet 2: Sales & Profits (سجل المبيعات والأرباح التفصيلي)
  const soldCars = cars.filter(c => c.status === 'sold' && c.saleDetails);
  const salesData = soldCars.map(car => ({
    'كود السيارة': car.id,
    'بيانات السيارة': `${car.brand} ${car.model} (${car.year})`,
    'رقم الشاسي (VIN)': car.vin,
    'إجمالي التكلفة على المعرض': car.totalCost,
    'سعر البيع الفعلي (ج.م)': car.saleDetails.actualSalePrice,
    'صافي الربح (ج.m)': car.saleDetails.netProfit,
    'نسبة الربح %': `${car.saleDetails.profitMargin}%`,
    'اسم المشتري': car.saleDetails.buyerName,
    'تليفون المشتري': car.saleDetails.buyerPhone,
    'طريقة الدفع': car.saleDetails.paymentMethod === 'cash' ? 'كاش (نقدي)' : 'تقسيط',
    'الدفعة المقدمة': car.saleDetails.downPayment,
    'القسط الشهري': car.saleDetails.installmentMonthly || 0,
    'تاريخ البيع': car.saleDetails.saleDate,
    'ملاحظات عملية البيع': car.saleDetails.notes || ''
  }));
  const salesSheet = XLSX.utils.json_to_sheet(salesData);
  XLSX.utils.book_append_sheet(workbook, salesSheet, 'المبيعات والأرباح');

  // Sheet 3: Installments (جدول الأقساط والمستحقات)
  const instData = installments.map(inst => ({
    'رقم القسط': inst.id,
    'السيارة': inst.carTitle,
    'اسم العميل': inst.buyerName,
    'تليفون العميل': inst.buyerPhone,
    'إجمالي الدين/الباقي': inst.totalAmount,
    'المبلغ المحصل': inst.paidAmount,
    'المبلغ المتبقي': inst.remainingAmount,
    'القسط الشهري': inst.monthlyAmount,
    'تاريخ الاستحقاق القادم': inst.dueDate,
    'الحالة': inst.remainingAmount <= 0 ? 'مكتمل المسدد' : 'متبقي أقساط'
  }));
  const instSheet = XLSX.utils.json_to_sheet(instData);
  XLSX.utils.book_append_sheet(workbook, instSheet, 'الأقساط والمستحقات');

  // Sheet 4: Expenses (المصروفات التشغيلية)
  const expData = expenses.map(exp => ({
    'رقم المعاملة': exp.id,
    'بند المصروف': exp.title,
    'التصنيف': exp.category === 'rent' ? 'إيجار' : exp.category === 'utilities' ? 'مرافق وكهرباء' : exp.category === 'marketing' ? 'تسويق وإعلانات' : exp.category === 'salaries' ? 'رواتب' : 'أخرى',
    'المبلغ (ج.م)': exp.amount,
    'التاريخ': exp.date,
    'ملاحظات': exp.notes || ''
  }));
  const expSheet = XLSX.utils.json_to_sheet(expData);
  XLSX.utils.book_append_sheet(workbook, expSheet, 'مصروفات المعرض');

  // Sheet 5: Executive Financial Summary (الملخص المالي الشامل)
  const summaryData = [
    { 'البيان المالي': 'إجمالي الأرباح الصافية (بعد خصم المصروفات)', 'القيمة (ج.م)': kpis.netProfit },
    { 'البيان المالي': 'أرباح مبيعات السيارات الإجمالية', 'القيمة (ج.م)': kpis.grossCarsProfit },
    { 'البيان المالي': 'إجمالي إيرادات المبيعات', 'القيمة (ج.م)': kpis.totalSalesRevenue },
    { 'البيان المالي': 'رأس المال المستثمر في السيارات المتاحة حالياً', 'القيمة (ج.م)': kpis.inventoryCapital },
    { 'البيان المالي': 'إجمالي المصروفات التشغيلية للمعرض', 'القيمة (ج.م)': kpis.totalExpenses },
    { 'البيان المالي': 'ديون وأقساط العملاء المتبقية', 'القيمة (ج.م)': kpis.totalInstallmentsDebt },
    { 'البيان المالي': 'عدد السيارات المتاحة بالمعرض', 'القيمة (ج.م)': kpis.availableCarsCount },
    { 'البيان المالي': 'عدد السيارات المباعة', 'القيمة (ج.م)': kpis.soldCarsCount }
  ];
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'الملخص المالي');

  // Download File
  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `حسابات_معرض_الماسة_${dateStr}.xlsx`);
};

// Import Cars from Excel file
export const importCarsFromExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonRows = XLSX.utils.sheet_to_json(worksheet);

        const importedCars = jsonRows.map((row, idx) => {
          const purchasePrice = Number(row['سعر الشراء (ج.م)'] || row['سعر الشراء'] || row['Purchase Price'] || row['price'] || 0);
          const prepExpenses = Number(row['مصروفات الصيانة والتجهيز'] || row['المصروفات'] || row['Expenses'] || 0);
          const totalCost = purchasePrice + prepExpenses;
          const targetSalePrice = Number(row['سعر البيع المستهدف'] || row['سعر البيع'] || row['Target Price'] || totalCost * 1.1);

          return {
            id: row['رقم الكود'] || `IMP-${Date.now()}-${idx}`,
            brand: row['الماركة'] || row['Brand'] || 'غير محدد',
            model: row['الموديل'] || row['Model'] || 'سيارة جديدة',
            year: Number(row['سنة الصنع'] || row['Year'] || new Date().getFullYear()),
            color: row['اللون'] || row['Color'] || 'أسود',
            vin: row['رقم الشاسي (VIN)'] || row['الشاسي'] || row['VIN'] || `VIN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            plateNumber: row['رقم اللوحة'] || row['اللوحة'] || '',
            purchasePrice,
            prepExpenses,
            totalCost,
            targetSalePrice,
            status: 'available',
            purchaseDate: row['تاريخ الشراء'] || new Date().toISOString().split('T')[0],
            supplierName: row['اسم المورد / البائع'] || row['المورد'] || '',
            supplierPhone: row['تليفون المورد'] || '',
            notes: row['ملاحظات'] || 'مستورد من ملف Excel'
          };
        });

        resolve(importedCars);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

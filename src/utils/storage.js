import { INITIAL_CARS, INITIAL_INSTALLMENTS, INITIAL_EXPENSES } from './mockData';

const KEYS = {
  CARS: 'el_masa_cars_v1',
  INSTALLMENTS: 'el_masa_installments_v1',
  EXPENSES: 'el_masa_expenses_v1',
  SETTINGS: 'el_masa_settings_v1'
};

// Initialize Storage if empty
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.CARS)) {
    localStorage.setItem(KEYS.CARS, JSON.stringify(INITIAL_CARS));
  }
  if (!localStorage.getItem(KEYS.INSTALLMENTS)) {
    localStorage.setItem(KEYS.INSTALLMENTS, JSON.stringify(INITIAL_INSTALLMENTS));
  }
  if (!localStorage.getItem(KEYS.EXPENSES)) {
    localStorage.setItem(KEYS.EXPENSES, JSON.stringify(INITIAL_EXPENSES));
  }
};

// Getters
export const getCars = () => {
  try {
    const data = localStorage.getItem(KEYS.CARS);
    return data ? JSON.parse(data) : INITIAL_CARS;
  } catch (e) {
    console.error('Error reading cars', e);
    return INITIAL_CARS;
  }
};

export const getInstallments = () => {
  try {
    const data = localStorage.getItem(KEYS.INSTALLMENTS);
    return data ? JSON.parse(data) : INITIAL_INSTALLMENTS;
  } catch (e) {
    console.error('Error reading installments', e);
    return INITIAL_INSTALLMENTS;
  }
};

export const getExpenses = () => {
  try {
    const data = localStorage.getItem(KEYS.EXPENSES);
    return data ? JSON.parse(data) : INITIAL_EXPENSES;
  } catch (e) {
    console.error('Error reading expenses', e);
    return INITIAL_EXPENSES;
  }
};

// Setters & Mutations
export const saveCars = (cars) => {
  localStorage.setItem(KEYS.CARS, JSON.stringify(cars));
};

export const saveInstallments = (installments) => {
  localStorage.setItem(KEYS.INSTALLMENTS, JSON.stringify(installments));
};

export const saveExpenses = (expenses) => {
  localStorage.setItem(KEYS.EXPENSES, JSON.stringify(expenses));
};

// Add or Update Car
export const addOrUpdateCar = (carData) => {
  const cars = getCars();
  const index = cars.findIndex(c => c.id === carData.id);
  
  const purchasePrice = Number(carData.purchasePrice) || 0;
  const prepExpenses = Number(carData.prepExpenses) || 0;
  const totalCost = purchasePrice + prepExpenses;
  
  const formattedCar = {
    ...carData,
    purchasePrice,
    prepExpenses,
    totalCost,
    targetSalePrice: Number(carData.targetSalePrice) || 0,
    year: Number(carData.year) || new Date().getFullYear()
  };

  if (index >= 0) {
    cars[index] = { ...cars[index], ...formattedCar };
  } else {
    cars.unshift({
      ...formattedCar,
      id: carData.id || `CAR-${Date.now().toString().slice(-4)}`,
      status: carData.status || 'available',
      purchaseDate: carData.purchaseDate || new Date().toISOString().split('T')[0]
    });
  }
  
  saveCars(cars);
  return cars;
};

// Delete Car
export const deleteCar = (carId) => {
  const cars = getCars().filter(c => c.id !== carId);
  saveCars(cars);
  return cars;
};

// Process Sale Transaction
export const sellCar = (carId, saleData) => {
  const cars = getCars();
  const carIndex = cars.findIndex(c => c.id === carId);
  if (carIndex === -1) return cars;

  const car = cars[carIndex];
  const actualSalePrice = Number(saleData.actualSalePrice) || 0;
  const netProfit = actualSalePrice - car.totalCost;
  const profitMargin = car.totalCost > 0 ? Number(((netProfit / car.totalCost) * 100).toFixed(1)) : 0;
  
  const saleDetails = {
    actualSalePrice,
    netProfit,
    profitMargin,
    buyerName: saleData.buyerName,
    buyerPhone: saleData.buyerPhone,
    buyerNationalId: saleData.buyerNationalId || '',
    paymentMethod: saleData.paymentMethod, // 'cash' | 'installment'
    downPayment: Number(saleData.downPayment) || actualSalePrice,
    installmentMonthly: Number(saleData.installmentMonthly) || 0,
    installmentCount: Number(saleData.installmentCount) || 0,
    saleDate: saleData.saleDate || new Date().toISOString().split('T')[0],
    notes: saleData.notes || ''
  };

  cars[carIndex] = {
    ...car,
    status: 'sold',
    saleDetails
  };

  saveCars(cars);

  // If sale is installment, create/update installment record
  if (saleData.paymentMethod === 'installment') {
    const installments = getInstallments();
    const remainingAmount = actualSalePrice - (Number(saleData.downPayment) || 0);
    const newInst = {
      id: `INST-${Date.now().toString().slice(-4)}`,
      carId: car.id,
      carTitle: `${car.brand} ${car.model} (${car.year})`,
      buyerName: saleData.buyerName,
      buyerPhone: saleData.buyerPhone,
      totalAmount: remainingAmount,
      paidAmount: 0,
      remainingAmount,
      monthlyAmount: Number(saleData.installmentMonthly) || Math.round(remainingAmount / (Number(saleData.installmentCount) || 12)),
      dueDate: saleData.firstDueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      history: []
    };
    installments.unshift(newInst);
    saveInstallments(installments);
  }

  return cars;
};

// Add Expense Record
export const addExpense = (expData) => {
  const expenses = getExpenses();
  const newExp = {
    id: `EXP-${Date.now().toString().slice(-4)}`,
    title: expData.title,
    category: expData.category || 'other',
    amount: Number(expData.amount) || 0,
    date: expData.date || new Date().toISOString().split('T')[0],
    notes: expData.notes || ''
  };
  expenses.unshift(newExp);
  saveExpenses(expenses);
  return expenses;
};

// Delete Expense
export const deleteExpense = (expId) => {
  const expenses = getExpenses().filter(e => e.id !== expId);
  saveExpenses(expenses);
  return expenses;
};

// Record Installment Payment
export const recordInstallmentPayment = (instId, paymentAmount, note = '') => {
  const installments = getInstallments();
  const instIndex = installments.findIndex(i => i.id === instId);
  if (instIndex === -1) return installments;

  const inst = installments[instIndex];
  const amount = Number(paymentAmount) || 0;
  const newPaidAmount = inst.paidAmount + amount;
  const newRemainingAmount = Math.max(0, inst.totalAmount - newPaidAmount);

  // Advance due date by 1 month
  let nextDueDate = inst.dueDate;
  if (inst.dueDate) {
    const d = new Date(inst.dueDate);
    d.setMonth(d.getMonth() + 1);
    nextDueDate = d.toISOString().split('T')[0];
  }

  installments[instIndex] = {
    ...inst,
    paidAmount: newPaidAmount,
    remainingAmount: newRemainingAmount,
    dueDate: nextDueDate,
    status: newRemainingAmount <= 0 ? 'paid' : 'pending',
    history: [
      {
        id: `PAY-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split('T')[0],
        amount,
        note: note || `تحصيل قسط بتاريخ ${new Date().toLocaleDateString('ar-EG')}`
      },
      ...inst.history
    ]
  };

  saveInstallments(installments);
  return installments;
};

// Reset to initial demo data
export const resetToDemoData = () => {
  localStorage.setItem(KEYS.CARS, JSON.stringify(INITIAL_CARS));
  localStorage.setItem(KEYS.INSTALLMENTS, JSON.stringify(INITIAL_INSTALLMENTS));
  localStorage.setItem(KEYS.EXPENSES, JSON.stringify(INITIAL_EXPENSES));
};

// Calculate Financial Summaries & KPIs
export const calculateKPIs = () => {
  const cars = getCars();
  const expenses = getExpenses();
  const installments = getInstallments();

  // Active inventory calculation
  const availableCars = cars.filter(c => c.status === 'available' || c.status === 'in_prep');
  const inventoryCapital = availableCars.reduce((sum, c) => sum + (c.totalCost || 0), 0);
  const targetInventoryRevenue = availableCars.reduce((sum, c) => sum + (c.targetSalePrice || 0), 0);

  // Sold cars analysis
  const soldCars = cars.filter(c => c.status === 'sold' && c.saleDetails);
  const totalSalesRevenue = soldCars.reduce((sum, c) => sum + (c.saleDetails.actualSalePrice || 0), 0);
  const totalSoldCarCosts = soldCars.reduce((sum, c) => sum + (c.totalCost || 0), 0);
  const grossCarsProfit = totalSalesRevenue - totalSoldCarCosts;

  // Total General Showroom Expenses
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  // Net Profit (Gross Car Sales Profit - Showroom General Expenses)
  const netProfit = grossCarsProfit - totalExpenses;

  // Installment Stats
  const totalInstallmentsDebt = installments.reduce((sum, i) => sum + (i.remainingAmount || 0), 0);

  return {
    totalCarsCount: cars.length,
    availableCarsCount: availableCars.length,
    soldCarsCount: soldCars.length,
    inventoryCapital,
    targetInventoryRevenue,
    totalSalesRevenue,
    grossCarsProfit,
    totalExpenses,
    netProfit,
    totalInstallmentsDebt
  };
};

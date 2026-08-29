import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import SalesPurchases from './components/SalesPurchases';
import Installments from './components/Installments';
import Expenses from './components/Expenses';
import ExcelManager from './components/ExcelManager';
import CarModal from './components/CarModal';
import SaleModal from './components/SaleModal';
import InvoicePrint from './components/InvoicePrint';

import { 
  initStorage, 
  getCars, 
  getInstallments, 
  getExpenses, 
  addOrUpdateCar, 
  deleteCar, 
  sellCar, 
  addExpense, 
  deleteExpense, 
  recordInstallmentPayment,
  resetToDemoData,
  calculateKPIs,
  saveCars
} from './utils/storage';

import { exportToExcel } from './utils/excel';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cars, setCars] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [kpis, setKpis] = useState({
    netProfit: 0,
    inventoryCapital: 0,
    totalSalesRevenue: 0,
    grossCarsProfit: 0,
    totalExpenses: 0,
    totalInstallmentsDebt: 0,
    availableCarsCount: 0,
    soldCarsCount: 0
  });

  // Modals state
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [carToSell, setCarToSell] = useState(null);
  const [carToPrint, setCarToPrint] = useState(null);

  // Initialize storage & sync state
  useEffect(() => {
    initStorage();
    refreshData();
  }, []);

  const refreshData = () => {
    const loadedCars = getCars();
    const loadedInstallments = getInstallments();
    const loadedExpenses = getExpenses();

    setCars(loadedCars);
    setInstallments(loadedInstallments);
    setExpenses(loadedExpenses);
    setKpis(calculateKPIs());
  };

  // Handlers
  const handleSaveCar = (carData) => {
    addOrUpdateCar(carData);
    refreshData();
  };

  const handleDeleteCar = (carId) => {
    if (window.confirm('هل أنت تأكد من رغبتك في حذف هذه السيارة من السيستم؟')) {
      deleteCar(carId);
      refreshData();
    }
  };

  const handleOpenSellModal = (car) => {
    setCarToSell(car);
    setIsSaleModalOpen(true);
  };

  const handleConfirmSale = (carId, saleData) => {
    sellCar(carId, saleData);
    refreshData();
  };

  const handleAddExpense = (expData) => {
    addExpense(expData);
    refreshData();
  };

  const handleDeleteExpense = (expId) => {
    deleteExpense(expId);
    refreshData();
  };

  const handleRecordPayment = (instId, amount, note) => {
    recordInstallmentPayment(instId, amount, note);
    refreshData();
  };

  const handleExportExcel = () => {
    exportToExcel(cars, installments, expenses, kpis);
  };

  const handleImportCars = (importedCars) => {
    const updated = [...importedCars, ...cars];
    saveCars(updated);
    refreshData();
    setActiveTab('inventory');
  };

  const handleResetDemo = () => {
    if (window.confirm('هل تريد استعادة البيانات الافتراضية العرضية لمعرض الماسة؟')) {
      resetToDemoData();
      refreshData();
    }
  };

  return (
    <div className="app-container">
      
      {/* Top Header & Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenAddCar={() => {
          setCarToEdit(null);
          setIsCarModalOpen(true);
        }}
        onExportExcel={handleExportExcel}
        netProfit={kpis.netProfit}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            kpis={kpis}
            cars={cars}
            expenses={expenses}
            installments={installments}
            onNavigateTab={setActiveTab}
            onOpenAddCar={() => {
              setCarToEdit(null);
              setIsCarModalOpen(true);
            }}
          />
        )}

        {activeTab === 'inventory' && (
          <Inventory 
            cars={cars}
            onOpenAddCar={() => {
              setCarToEdit(null);
              setIsCarModalOpen(true);
            }}
            onEditCar={(car) => {
              setCarToEdit(car);
              setIsCarModalOpen(true);
            }}
            onDeleteCar={handleDeleteCar}
            onOpenSellModal={handleOpenSellModal}
          />
        )}

        {activeTab === 'sales' && (
          <SalesPurchases 
            cars={cars}
            onPrintInvoice={(car) => setCarToPrint(car)}
          />
        )}

        {activeTab === 'installments' && (
          <Installments 
            installments={installments}
            onRecordPayment={handleRecordPayment}
          />
        )}

        {activeTab === 'expenses' && (
          <Expenses 
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        )}

        {activeTab === 'excel' && (
          <ExcelManager 
            cars={cars}
            installments={installments}
            expenses={expenses}
            kpis={kpis}
            onExport={handleExportExcel}
            onImportCars={handleImportCars}
            onResetDemo={handleResetDemo}
          />
        )}
      </main>

      {/* Car Modal (Add/Edit) */}
      <CarModal 
        isOpen={isCarModalOpen}
        onClose={() => setIsCarModalOpen(false)}
        onSave={handleSaveCar}
        carToEdit={carToEdit}
      />

      {/* Sale Modal */}
      <SaleModal 
        car={carToSell}
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        onConfirmSale={handleConfirmSale}
      />

      {/* Invoice & Contract Printable Modal */}
      {carToPrint && (
        <InvoicePrint 
          car={carToPrint}
          onClose={() => setCarToPrint(null)}
        />
      )}

    </div>
  );
}

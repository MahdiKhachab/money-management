import React, { useState, useEffect } from 'react';
import ExpenseForm from '../features/expenses/ExpenseForm';
import ExpenseList from '../features/expenses/ExpenseList';
import { fetchExpenses } from '../api/expenseService';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);

  // تحميل المصروفات
  const loadExpenses = async () => {
    try {
      const res = await fetchExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error('فشل في تحميل المصروفات', err);
    }
  };

  // تحميل البيانات عند أول تشغيل
  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className="p-6">
      {/* نموذج الإضافة */}
      <ExpenseForm onExpenseCreated={loadExpenses} />

      {/* قائمة المصروفات */}
      <ExpenseList expenses={expenses} reload={loadExpenses} />
    </div>
  );
};

export default ExpensesPage;

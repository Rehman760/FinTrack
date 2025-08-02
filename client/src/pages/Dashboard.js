import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { FiShoppingCart, FiTruck, FiCoffee } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import AddIncome from './AddIncome';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const navigate = useNavigate();
  const [showAddIncome, setShowAddIncome] = useState(false);

  const iconMap = {
    Grocery: <FiShoppingCart className="text-xl" />,
    Transportation: <FiTruck className="text-xl" />,
    Dining: <FiCoffee className="text-xl" />,
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      try {
        // Fetch expenses
        const expRes = await API.get('/expenses');
        setExpenses(expRes.data);
        let totalExp = 0;
        expRes.data.forEach((e) => {
          totalExp += Number(e.amount);
        });
        setTotalExpenses(totalExp);

        // Fetch income
        const incRes = await API.get(`/income/${userId}`);
        setIncome(incRes.data);
        let totalInc = 0;
        incRes.data.forEach((i) => {
          totalInc += Number(i.amount);
        });
        setTotalIncome(totalInc);

        // Calculate balance
        setCurrentBalance(totalInc - totalExp);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-8">
      <Navbar />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-100 p-6 rounded-xl">
          <h2 className="text-sm text-gray-600">Current Balance</h2>
          <p className="text-2xl font-semibold">${currentBalance.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl">
          <h2 className="text-sm text-gray-600">Total Income</h2>
          <p className="text-2xl font-semibold">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl">
          <h2 className="text-sm text-gray-600">Total Expenses</h2>
          <p className="text-2xl font-semibold">${totalExpenses.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-gray-500">No expenses found.</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense._id} className="flex items-center justify-between bg-white p-4 shadow-sm rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    {iconMap[expense.category] || <FiShoppingCart className="text-xl" />}
                  </div>
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-700">-${expense.amount}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AddIncome modal can be triggered from Navbar now, so remove from here */}
    </div>
  );
};

export default Dashboard;

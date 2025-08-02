import { useState, useEffect } from 'react';

const ExpenseForm = ({ onAdd, onUpdate, editingExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        ...editingExpense,
        date: editingExpense.date?.slice(0, 10) || '',
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: '',
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingExpense) {
      await onUpdate(editingExpense._id, formData);
    } else {
      await onAdd(formData);
    }
    setFormData({ title: '', amount: '', category: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <button type="submit">{editingExpense ? 'Update' : 'Add'} Expense</button>
    </form>
  );
};

export default ExpenseForm;

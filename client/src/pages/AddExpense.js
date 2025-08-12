import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const AddExpense = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
        description: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isTitleValid = (title) => {
        return title.trim() !== '' && !/^\d+$/.test(title);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const amount = Number(formData.amount);

        if (!userId || !formData.title || !formData.amount || !formData.date) {
            setError('Title, amount, and date are required.');
            return;
        }
        if (!isTitleValid(formData.title)) {
            setError('Expense title cannot be only numbers.');
            return;
        }
        if (isNaN(amount) || amount < 0) {
            setError('Amount must be a non-negative number.');
            return;
        }

        try {
            await API.post('/expenses', { userId, ...formData, amount });
            setFormData({
                title: '',
                amount: '',
                category: '',
                date: '',
                description: '',
            });
            setError('');
            if (onSuccess) onSuccess();
            else navigate('/dashboard');
        } catch (err) {
            const msg = err?.response?.data?.message || 'Failed to add expense';
            setError(msg);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Expense</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Expense Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    rows={3}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default AddExpense;
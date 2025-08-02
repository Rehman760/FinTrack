import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function AddIncome({ onSuccess }) {
    const [formData, setFormData] = useState({ amount: '', source: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId || !formData.amount) {
            setError('User ID and amount are required');
            return;
        }
        try {
            await API.post('/income', { userId, ...formData });
            setFormData({ amount: '', source: '' });
            setError('');
            if (onSuccess) onSuccess();
            else navigate('/dashboard');
        } catch (err) {
            const msg = err?.response?.data?.message || 'Failed to add income';
            setError(msg);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Income</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    name="source"
                    placeholder="Source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                >
                    Add Income
                </button>
            </form>
        </div>
    );
}

export default AddIncome;

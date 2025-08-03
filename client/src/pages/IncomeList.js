import { useEffect, useState } from 'react';
import API from '../api/axios';

function IncomeList() {
    const [incomeList, setIncomeList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editAmount, setEditAmount] = useState('');
    const [editSource, setEditSource] = useState('');
    const userId = localStorage.getItem('userId');

    const fetchIncome = async () => {
        try {
            const res = await API.get(`/income/${userId}`);
            setIncomeList(res.data);
        } catch (err) {
            alert('Failed to fetch income');
        }
    };

    useEffect(() => {
        fetchIncome();
    }, [fetchIncome]);

    const handleEdit = (income) => {
        setEditId(income._id);
        setEditAmount(income.amount);
        setEditSource(income.source);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/income/${editId}`, { amount: editAmount, source: editSource });
            setEditId(null);
            setEditAmount('');
            setEditSource('');
            fetchIncome();
        } catch (err) {
            alert('Failed to update income');
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Income List</h2>
            <ul className="space-y-4">
                {incomeList.map((income) => (
                    <li key={income._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        {editId === income._id ? (
                            <form onSubmit={handleUpdate} className="flex gap-2 items-center w-full">
                                <input
                                    type="number"
                                    value={editAmount}
                                    onChange={(e) => setEditAmount(e.target.value)}
                                    className="border p-2 w-24"
                                    required
                                />
                                <input
                                    type="text"
                                    value={editSource}
                                    onChange={(e) => setEditSource(e.target.value)}
                                    className="border p-2 w-40"
                                />
                                <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
                                <button type="button" onClick={() => setEditId(null)} className="ml-2 px-3 py-1 rounded border">Cancel</button>
                            </form>
                        ) : (
                            <>
                                <div>
                                    <div className="font-semibold">${income.amount}</div>
                                    <div className="text-gray-500 text-sm">{income.source}</div>
                                </div>
                                <button onClick={() => handleEdit(income)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IncomeList;

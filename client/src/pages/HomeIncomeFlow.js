import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import AddIncome from './AddIncome';

function HomeIncomeFlow() {
    const [hasIncome, setHasIncome] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchIncome = async () => {
            if (!userId) return setHasIncome(false);
            try {
                const res = await API.get(`/income/${userId}`);
                setHasIncome(res.data.length > 0);
            } catch {
                setHasIncome(false);
            }
        };
        fetchIncome();
    }, [userId]);

    const handleAddSuccess = () => {
        navigate('/dashboard');
    };

    if (!userId) return null;

    if (hasIncome === null) return <div>Loading...</div>;

    if (!hasIncome || showAdd) {
        return (
            <div className="my-8">
                <AddIncome onSuccess={handleAddSuccess} />
            </div>
        );
    }

    return (
        <div className="my-8 flex flex-col items-center gap-4">
            <button onClick={() => setShowAdd(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Add More Income</button>
            <button onClick={() => navigate('/income-list')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">View Income List</button>
        </div>
    );
}

export default HomeIncomeFlow;

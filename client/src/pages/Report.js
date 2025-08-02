import { useEffect, useState, useMemo } from 'react';
import API from '../api/axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await API.get('/expenses');
                setData(res.data);
            } catch (err) {
                console.error('Error fetching expenses:', err);
            }
        };
        fetchExpenses();
    }, []);

    const weeklyData = useMemo(() => {
        const weekly = {};

        data.forEach(exp => {
            const date = new Date(exp.date);
            const week = `Week ${Math.ceil(date.getDate() / 7)}`;
            if (!weekly[week]) weekly[week] = 0;
            weekly[week] += exp.amount;
        });

        return Object.entries(weekly).map(([week, total]) => ({
            week,
            total,
        }));
    }, [data]);

    const monthlyData = useMemo(() => {
        const monthly = {};

        data.forEach(exp => {
            const date = new Date(exp.date);
            const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            if (!monthly[month]) monthly[month] = 0;
            monthly[month] += exp.amount;
        });

        return Object.entries(monthly).map(([month, total]) => ({
            month,
            total,
        }));
    }, [data]);

    const categoryData = useMemo(() => {
        const cat = {};

        data.forEach(exp => {
            if (!cat[exp.category]) cat[exp.category] = 0;
            cat[exp.category] += exp.amount;
        });

        return Object.entries(cat).map(([name, value]) => ({
            name,
            value,
        }));
    }, [data]);

    return (
        <div className="p-4 space-y-10 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center">Expense Reports</h2>

            {/* Monthly Trend */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Monthly Expenses</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Weekly Trend */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Weekly Expenses</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Category Trend */}
            <div>
                <h3 className="text-lg font-semibold mb-2">By Category</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            label
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Reports;

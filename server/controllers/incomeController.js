// Update income record
export const updateIncome = async (req, res) => {
    const { id } = req.params;
    const { amount, source } = req.body;
    try {
        const updated = await Income.findByIdAndUpdate(
            id,
            { $set: { amount, source } },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Income record not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update income', error });
    }
};
// controllers/incomeController.js
import Income from '../models/Income.js';

// Add new income
export const addIncome = async (req, res) => {
    const { userId, amount, source } = req.body;

    if (!userId || !amount) {
        return res.status(400).json({ message: 'User ID and amount are required' });
    }

    try {
        const income = new Income({
            userId,
            amount,
            source,
        });

        const savedIncome = await income.save();
        res.status(201).json(savedIncome);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add income', error });
    }
};

// Get all income records for a user
export const getUserIncome = async (req, res) => {
    const { userId } = req.params;

    try {
        const incomeRecords = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomeRecords);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch income records', error });
    }
};

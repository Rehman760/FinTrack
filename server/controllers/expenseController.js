import Expense from '../models/Expense.js';

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "userId is required" });
    }

    const expense = new Expense({
      title,
      amount,
      category,
      description,
      date: new Date(date),
      userId: req.user.id, // Ensure userId is set from the authenticated user
    });

    await expense.save();

    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    console.error('Add Expense Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET all expenses for logged-in user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
};

// UPDATE expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date } = req.body;
  console.log("Update Request ID:", req.params.id);
  console.log("User ID:", req.userId);


  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, amount, category, date },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error });
  }
};

// DELETE expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
};
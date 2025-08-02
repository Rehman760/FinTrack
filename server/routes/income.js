// routes/income.js
import express from 'express';
import { addIncome, getUserIncome, updateIncome } from '../controllers/incomeController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();


// Add income entry
router.post('/', verifyToken, addIncome);

// Update income entry
router.put('/:id', verifyToken, updateIncome);

// Get all income entries for a user
router.get('/:userId', verifyToken, getUserIncome);

export default router;

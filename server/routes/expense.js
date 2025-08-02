import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getExpenses,
  updateExpense,
  deleteExpense,
  addExpense,
} from '../controllers/expenseController.js';


const router = express.Router();

router.post('/', verifyToken, addExpense);            // Create
router.get('/', verifyToken, getExpenses);            // Read
router.put('/:id', verifyToken, updateExpense);       // Update
router.delete('/:id', verifyToken, deleteExpense);    // Delete

export default router;


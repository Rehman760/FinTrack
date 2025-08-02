const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <div>
      <h4>{expense.title}</h4>
      <p>Amount: ${expense.amount}</p>
      <p>Category: {expense.category}</p>
      <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
      <button onClick={() => onDelete(expense._id)}>Delete</button>
    </div>
  );
};

export default ExpenseItem;

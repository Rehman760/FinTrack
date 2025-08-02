const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  return (
    <ul>
      {expenses.map(exp => (
        <li key={exp._id}>
          <strong>{exp.title}</strong> - ${exp.amount} - {exp.category} -
          {exp.date ? new Date(exp.date).toLocaleDateString() : 'No Date'}
          <button onClick={() => onEdit(exp)}>Edit</button>
          <button onClick={() => onDelete(exp._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;

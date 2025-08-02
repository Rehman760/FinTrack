import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import Home from './pages/Home';
import Report from './pages/Report';
import AddIncome from './pages/AddIncome';
import Profile from './pages/Profile';
import IncomeList from './pages/IncomeList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/add-income" element={<AddIncome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/income-list" element={<IncomeList />} />
      </Routes>
    </Router>
  );
}

export default App;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const navLinks = isLoggedIn ? (
        <>
            <Link to="/add-expense" className="block px-3 py-2 rounded hover:bg-blue-50 md:hover:bg-transparent md:hover:text-blue-600">Add Expense</Link>
            <Link to="/report" className="block px-3 py-2 rounded hover:bg-blue-50 md:hover:bg-transparent md:hover:text-blue-600">View Reports</Link>
            <Link to="/income-list" className="block px-3 py-2 rounded hover:bg-blue-50 md:hover:bg-transparent md:hover:text-blue-600">View Incomes</Link>
            <Link to="/add-income" className="block px-3 py-2 rounded hover:bg-blue-50 md:hover:bg-transparent md:hover:text-blue-600">Add Income</Link>
            <Link to="/profile" className="block px-3 py-2 rounded hover:bg-blue-50 md:hover:bg-transparent md:hover:text-blue-600">Profile</Link>
            <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 md:w-auto md:inline md:ml-2 md:px-3 md:py-1 md:rounded">Logout</button>
        </>
    ) : (
        <>
            <Link to="/login" className="block px-3 py-2 rounded hover:bg-blue-50 md:hover:bg-transparent md:hover:text-blue-600">Login</Link>
            <Link to="/register" className="block px-3 py-2 rounded hover:bg-blue-50 md:hover:bg-transparent md:hover:text-blue-600">Register</Link>
        </>
    );

    return (
        <nav className="bg-white shadow px-4 py-3 mb-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <span
                    onClick={() => navigate('/dashboard')}
                    className="text-2xl font-bold text-blue-600 cursor-pointer select-none"
                >
                    FinTrack
                </span>
                {/* Hamburger for mobile */}
                <button
                    className="md:hidden flex items-center px-2 py-1 border rounded text-blue-600 border-blue-600 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
                {/* Desktop menu */}
                <div className="hidden md:flex md:items-center md:gap-2">
                    {navLinks}
                </div>
            </div>
            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden mt-2 flex flex-col gap-1 bg-white rounded shadow p-2 animate-fade-in">
                    {navLinks}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

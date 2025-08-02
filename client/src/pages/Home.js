import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Welcome to <span className="text-blue-600">FinTrack</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mb-6">
                Track Smart. Spend Wise. <br />
                Your personal expense manager that keeps you in control of your finances.
            </p>

            <div className="flex gap-4">
                <Link to="/register">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md">
                        Get Started
                    </button>
                </Link>
                <Link to="/login">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md">
                        Log In
                    </button>
                </Link>
            </div>

            {/* <HomeIncomeFlow /> */}

            <img
                src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
                alt="Finance Illustration"
                className="w-60 mt-10 opacity-80"
            />
        </div>
    );
};

export default Home;

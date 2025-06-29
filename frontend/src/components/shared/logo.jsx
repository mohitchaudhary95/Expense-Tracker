// src/components/shared/Logo.jsx
import { Link } from 'react-router-dom';
import logo from '@/assets/expenselogo.png'; // use import for reliability

const Logo = () => {
  return (
    <Link to="/" className="inline-block">
      <img
        src={logo}
        alt="Expense Tracker Logo"
        className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
      />
    </Link>
  );
};

export default Logo;

import React from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../context/AuthContext';
import { logout } from '../firebase/auth';

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-primary shadow-lg">
      <nav className="container mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="text-white font-semibold text-2xl">
          <Link to="/">CoC Demon</Link>
        </div>

        {/* NAV LINKS */}
        <ul className="flex justify-center text-white gap-x-8">
          <li>
            <Link to="/" className="hover:text-green-300 transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-300 transition-colors duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-green-300 transition-colors duration-300">
              Search
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-300 transition-colors duration-300">
              Contact
            </Link>
          </li>
        </ul>

        {/* NAV ICONS */}
        <div className="flex items-center gap-x-4 text-white text-2xl">
          <Link to="/search" className="hover:text-green-300 transition-colors duration-300">
            <CiSearch />
          </Link>
          {
            user ? (
              <>
                <Link to="/profile" className="hover:text-green-300 transition-colors duration-300">
                  <img src={user.photoURL} className="size-16 rounded-full"/>
                </Link>
                <button onClick={handleLogout} className="hover:text-green-300 transition-colors duration-300">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-green-300 transition-colors duration-300">
                Login
              </Link>
            )
          }
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

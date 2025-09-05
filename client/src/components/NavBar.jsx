//Made a new component for the navbar so it can display across multiple pages

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';   // use NavLink for active styles
import { useUser } from '../UserContext';

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    // Clear user state and localStorage
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    
    try {
      await fetch("/api/users/logout", { method: "POST" });
    } catch {
      // Ignore logout errors
    }
    
    // Redirect to login page
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-peach/40 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo / Title */}
          <NavLink to="/" className="text-xl sm:text-2xl font-extrabold text-fridgeText" onClick={closeMobileMenu}>
            TABETAI
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {[
              { to: '/', label: 'Home' },
              { to: '/favorites', label: 'Favorites' },
              { to: '/your-recipes', label: 'Your Recipes' },
              { to: '/create-recipe', label: 'Create Recipe' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors
                   ${
                     isActive
                       ? 'text-peach bg-lavender/40'
                       : 'text-fridgeText hover:text-peach'
                   }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Desktop Login / Logout */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-fridgeText text-sm hidden lg:block">
                  Hello, {user.name || user.username || 'User'}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="bg-yellow text-fridgeText hover:bg-lavender px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-fridgeText hover:text-peach focus:outline-none focus:ring-2 focus:ring-inset focus:ring-peach p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-peach/60 rounded-lg mt-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/favorites', label: 'Favorites' },
                { to: '/your-recipes', label: 'Your Recipes' },
                { to: '/create-recipe', label: 'Create Recipe' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors
                     ${
                       isActive
                         ? 'text-peach bg-lavender/40'
                         : 'text-fridgeText hover:text-peach hover:bg-lavender/20'
                     }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              
              {/* Mobile Login / Logout */}
              <div className="border-t border-fridgeText/20 pt-3 mt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <span className="text-fridgeText text-sm">
                        Hello, {user.name || user.username || 'User'}!
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="w-full text-left bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block bg-yellow text-fridgeText hover:bg-lavender px-3 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm text-center"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

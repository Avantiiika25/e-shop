import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaHome, FaShoppingBag } from 'react-icons/fa';
import axios from 'axios';

const Header = ({ setSearchQuery, setSelectedCategory }) => {
  const [darkMode, setDarkMode] = useState(false); // Theme toggle
  const [localSearch, setLocalSearch] = useState(''); // Local search input
  const [suggestions, setSuggestions] = useState([]); // Product suggestions
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // ✅ Fetch & filter products for suggestions
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearch(query);
    setSearchQuery(query);

    if (query.length > 0) {
      axios.get('https://fakestoreapi.com/products').then((res) => {
        const matches = res.data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(matches);
      });
    } else {
      setSuggestions([]);
    }
  };

  // ✅ Navigate on search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigate(`/search/${localSearch}`);
      setSuggestions([]); // close dropdown
    }
  };

  // ✅ Close suggestions dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-[#6C3428] text-black dark:text-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* ✅ Logo → always redirects to homepage */}
        <Link to="/" className="flex items-center gap-2">
          <FaShoppingBag className="text-3xl text-[#BA704F] dark:text-[#DFA878]" />
          <span className="text-2xl font-bold text-[#BA704F] dark:text-[#DFA878] tracking-wide">
            E-Shop
          </span>
        </Link>

        {/* ✅ Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          ref={searchRef}
          className="max-w-3xl w-full mx-6 relative"
        >
          <div className="flex">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search products..."
                value={localSearch}
                onChange={handleSearchChange}
                required
                className="block p-2.5 w-full z-20 text-sm text-black bg-[#CEE6F3] rounded-lg border border-[#BA704F] focus:ring-[#BA704F] focus:border-[#BA704F] dark:bg-[#CEE6F3] dark:text-black"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm h-full text-white bg-[#BA704F] rounded-e-lg border border-[#BA704F] hover:bg-[#6C3428] focus:ring-2 focus:outline-none focus:ring-[#DFA878]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>

              {/* ✅ Suggestions dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute z-50 bg-white dark:bg-[#6C3428] shadow-md rounded mt-1 w-full max-h-60 overflow-y-auto text-sm">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="px-4 py-2 hover:bg-[#F5EBDD] dark:hover:bg-[#BA704F] cursor-pointer"
                      onClick={() => {
                        setSuggestions([]); // close dropdown
                        navigate(`/product/${item.id}`); // navigate to product detail
                      }}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </form>

        {/* ✅ Nav Icons */}
        <div className="flex items-center gap-4">
          <Link to="/" title="Home">
            <FaHome className="hover:text-[#BA704F] dark:hover:text-[#DFA878]" />
          </Link>

          {/* ✅ FIXED: Wishlist route → /wishlist */}
          <Link to="/wishlist" title="Wishlist">
            <FaHeart className="hover:text-[#BA704F] dark:hover:text-[#DFA878]" />
          </Link>

          <Link to="/cart" title="Cart">
            <FaShoppingCart className="hover:text-[#BA704F] dark:hover:text-[#DFA878]" />
          </Link>

          <Link
            to="/login"
            className="text-sm font-semibold hover:text-[#BA704F] dark:hover:text-[#DFA878]"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold hover:text-[#BA704F] dark:hover:text-[#DFA878]"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

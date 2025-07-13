import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/Auth';


const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Left side - Always visible */}
      <div className="text-xl font-bold">timeLapse</div>

      {/* Right side - Only visible when logged in */}
      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          <NavLink 
            to="/monthview" 
            className={({isActive}) => 
              `px-3 py-1 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
            }
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/currentweek" 
            className={({isActive}) => 
              `px-3 py-1 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
            }
          >
            WeekSheet
          </NavLink>
          
          {/* User dropdown - Now with click handling */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 px-3 py-1 rounded hover:bg-gray-700"
            >
              <span>{user?.username}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-gray-700 rounded shadow-lg z-50"
              >
                <NavLink 
                  to="/logout"
                  className="block w-full text-left px-4 py-2 rounded"
                  onClick={() => setDropdownOpen(false)}
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
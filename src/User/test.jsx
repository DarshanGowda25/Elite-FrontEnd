// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Menu } from 'lucide-react';

function Nav() {
  const [isHamburger, setHamburger] = useState(false);

  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 relative">
        
        {/* Logo */}
        <div className="text-2xl font-bold">MySite</div>

        {/* Hamburger Icon (Mobile) */}
        <button
          onClick={() =>setHamburger(!isHamburger)}
          className="text-2xl md:hidden focus:outline-none"
        >
          <Menu/>
        </button>

        {/* Menu */}
        <ul
          className={`${
            isHamburger ? 'flex' : 'hidden'
          } bg-blue-800 flex-col absolute top-16 left-0 w-full text-center space-y-4 p-4 z-10
            md:flex md:flex-row md:static md:w-auto md:bg-transparent md:text-left md:space-y-0 md:space-x-6 md:p-0`}
        >
          <li><a href="#" className="block hover:text-gray-300">Home</a></li>
          <li><a href="#" className="block hover:text-gray-300">Contact Us</a></li>
          <li><a href="#" className="block hover:text-gray-300">About Us</a></li>
          <li><a href="#" className="block hover:text-gray-300">Gallery</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

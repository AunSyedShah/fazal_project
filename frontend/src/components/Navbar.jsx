import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-700">Eventify</Link>
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
        <div className={`flex-col md:flex-row md:flex gap-6 items-center ${menuOpen ? 'flex' : 'hidden'} md:static absolute top-full left-0 w-full bg-white md:bg-transparent md:w-auto md:gap-6`}>
          <NavLink to="/events" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Events</NavLink>
          <NavLink to="/events/new" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Add Event</NavLink>
          {/* Future links: Users, Tickets, etc. */}
        </div>
      </div>
    </nav>
  );
}

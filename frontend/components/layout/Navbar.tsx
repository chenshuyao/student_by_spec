import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Navbar component for the application.
 * Contains navigation links and branding.
 */
const Navbar: React.FC = () => {
  const pathname = usePathname();
  
  // Check if the current path matches a navlink
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-primary-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Student Management</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link 
                href="/" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16
                  ${isActive('/') 
                    ? 'border-white text-white' 
                    : 'border-transparent text-gray-200 hover:border-gray-300 hover:text-white'}`}
              >
                Students
              </Link>
              
              <Link 
                href="/students/create" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16
                  ${isActive('/students/create') 
                    ? 'border-white text-white' 
                    : 'border-transparent text-gray-200 hover:border-gray-300 hover:text-white'}`}
              >
                Add Student
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-primary-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu (simplified) */}
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state (not implemented in this simplified version) */}
      <div className="hidden md:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link 
            href="/" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${isActive('/') 
                ? 'bg-primary-800 border-white text-white' 
                : 'border-transparent text-gray-200 hover:bg-primary-600 hover:border-gray-300 hover:text-white'}`}
          >
            Students
          </Link>
          
          <Link 
            href="/students/create" 
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium
              ${isActive('/students/create') 
                ? 'bg-primary-800 border-white text-white' 
                : 'border-transparent text-gray-200 hover:bg-primary-600 hover:border-gray-300 hover:text-white'}`}
          >
            Add Student
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
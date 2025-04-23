import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Main layout component that includes the Navbar and Footer.
 * Wraps all pages in the application for consistent layout.
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 
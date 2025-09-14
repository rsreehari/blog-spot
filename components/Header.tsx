import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">AB</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight gradient-text">
              Awesome Blog
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
              Home
            </Link>
            <a href="#categories" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
              Categories
            </a>
            <a href="#about" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
              About
            </a>
            <a href="#newsletter" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
              Newsletter
            </a>
            <DarkModeToggle />
            <button className="btn-primary text-sm px-4 py-2">
              Subscribe
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/50 mt-2">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2">
                Home
              </Link>
              <a href="#categories" className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2">
                Categories
              </a>
              <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2">
                About
              </a>
              <a href="#newsletter" className="text-slate-600 hover:text-slate-900 transition-colors font-medium py-2">
                Newsletter
              </a>
              <button className="btn-primary text-sm px-4 py-2 mt-2 w-full">
                Subscribe
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
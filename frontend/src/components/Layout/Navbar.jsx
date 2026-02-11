import { useState } from "react";
import {ShoppingCart, User, Menu, X} from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar(){
    const[cartCount, setCartCount] = useState(0);
    const[mobileMenuOpen, setMobilMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
            {/*logo */}
                <div className="flex items-center">
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg mr-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        TechStore Pro
                    </h1>
                </div>
                {/*Desktop*/}
                <div className="hidden md:flex space-x-6">
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                        Inicio
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"></span>
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                        Productos
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                        Categorias
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                    </a>
                    <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                        Contacto
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                    </a>
                </div>
                {/* cart and login icons */}
                <div className="flex items-center space-x-2">
                    {/* cart icon */}
                    <a href="#" className="relative group p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-105">
                        <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-all duration-300 group-hover:rotate-3"/>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-linear-to-r from-red-500 via-pink-500 to-red-600 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-lg border-2 border-white animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </a>
                    {/*login icon*/}
                    <Link to = {"/Login"}
                        className="relative group p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-105">
                        <User className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-all duration-300"/>
                    </Link>
                        {/*mobile menu button */}
                        <button onClick={() => setMobilMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300">
                            {mobileMenuOpen ?(
                                <X className="w-6 h-6 text-gray-700"/>
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700"/>
                            )}
                        </button>
                </div>
            </div>
            {/*mobile menu*/}
            {mobileMenuOpen && (
                <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col space-y-4">
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">
                            Inicio
                        </a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">
                            Productos
                        </a><a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">
                            Categorias
                        </a><a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">
                            Contacto
                        </a>
                    </div>
                </div>
            )}
            </nav>
        </header>
    );
}
export default Navbar;
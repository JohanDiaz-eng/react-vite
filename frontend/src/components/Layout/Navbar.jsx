import { useState, useRef, useEffect } from "react";
import { ShoppingCart, User, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { usuario, logout } = useAuth();
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobilMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Cierra el dropdown si se hace click fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getIniciales = (nombre) => {
        if (!nombre) return "?";
        return nombre.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
    };

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg mr-3">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            TechStore Pro
                        </h1>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                            Inicio
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"></span>
                        </Link>
                        <Link to="/productos" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                            Productos
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                        </Link>
                        <Link to="/categorias" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                            Categorias
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                        </Link>
                        <Link to="/contacto" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                            Contacto
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Iconos derecha */}
                    <div className="flex items-center space-x-2">

                        {/* Carrito */}
                        <a href="#" className="relative group p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:scale-105">
                            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-all duration-300 group-hover:rotate-3" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-linear-to-r from-red-500 via-pink-500 to-red-600 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-lg border-2 border-white animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </a>

                        {/* Usuario: si está logueado muestra avatar + dropdown, si no muestra ícono de login */}
                        {usuario ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 p-1.5 hover:bg-blue-50 rounded-xl transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-1xl font-bold shadow">
                                        {getIniciales(usuario.nombre)}
                                    </div>
                                    <span className="hidden md:block text-sm font-medium text-gray-700 max-w-100px truncate">
                                        {usuario.nombre}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{usuario.nombre}</p>
                                            <p className="text-xs text-gray-500 truncate">{usuario.email}</p>
                                        </div>
                                        <Link
                                            to="/perfil"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                                        >
                                            <User className="w-4 h-4" />
                                            Mi Perfil
                                        </Link>
                                        <button
                                            onClick={() => { setDropdownOpen(false); logout(); }}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="relative group p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <User className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-all duration-300" />
                            </Link>
                        )}

                        {/* Botón menú móvil */}
                        <button
                            onClick={() => setMobilMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-300"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Menú móvil */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <Link to="/" onClick={() => setMobilMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Inicio</Link>
                            <Link to="/productos" onClick={() => setMobilMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Productos</Link>
                            <Link to="/categorias" onClick={() => setMobilMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Categorias</Link>
                            <Link to="/contacto" onClick={() => setMobilMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Contacto</Link>
                            {usuario && (
                                <>
                                    <Link to="/perfil" onClick={() => setMobilMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Mi Perfil</Link>
                                    <button onClick={logout} className="text-left text-red-500 hover:text-red-600 font-medium transition-colors duration-200 py-2">Cerrar sesión</button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Navbar;
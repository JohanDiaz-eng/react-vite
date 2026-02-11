function Footer() {
    return (
    <footer id="contacto" className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <div className="flex items-center mb-4">
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg mr-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1.5.866l-.5.866V9z"/></svg>
                    </div>
                    <h3 className="text-xl font-bold">TechStore Pro</h3>
                </div>
                <p className="text-gray-400 mb-4">Tu tienda de tecnologia de confianza con los mejores productos y precios.</p>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
                <ul className="space-y-2 text-gray-400">
                    <li><a href="../pages/index.html" className="hover:text-white transition-colors duration-200">Inicio</a></li>
                    <li><a href="../pages/productos.html" className="hover:text-white transition-colors duration-200">Productos</a></li>
                    <li><a href="carrito.html" className="hover:text-white transition-colors duration-200">Carrito</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Atencion</h3>
                <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Contacto</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Envios</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Devoluciones</a></li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Terminos</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Privacidad</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Cookies</a></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TechStore Pro. Todos los derechos reservados.</p>
        </div>
    </div>
    </footer>
    );
}
export default Footer;
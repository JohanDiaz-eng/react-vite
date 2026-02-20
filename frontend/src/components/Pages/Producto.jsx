import { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

const API_URL = "http://localhost:8081/api/productos";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("relevancia");
  const [rango, setRango] = useState("cualquiera");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("usuario"))?.token;
        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProductos(Array.isArray(data) ? data : []);
      } catch {
        console.error("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Filtros
  const productosFiltrados = productos
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .filter((p) => {
      if (rango === "menos500") return p.precio < 500000;
      if (rango === "500a1000") return p.precio >= 500000 && p.precio <= 1000000;
      if (rango === "mas1000") return p.precio > 1000000;
      return true;
    })
    .sort((a, b) => {
      if (ordenar === "precio_asc") return a.precio - b.precio;
      if (ordenar === "precio_desc") return b.precio - a.precio;
      if (ordenar === "nombre") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  // Paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const inicio = (paginaActual - 1) * productosPorPagina;
  const productosPagina = productosFiltrados.slice(inicio, inicio + productosPorPagina);

  const handleAddToCart = (product) => {
    alert(`${product.nombre} agregado al carrito`);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Buscador y filtros */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2.5 
                            bg-white focus-within:border-purple-400 focus-within:ring-2 
                            focus-within:ring-purple-100 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#9ca3af" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
                className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="max-w-7xl mx-auto px-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Categoría</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 bg-white">
                  <option>Todas las Categorías</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Rango de Precio</label>
                <select
                  value={rango}
                  onChange={(e) => { setRango(e.target.value); setPaginaActual(1); }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 bg-white"
                >
                  <option value="cualquiera">Cualquier Precio</option>
                  <option value="menos500">Menos de $500.000</option>
                  <option value="500a1000">$500.000 - $1.000.000</option>
                  <option value="mas1000">Más de $1.000.000</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Ordenar Por</label>
                <select
                  value={ordenar}
                  onChange={(e) => { setOrdenar(e.target.value); setPaginaActual(1); }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 bg-white"
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="precio_asc">Precio: Menor a Mayor</option>
                  <option value="precio_desc">Precio: Mayor a Menor</option>
                  <option value="nombre">Nombre</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-6 bg-gray-200 rounded w-1/3 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : productosPagina.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-semibold">No se encontraron productos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productosPagina.map((prod) => (
                <div key={prod._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg 
                             transition-all duration-200 flex flex-col group">
                  <div className="h-52 bg-gray-100 overflow-hidden">
                    {prod.image ? (
                      <img
                        src={prod.image}
                        alt={prod.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">📦</div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{prod.nombre}</h3>
                    <p className="text-gray-400 text-xs mb-3 line-clamp-2 flex-1">{prod.descripcion}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-blue-600 font-bold text-lg">
                        {formatPrice(prod.precio)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 
                                   hover:to-purple-700 text-white px-4 py-1.5 rounded-xl text-xs 
                                   font-semibold transition-all duration-200 transform hover:scale-105"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
                disabled={paginaActual === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium 
                           text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Anterior
              </button>

              {[...Array(totalPaginas)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPaginaActual(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition
                    ${paginaActual === i + 1
                      ? "bg-blue-600 text-white shadow"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
                disabled={paginaActual === totalPaginas}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium 
                           text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
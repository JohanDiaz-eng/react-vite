import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const API_URL = "http://localhost:8081/api/productos";

function FeaturedProducts() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleAddToCart = (product) => {
    alert(`${product.Nombre} agregado al carrito`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Productos Destacados</h2>
          <p className="text-gray-600 text-lg">Los productos más populares de nuestra tienda</p>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-64 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">📦</p>
            <p className="text-lg font-semibold">No hay productos disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((product) => (
              <div
                key={product._id}
                className="border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
              >
                {/* Imagen */}
                <div className="bg-linear-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center relative overflow-hidden">
                  {product.Image ? (
                    <img
                      src={product.Image}
                      alt={product.Nombre}
                      className="h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div className="text-6xl">📦</div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">
                    {product.Nombre}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.Descripcion}
                  </p>

                  {/* Precio y botón */}
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(product.Precio)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 
                                 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all 
                                 duration-200 transform hover:scale-105"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ver todos */}
        <div className="text-center mt-12">
          <Link to="/productos"
            className="inline-block bg-gray-800 text-white px-8 py-4 rounded-lg text-lg 
            font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105">
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
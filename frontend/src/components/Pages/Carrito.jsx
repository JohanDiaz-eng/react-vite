import { useState } from "react";
import Navbar from "../Layout/Navbar.jsx";
import { useCart } from "../../context/CartContext.jsx";

const API_URL = "http://localhost:8081/api/pedido";

const formatPrice = (price) =>
    new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);

export default function Carrito() {
    const { carrito, eliminarDelCarrito, cambiarCantidad, vaciarCarrito, total } = useCart();
    const [compraFinalizada, setCompraFinalizada] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [errores, setErrores] = useState({});

    const [form, setForm] = useState({
        nombreCliente: "",
        telefono: "",
        edad: "",
        email: "",
        direccion: "",
        ciudad: "",
        codigoPostal: "",
        metodoPago: "Efectivo contra entrega",
    });

    const handleChange = (campo, valor) => {
        setForm((prev) => ({ ...prev, [campo]: valor }));
        setErrores((prev) => ({ ...prev, [campo]: "" }));
    };

    const validar = () => {
        const e = {};
        if (!form.nombreCliente.trim()) e.nombreCliente = "El nombre es obligatorio";
        if (!form.telefono.trim()) e.telefono = "El teléfono es obligatorio";
        if (!form.edad.trim()) e.edad = "La edad es obligatoria";
        if (!form.email.trim()) e.email = "El email es obligatorio";
        if (!form.direccion.trim()) e.direccion = "La dirección es obligatoria";
        if (!form.ciudad.trim()) e.ciudad = "La ciudad es obligatoria";
        if (!form.codigoPostal.trim()) e.codigoPostal = "El código postal es obligatorio";
        return e;
    };

    const handleFinalizarCompra = async () => {
        const nuevosErrores = validar();
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        setCargando(true);
        try {
            const token = JSON.parse(localStorage.getItem("usuario"))?.token;

            // Un pedido por cada producto en el carrito
            const pedidos = carrito.map((p) => ({
                N_pedido: `PED-${Date.now()}-${p.productId}`,
                nombreProducto: p.Nombre,
                descripcion: p.Descripcion,
                precio: p.Precio,
                imagen: p.Image,
                estado: "pendiente",
                nombreCliente: form.nombreCliente,
                telefono: Number(form.telefono),
                edad: Number(form.edad),
                direccion: `${form.direccion}, ${form.ciudad}, ${form.codigoPostal}`,
                email: form.email,
                total: p.Precio * p.cantidad,
            }));

            const requests = pedidos.map((pedido) =>
                fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    body: JSON.stringify(pedido),
                })
            );

            const responses = await Promise.all(requests);

// TEMPORAL - para ver el error
for (const r of responses) {
    if (!r.ok) {
        const errorData = await r.json();
        console.error("Error del backend:", JSON.stringify(errorData));
    }
}

const allOk = responses.every((r) => r.ok);
if (!allOk) throw new Error("Error al guardar uno o más pedidos");
            vaciarCarrito();
            setCompraFinalizada(true);
        } catch (error) {
            console.error("Error al finalizar compra:", error);
            setErrores({ general: "Hubo un error al procesar tu pedido. Intenta de nuevo." });
        } finally {
            setCargando(false);
        }
    };

    if (compraFinalizada) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md mx-auto">
                        <div className="text-7xl mb-6">🎉</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">¡Compra Finalizada!</h2>
                        <p className="text-gray-500 mb-2">Tu pedido ha sido recibido exitosamente.</p>
                        <p className="text-gray-400 text-sm mb-8">
                            Pronto recibirás una confirmación en <strong>{form.email}</strong>.
                        </p>
                        <a
                            href="/productos"
                            className="inline-block bg-linear-to-r from-blue-600 to-purple-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-600 transition-all"
                        >
                            Seguir Comprando
                        </a>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 items-start">

                    {/* Columna izquierda — lista de productos */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-semibold flex items-center gap-2">
                            <span className="text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </span>
                            Tu Carrito
                        </h1>
                        <p className="text-gray-500 mt-1 mb-6">Revisa tus productos antes de finalizar la compra</p>

                        {carrito.length === 0 ? (
                            <div className="text-center py-24 text-gray-400 bg-white rounded-2xl shadow-sm">
                                <p className="text-6xl mb-4">🛒</p>
                                <p className="text-xl font-semibold">Tu carrito está vacío</p>
                                <p className="text-sm mt-2">Agrega productos desde la tienda</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {carrito.map((producto) => (
                                    <div key={producto.productId} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
                                            {producto.Image
                                                ? <img src={producto.Image} alt={producto.Nombre} className="w-full h-full object-cover" />
                                                : <div className="w-full h-full flex items-center justify-center text-3xl">📦</div>
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 truncate">{producto.Nombre}</h3>
                                            <p className="text-blue-600 font-semibold text-sm">{formatPrice(producto.Precio)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => cambiarCantidad(producto.productId, producto.cantidad - 1)}
                                                className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-100 font-bold text-lg leading-none">−</button>
                                            <span className="w-6 text-center font-semibold">{producto.cantidad}</span>
                                            <button onClick={() => cambiarCantidad(producto.productId, producto.cantidad + 1)}
                                                className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-100 font-bold text-lg leading-none">+</button>
                                        </div>
                                        <span className="font-bold text-gray-800 w-32 text-right hidden sm:block">
                                            {formatPrice(producto.Precio * producto.cantidad)}
                                        </span>
                                        <button onClick={() => eliminarDelCarrito(producto.productId)}
                                            className="text-red-400 hover:text-red-600 transition-colors text-lg ml-1" title="Eliminar">✕</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Columna derecha — resumen + formulario */}
                    <div className="w-full lg:w-96 bg-white shadow-xl rounded-2xl p-6 sticky top-24">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <span className="text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>
                            </span>
                            Resumen del Pedido
                        </h2>

                        <div className="mt-4">
                            <div className="flex justify-between py-1">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">{formatPrice(total)}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span className="text-gray-600">Envío</span>
                                <span className="text-green-600 font-semibold">Gratis</span>
                            </div>
                        </div>

                        <div className="mt-4 bg-gray-100 rounded-xl p-3 flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-blue-600">{formatPrice(total)}</span>
                        </div>

                        <hr className="my-4" />

                        {/* Datos del cliente */}
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span className="text-blue-600">👤</span> Datos del Cliente
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <input type="text" placeholder="Nombre completo *"
                                    value={form.nombreCliente}
                                    onChange={(e) => handleChange("nombreCliente", e.target.value)}
                                    className={`w-full border rounded-lg p-3 outline-none focus:border-blue-400 transition text-sm ${errores.nombreCliente ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                                />
                                {errores.nombreCliente && <p className="text-red-500 text-xs mt-1">{errores.nombreCliente}</p>}
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input type="number" placeholder="Teléfono *"
                                        value={form.telefono}
                                        onChange={(e) => handleChange("telefono", e.target.value)}
                                        className={`w-full border rounded-lg p-3 outline-none focus:border-blue-400 transition text-sm ${errores.telefono ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                                    />
                                    {errores.telefono && <p className="text-red-500 text-xs mt-1">{errores.telefono}</p>}
                                </div>
                                <div className="flex-1">
                                    <input type="number" placeholder="Edad *"
                                        value={form.edad}
                                        onChange={(e) => handleChange("edad", e.target.value)}
                                        className={`w-full border rounded-lg p-3 outline-none focus:border-blue-400 transition text-sm ${errores.edad ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                                    />
                                    {errores.edad && <p className="text-red-500 text-xs mt-1">{errores.edad}</p>}
                                </div>
                            </div>

                            <div>
                                <input type="email" placeholder="Email *"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className={`w-full border rounded-lg p-3 outline-none focus:border-blue-400 transition text-sm ${errores.email ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                                />
                                {errores.email && <p className="text-red-500 text-xs mt-1">{errores.email}</p>}
                            </div>
                        </div>

                        <hr className="my-4" />

                        {/* Información de envío */}
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span className="text-blue-600">📍</span> Información de Envío
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <input type="text" placeholder="Dirección *"
                                    value={form.direccion}
                                    onChange={(e) => handleChange("direccion", e.target.value)}
                                    className={`w-full border rounded-lg p-3 outline-none focus:border-blue-400 transition text-sm ${errores.direccion ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                                />
                                {errores.direccion && <p className="text-red-500 text-xs mt-1">{errores.direccion}</p>}
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input type="text" placeholder="Ciudad *"
                                        value={form.ciudad}
                                        onChange={(e) => handleChange("ciudad", e.target.value)}
                                        className={`w-full border rounded-lg p-3 outline-none focus:border-blue-400 transition text-sm ${errores.ciudad ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                                    />
                                    {errores.ciudad && <p className="text-red-500 text-xs mt-1">{errores.ciudad}</p>}
                                </div>
                                <div className="flex-1">
                                    <input type="text" placeholder="Código Postal *"
                                        value={form.codigoPostal}
                                        onChange={(e) => handleChange("codigoPostal", e.target.value)}
                                        className={`w-full border rounded-lg p-3 outline-none focus:border-blue-400 transition text-sm ${errores.codigoPostal ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                                    />
                                    {errores.codigoPostal && <p className="text-red-500 text-xs mt-1">{errores.codigoPostal}</p>}
                                </div>
                            </div>

                            <select
                                value={form.metodoPago}
                                onChange={(e) => handleChange("metodoPago", e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-400 transition text-sm"
                            >
                                <option>Efectivo contra entrega</option>
                                <option>Tarjeta De Credito/Debito</option>
                                <option>Efecty</option>
                                <option>PSE</option>
                            </select>
                        </div>

                        {/* Errores */}
                        {errores.general && (
                            <p className="text-red-500 text-xs mt-3 text-center font-medium">⚠️ {errores.general}</p>
                        )}
                        {Object.keys(errores).filter(k => k !== "general").length > 0 && (
                            <p className="text-red-500 text-xs mt-3 text-center font-medium">⚠️ Por favor completa todos los campos obligatorios</p>
                        )}

                        <button
                            onClick={handleFinalizarCompra}
                            disabled={carrito.length === 0 || cargando}
                            className="w-full mt-5 py-3 rounded-xl text-white font-semibold bg-linear-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {cargando ? "Procesando..." : "✓ Finalizar Compra"}
                        </button>

                        <ul className="mt-5 text-gray-700 space-y-1 text-sm">
                            <li>✓ Compra segura y protegida</li>
                            <li>✓ Envío gratis en compras +$100.000</li>
                            <li>✓ Soporte 24/7</li>
                        </ul>
                    </div>

                </div>
            </main>
        </>
    );
}
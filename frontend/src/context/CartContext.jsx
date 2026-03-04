import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [datosCliente, setDatosCliente] = useState({
        nombreCliente: "",
        telefono: "",
        edad: "",
        direccion: "",
        email: "",
    });

    const agregarAlCarrito = (producto) => {
        console.log("agregarAlCarrito recibió:", producto);
        setCarrito((prev) => {
            console.log("Carrito antes:", prev);
            const existe = prev.find((p) => p.productId === producto.productId);
            if (existe) {
                return prev.map((p) =>
                    p.productId === producto.productId
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                );
            }
            const nuevo = [...prev, {
                productId: producto.productId,
                Nombre: producto.Nombre,
                Descripcion: producto.Descripcion,
                Precio: producto.Precio,
                Image: producto.Image,
                cantidad: 1,
            }];
            console.log("Carrito después:", nuevo);
            return nuevo;
        });
    };
    

    const eliminarDelCarrito = (productId) => {
        setCarrito((prev) => prev.filter((p) => p.productId !== productId));
    };

    const cambiarCantidad = (productId, cantidad) => {
        if (cantidad < 1) return;
        setCarrito((prev) =>
            prev.map((p) => (p.productId === productId ? { ...p, cantidad } : p))
        );
    };

    const vaciarCarrito = () => setCarrito([]);

    const actualizarDatosCliente = (campo, valor) => {
        setDatosCliente((prev) => ({ ...prev, [campo]: valor }));
    };

    const total = carrito.reduce((acc, p) => acc + p.Precio * p.cantidad, 0);
    const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);

    // Genera los pedidos con la estructura exacta del schema de pedido
    const generarPedidos = () => {
        return carrito.map((p) => ({
            N_pedido: `PED-${Date.now()}-${p.productId}`,
            nombreProducto: p.Nombre,
            descripcion: p.Descripcion,
            precio: p.Precio,
            imagen: p.Image,
            estado: "pendiente",
            nombreCliente: datosCliente.nombreCliente,
            telefono: datosCliente.telefono,
            edad: datosCliente.edad,
            direccion: datosCliente.direccion,
            email: datosCliente.email,
            total: p.Precio * p.cantidad,
        }));
    };

    return (
        <CartContext.Provider
            value={{
                carrito,
                datosCliente,
                agregarAlCarrito,
                eliminarDelCarrito,
                cambiarCantidad,
                vaciarCarrito,
                actualizarDatosCliente,
                generarPedidos,
                total,
                cantidadTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};
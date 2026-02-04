import Pedidos from "../models/pedidos.js";

// crear el pedido

export const crearPedido = async (req, res) => {
    try {
        console.log("cuerpo recibido:", req.body)

        const{N_pedido,nombreProducto,descripcion,precio,imagen,estado,nombreCliente,telefono,edad,direccion,email,total}=req.body;
        const newPedido =new Pedidos({
            N_pedido,
            nombreProducto,
            descripcion,
            precio,
            imagen,
            estado,
            nombreCliente,
            telefono,
            edad,
            direccion,
            email,
            total
        });
        await newPedido.save();

        res.status(201).json({message:"pedido guardado con exito"});

    } catch (error) {
        console.error("Error al guardar el pedido", error);
        res.status(400).json({
            message:"Error al ingresar el pedido"
        });
    }
};
// traer los datos de la base de datos
export const obtenerPedido=async (req, res) => {
    try {
        const pedidos = await Pedidos.find();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({message:"Error al obtener los pedidos"});
    }
}
import Productos from '../models/productos.js';

// crear el producto

export const crearProducto = async (req, res)=> {
    try {
        console.log("cuerpo recibido:", req.body)

        const{productId,Nombre,Descripcion,Precio,Image}=req.body;
        const newProduct =new Productos({
            productId,
            Nombre,
            Descripcion,
            Precio,
            Image
        });
        await newProduct.save();

        res.status(201).json({mesagge:"producto guardado con exito"});

        } catch (error) {
            console.error("Error al guardar el producto", error);
            res.status(400).json({
                mesagge:"Error al ingresar el producto"
            });
    }
};
// traer los datos de la base de datos
export const obtenerProductos=async  (req, res) => {
    try {
        const productos = await Productos.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({mesagge: "error al obtener los productos"});
    }
}

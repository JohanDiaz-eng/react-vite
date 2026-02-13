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

// actualizar productos

export const actualizarProducto = async (req, res) => {
    try {
        const {id} = req.params;
        const {productId, Nombre, Descripcion, Precio, Image} = req.body;
        const productoActualizado = await Productos .findByIdAndUpdate(id, {productId, Nombre, Descripcion, Precio, Image}, {new: true});
        if (!productoActualizado) {
            return res.status(404).json({mesagge: "Producto no encontrado"});
        }
        res.json({mesagge: "Producto actualizado exitosamente", producto: productoActualizado});
    } catch (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({message: "Error al actualizar el producto"});
    };
}

// eliminar producto



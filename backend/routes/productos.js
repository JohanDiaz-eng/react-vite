import express from "express";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";
import { crearProducto, obtenerProductos, actualizarProducto, eliminarProducto } from "../controllers/productos.js";

const router = express.Router();

//ruta para crear productos

router.post("/", verificarToken, soloAdmin, crearProducto);

// ver productos (user y admin)

router.get("/", verificarToken, obtenerProductos);

// actualizar

router.put("/:id", verificarToken, soloAdmin, actualizarProducto);

// eliminar

router.delete("/:id", verificarToken, soloAdmin, eliminarProducto);

export default router;
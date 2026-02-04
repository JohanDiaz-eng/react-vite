import express from "express";
import { crearPedido, obtenerPedido } from "../controllers/pedido.js";
const router=express.Router();

// ruta para crear pedido

router.post("/", crearPedido)

// ruta para obtener todos los pedidos

router.get("/", obtenerPedido)
export default router;

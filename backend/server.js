import express from 'express';
import cors from 'cors';
import "./db/db.js"
import ProductosRoute from "./routes/productos.js";
import userRoutes from './routes/user.js';
import { loginUsuario } from './controllers/login.js';
import PerfilRouter from './routes/perfil.js';
import RecuperarPassword from './routes/recuperar.js'
import pedidoRoute from './routes/pedido.js';
const app =express();

// habilitar todas las rutas //

app.use(cors());
app.use(express.json());
// primera ruta //

app.get('/',(req,res)=>{
    res.send('bienvenido al curos de node express');
});

app.use("/api/productos", ProductosRoute);
app.use("/api/user", userRoutes);
app.use("/api/login", loginUsuario);
app.use("/api/perfil", PerfilRouter);
app.use("/api/recuperar", RecuperarPassword);
app.use("/api/pedido", pedidoRoute);

app.listen(8081,()=>console.log('servidor corriendo en https://tiendavirtual-1-8tuy.onrender.com'));
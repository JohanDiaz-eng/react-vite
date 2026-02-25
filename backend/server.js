import express from 'express';
import cors from 'cors';
import "./db/db.js"
import ProductosRoute from "./routes/productos.js";
import userRoutes from './routes/user.js';
import { loginUsuario } from './controllers/login.js';
import PerfilRouter from './routes/perfil.js';
import RecuperarPassword from './routes/recuperar.js'
import pedidoRoute from './routes/pedido.js';
import adminRoutes from "./routes/admin.js";
const app =express();

app.use(express.json());

// habilitar todas las rutas //

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
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
app.use("/api/admin", adminRoutes);

app.listen(8081,()=>console.log('servidor corriendo en https://localhost:8081'));
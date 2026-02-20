// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import user from "../models/user.js";

// verificar el token y consulta el usuario actualizado en base de datos
export const verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "Token requerido "});
        }

        const token = authHeader.split(" ")[1];

        // Decodifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Consulta el usuario actualizado en la base de datos (por si cambio su rol o fue eliminado)
        const usuario = await user.findById(decoded.id).select("-password");
        if (!usuario) {
            return res.status(401).json({ message: "Usuario no encontrado"});
        }

        // guardamos el usuario completo en req para usarlo en los controladores
        req.usuario = usuario;
        next();
        
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "token expirado, inicia sesion nuevamente "});
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token invalido"});
        }
        res.status(500).json({ message:"Error en la autenticacion", error: error.message});
    }
};

// solo administradores
export const soloAdmin = (req, res, next) => {
    if (req.usuario?.rol !== "admin") {
        return res.status(403).json({ message: "Acceso denegado: se requiere rol admin"});
    }
    next();
};

// solo usuarios
export const soloUser = (req, res, next) => {
    if (req.usuario?.rol !== "user") {
        return res.status(403).json({message: "Acceso denegado: se requiere rol user"});
    }
    next();
};
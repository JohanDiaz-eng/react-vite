import bcrypt from "bcrypt";
import User from "../models/user.js";
import user from "../models/user.js";

export const loginUsuario = async (req, res) => {
    try {
        const {email,password}=req.body;
        // validar que todos los campos esten llenos
        if (!email || !password){
            return res.status(400).json({message: "correo y contraseña obligatorios"});
        }
        // buscamos el usuario en la base de datos.

        const usuario = await user.findOne({email});
        if (!usuario){
            return res.status(404).json({message:"usuario no encontrado"});
        }
        // comparar contraseña encriptada en la BS

        const passwordValida = await bcrypt.compare(password,usuario.password)
        if (!passwordValida){
            return res.status(401).json({message:"contraseña incorrecta"});
        }

        // validamos el inicio de sesion exitoso
        res.status(200).json({message:"inicio de sesion correcto",
            usuario:{
                id: usuario._id,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                email: usuario.email
            }
        });

    } catch (error) {
        res.status(500).json({message:"error al iniciar sesion", error:error.message});
    }
}
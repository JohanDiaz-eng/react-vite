import User from '../models/user.js';
import bcrypt from "bcrypt";
// crear el producto

export const registrarUser= async (req, res)=> {
    try {
        const {nombre, telefono, email, password} = req.body;
        if (!nombre || !telefono || !email || !password) {
            return res.status(400).json({message: "faltan datos obligatorios"});
        }
        //validar si el usuario ya existe
        const existeuser = await User.findOne({email});
        if (existeuser) {
            return res.status(400).json({message: "el usuario ya existe"});
        }

        //encriptar la contraseña

        const saltrounds=10;
        const hashedPassword = await bcrypt.hash(password, saltrounds);

        //crear el nuevo usuario
        const newuser = new User ({nombre, telefono, email, password:hashedPassword});
        await newuser.save();
        res.status(201).json({message: "usuario creado exitosamente"});
    } catch (error) {
        res.status(500).json({message: "error al crear el usuario",error:error.message});
    };
}
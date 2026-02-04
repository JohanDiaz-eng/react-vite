// importamos el modelo de la base de datos

import user from "../models/user.js";

// obtener perfil del usuario de la base de datos

export const obtenerPerfil = async (req,res) =>{
    try {
        const {email} =req.body;
        if(!email) {
            return res.status(400).json({message:"Email es requerido"});
        }
        // traer el correo del usuario de la base de datos

        const usuario = await user.findOne({email:email}).select('-password');
        if(!usuario){
            return res.status(400).json({message:"Usuario no encontrado"});
        }
        res.status(200).json({
            usuario:{
                id: usuario._id,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                email: usuario.email
            }
        })
    } catch (error) {
        res.status(500).json({message:"Error al obtener el perfil", error: error.message});
    }
}

// Actualizar perfil del usuario

export const actualizarPerfil = async (req, res) => {
    try {
        const { nombre, telefono, email } = req.body;

        // validar campos obligatorios
        if (!email) {
            return res.status(400).json({message: "Email es requerido"});
        }

        if (!nombre || !telefono ) {
            return res.status(400).json({message: "Todos los campos son obligatorios"});
        }

        // buscar y actualizar usuario
        const usuarioActualizado = await user.findOneAndUpdate(
            { email:email },
            {
                nombre: nombre,
                telefono: telefono
            },
            { new: true }
            // no va a seleccionar el campo password
        ).select('-password');

        if (!usuarioActualizado) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        res.status(200).json({
            message: "Perfil actualizado exitosamente",
            usuario: {
                id: usuarioActualizado._id,
                nombre: usuarioActualizado.nombre,
                telefono: usuarioActualizado.telefono,
                email: usuarioActualizado.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar perfil",
            error: error.message
        });
    }
};

// eliminar perfil

export const eliminarPerfil = async (req, res) => {
    try {
        const { email } = req.body;

        // validar que el email este presente
        if (!email) {
            return res.status(400).json({message: "Email es requerido"});
        }

        // buscar y eliminar usuario
        const usuarioEliminado = await user.findOneAndDelete({
            email: email
        });

        if (!usuarioEliminado) {
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        res.status(200).json({
            message: "Usuario eliminado exitosamente",
            usuario: {
                id: usuarioEliminado._id,
                nombre: usuarioEliminado.nombre,
                telefono: usuarioEliminado.telefono,
                email: usuarioEliminado.email,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el perfil",
            error: error.message
        });
    }
};
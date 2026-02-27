import { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ✅ Recupera la sesión guardada al iniciar
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem("usuario");
        return guardado ? JSON.parse(guardado) : null;
    });
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8081/api/login", {
                email: email,
                password: password,
            });
            const data = response.data;

            const usuarioData = {
                ...data.usuario,
                token: data.token,
            };

            // ✅ Guarda en memoria y en localStorage
            setUsuario(usuarioData);
            localStorage.setItem("usuario", JSON.stringify(usuarioData));

            if (data.usuario.rol === "admin") {
                navigate("/admin");
            } else {
                navigate("/productos");
            }

        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Error al iniciar sesion');
            } else if (error.request) {
                throw new Error('No se pudo conectar con el servidor');
            } else {
                throw new Error('Error al procesar la solicitud');
            }
        }
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario"); // ✅ Limpia localStorage al cerrar sesión
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}
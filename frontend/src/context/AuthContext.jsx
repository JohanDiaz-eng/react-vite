// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // importar AXIOS

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8081/api/login", {
                email: email,
                password: password,
            });

            const data = response.data;  //axiios ya parsea el JSON automaticamente

            //guardamos el usuario y token en memoria
            setUsuario({
                ...data.usuario,
                token: data.token,
            });

            //redirigimos segeun el rol
            if (data.usuario.rol === "admin") {
                navigate("/admin");
            } else {
                navigate("/productos");
            }

        } catch (error) {
            //manejo de errores con axio
            if (error.response) {
                throw new Error(error.response.data.message || "Error al iniciar sesion");
            } else if (error.request) {
                throw new Error("No se pudo conectar con el servidor");
            } else {
                throw new Error("Error al procesar la solicitud");
            }
        }
    };

    const logout = () => {
        setUsuario(null);
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
};
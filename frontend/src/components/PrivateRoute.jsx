// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, rolRequerido }) => {
    const { usuario } = useAuth();

    // si no hay usuario en contexto, mandamos al login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    // si el rol no coincide, redirigimos a donde corresponde
    if (rolRequerido && usuario.rol !== rolRequerido) {
        return usuario.rol === "admin"
            ? <Navigate to="/admin" replace />
            : <Navigate to="/productos" replace />;
    }

    return children;
};

export default PrivateRoute;
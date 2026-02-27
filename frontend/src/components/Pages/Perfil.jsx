import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Navbar from "../Layout/Navbar.jsx";
import Footer from "../Layout/Footer.jsx";
import axios from "axios";

export default function Perfil() {
  const { usuario, setUsuario, logout } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
  });

  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState(null); // { tipo: "exito" | "error", texto: "" }
  const [confirmEliminar, setConfirmEliminar] = useState(false);

  // Carga los datos del usuario al montar
  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || "",
        telefono: usuario.telefono || "",
        email: usuario.email || "",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditar = () => {
    setEditando(true);
    setMensaje(null);
  };

  const handleCancelar = () => {
    setEditando(false);
    setFormData({
      nombre: usuario.nombre || "",
      telefono: usuario.telefono || "",
      email: usuario.email || "",
    });
    setMensaje(null);
  };

  const handleGuardar = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/perfil/actualizar`,
        formData,
        {
          headers: { Authorization: `Bearer ${usuario.token}` },
        }
      );

      const usuarioActualizado = { ...usuario, ...formData };
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
      // Si tu AuthContext expone setUsuario, úsalo aquí:
      // setUsuario(usuarioActualizado);

      setEditando(false);
      setMensaje({ tipo: "exito", texto: "✅ Perfil actualizado correctamente." });
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: error.response?.data?.message || "❌ Error al guardar los cambios.",
      });
    }
  };

  const handleEliminar = async () => {
    try {
      await axios.delete(`http://localhost:8081/api/perfil/eliminar`, {
        headers: { Authorization: `Bearer ${usuario.token}` },
      });
      logout();
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: error.response?.data?.message || "❌ Error al eliminar la cuenta.",
      });
      setConfirmEliminar(false);
    }
  };

  // Genera iniciales para el avatar
  const getIniciales = (nombre) => {
    if (!nombre) return "?";
    return nombre
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Navbar />

      <main>
        <div className="container mx-auto px-4 mt-40">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* Header con avatar */}
            <div className="bg-white border-b border-gray-200 px-8 py-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {getIniciales(usuario?.nombre)}
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">
                    {usuario?.nombre || "Usuario"}
                  </h2>
                  <p className="text-gray-600 text-lg">{usuario?.email}</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="p-8">

              {/* Mensaje de éxito o error */}
              {mensaje && (
                <div
                  className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
                    mensaje.tipo === "exito"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {mensaje.texto}
                </div>
              )}

              <form onSubmit={(e) => e.preventDefault()}>

                {/* Nombre */}
                <div className="mb-6">
                  <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Teléfono */}
                <div className="mb-6">
                  <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div className="mb-8">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:border-blue-600 focus:bg-white focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Botones */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {!editando ? (
                    <button
                      type="button"
                      onClick={handleEditar}
                      className="px-14 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Editar Perfil
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleGuardar}
                        className="px-14 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Guardar Cambios
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmEliminar(true)}
                        className="px-14 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Eliminar Perfil
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelar}
                        className="px-14 py-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Modal confirmación eliminar */}
        {confirmEliminar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">¿Eliminar cuenta?</h3>
              <p className="text-gray-600 mb-6">
                Esta acción es irreversible. ¿Estás seguro de que deseas eliminar tu cuenta?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleEliminar}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setConfirmEliminar(false)}
                  className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
import { useState } from "react";
import Navbar from "../Layout/Navbar.jsx";
import Footer from "../Layout/Footer.jsx";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido.";
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo válido.";
    }
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es requerido.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Aquí iría la lógica real de envío (fetch, axios, etc.)
    console.log("Formulario enviado:", formData);
    setEnviado(true);
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 font-sans">
        <div id="contacto" className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              Contáctanos
            </h2>
            <p className="text-center text-gray-600 mb-12">
              ¿Tienes preguntas o necesitas ayuda? ¡Envíanos un mensaje!
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Formulario */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white shadow-lg rounded-2xl p-8 space-y-5"
              >
                {enviado && (
                  <div className="bg-green-100 text-green-700 rounded-lg px-4 py-3 text-sm font-medium">
                    ✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.
                  </div>
                )}

                {/* Nombre */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.nombre ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>

                {/* Correo */}
                <div>
                  <label
                    htmlFor="correo"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.correo ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {errors.correo && (
                    <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
                  )}
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje..."
                    className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.mensaje ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  {errors.mensaje && (
                    <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Enviar mensaje
                </button>
              </form>

              {/* Información de contacto */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-blue-600 text-2xl"></i>
                  <p className="text-gray-700">Calle 123 #45-67, Bogotá, Colombia</p>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone text-blue-600 text-2xl"></i>
                  <p className="text-gray-700">+57 300 123 4567</p>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-blue-600 text-2xl"></i>
                  <p className="text-gray-700">soporte@techstorepro.com</p>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Síguenos</h3>
                  <div className="flex space-x-4 text-blue-600 text-2xl">
                    <a href="#" aria-label="Facebook">
                      <i className="fa-brands fa-facebook hover:text-blue-800"></i>
                    </a>
                    <a href="#" aria-label="Instagram">
                      <i className="fab fa-instagram hover:text-pink-600"></i>
                    </a>
                    <a href="#" aria-label="WhatsApp">
                      <i className="fab fa-whatsapp hover:text-green-600"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from "./components/PrivateRoute.jsx"; 
import Login from './components/Auth/Login';
import Register from "./components/Auth/Registers";
import AdminPanel from "./components/Pages/Admin";
import Contacto from "./components/Pages/Contacto.jsx"
import Home from './components/Pages/Home';
import Productos from './components/Pages/Producto.jsx';
import Carrito from './components/Pages/Carrito.jsx';
import Perfil from "./components/Pages/Perfil.jsx";
import ForgotPassword from './components/Pages/ForgotPassword.jsx';
import VerifyCode from './components/Pages/VerifyCode.jsx';
import { CartProvider } from './context/CartContext.jsx';


function App() {
  return (
  <BrowserRouter>
  <AuthProvider>
    <CartProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />

      <Route
      path='/admin'
      element={
      <PrivateRoute rolRequerido="admin">
        <AdminPanel /> {/* usa adminPanel*/}
        </PrivateRoute>
        }
      />

      <Route
      path='/perfil'
      element={
      <PrivateRoute>
        <Perfil />
      </PrivateRoute>
      }
      />

        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
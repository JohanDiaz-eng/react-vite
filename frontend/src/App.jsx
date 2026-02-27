import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from "./components/PrivateRoute.jsx"; 
import Login from './components/Auth/Login';
import Register from "./components/Auth/Registers";
import AdminPanel from "./components/Pages/Admin";
import Contacto from "./components/Pages/Contacto.jsx"
import Home from './components/Pages/Home';
import Productos from './components/Pages/Producto.jsx';
import Layout from "./components/Layout/Layout.jsx";
import Perfil from "./components/Pages/Perfil.jsx";
import ForgotPassword from './components/Pages/ForgotPassword.jsx';
import VerifyCode from './components/Pages/VerifyCode.jsx';


function App() {
  return (
  <BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productos" element={<Productos />} />
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
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
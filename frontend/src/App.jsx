import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from "./components/PrivateRoute.jsx"; 
import Login from './components/Auth/Login';
import Register from "./components/Auth/Registers";
import AdminPanel from "./components/Pages/Admin";
import Home from './components/Pages/Home';
import Layout from "./components/Layout";


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route
        path='/productos'
        element={
          <PrivateRoute rolRequerido="user">
            <Layout />
            <div>Pagina de Productos</div>
          </PrivateRoute>
        }
        />

        <Route
        path='/admin'
        element={
          <PrivateRoute rolRequerido="admin">
            <AdminPanel /> {/* usa adminPanel*/}
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
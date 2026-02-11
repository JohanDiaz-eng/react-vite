import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Registers.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
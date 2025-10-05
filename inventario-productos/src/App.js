import './App.css';
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import VistaPublica from './pages/VistaPublica';
import InventoryPage from './pages/InventoryPage';
import ContactoPage from './pages/ContactoPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<VistaPublica />} />
        <Route path="/productos" element={<InventoryPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
    </div>
  );
}

export default App;

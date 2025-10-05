import './App.css';
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import VistaPublica from './pages/VistaPublica';
import InventoryPage from './pages/InventoryPage';
import ContactoPage from './pages/ContactoPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<VistaPublica />} />
        <Route path="/productos" element={<InventoryPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

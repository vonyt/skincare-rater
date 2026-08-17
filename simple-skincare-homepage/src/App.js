import logo from './logo.svg';
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Scanner from "./components/Scanner";
import Product from "./components/Product";
import BarcodeScanner from 'react-qr-barcode-scanner'
import Search from './components/Search';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [product, setProduct] = useState(null);
    
    
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/scanner" element={<Scanner setProduct={setProduct} />} />

        <Route path="/product" element={<Product product={product} />} />

        <Route path="/search" element={<Search />} />
      </Routes>
    );

}

export default App;

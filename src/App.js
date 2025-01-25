import React from 'react';
import './App.css';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import ViewProduct from './components/ViewProduct';
import ProductTable from './components/ProductTable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='container mt-3'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductTable/>} />
        <Route path="/create" element={<CreateProduct/>} />
        <Route path="/update/:id" element={<UpdateProduct/>} />
        <Route path="/view/:id" element={<ViewProduct/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

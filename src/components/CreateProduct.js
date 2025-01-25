import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { name, description, price, quantity };
        console.log(product);
        await axios.post('http://localhost:8000/api/products', product);

        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        alert('Producto creado correctamente');
        setTimeout(() => {
            navigate('/');
        }, 500);
    }
    const handleBack = () => {
        setTimeout(() => {
            navigate("/");
        }, 500);
    };
    return (
        <div className='container mt-4' style={{maxWidth: '500px'}}>
            <h2 className='mb-4'>Crear Producto</h2>
            <form onSubmit={handleSubmit} className='form row g-3'>
                <div className='mb-3'>
                    <label className='form-label'>Nombre:</label>
                    <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Producto 1'/>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Descripción:</label>
                    <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Descripcion del producto 1'></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Precio:</label>
                    <input className='form-control' type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='5000' required />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Cantidad:</label>
                    <input className='form-control' type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='2' required />
                </div>
                <div className='d-flex justify-content-between'>
                    <button type='button' onClick={handleBack} className='btn btn-secondary me-2'>Cancelar</button>
                    <button type="submit" className='btn btn-primary me-2'>Crear Producto</button>
                </div>
            </form>
        </div>
    );
}

export default CreateProduct;
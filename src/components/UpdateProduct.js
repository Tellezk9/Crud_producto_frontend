import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                const product = response.data;
                console.log("UpdateProduct.js");
                console.log(product);

                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setQuantity(product.quantity);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('No se encontraron productos.');
                } else {
                    setError('Ocurrió un error al buscar los productos.');
                }
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const product = { name, description, price, quantity };
            await axios.put(`http://localhost:8000/api/products/${id}`, product);
            alert('Producto actualizado correctamente');
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('No se encontraron productos.');
            } else {
                setError('Ocurrió un error al buscar los productos.');
            }
        }
    };
    const handleBack = () => {
        setTimeout(() => {
            navigate("/");
        }, 500);
    };
    return (
        <div className='container mt-4' style={{ maxWidth: '500px' }}>
            {error ?
                (<div className='alert alert-danger'>{error}</div>)
                :
                (<>
                    <h2 className='mb-4'>Editar Producto</h2>
                    <form onSubmit={handleSubmit} className='form row g-3'>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre:</label>
                            <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Descripción:</label>
                            <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Precio:</label>
                            <input className='form-control' type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Cantidad:</label>
                            <input className='form-control' type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <button onClick={handleBack} type='button' className='btn btn-secondary me-2'>Cancelar</button>
                            <button type="submit" className='btn btn-primary me-2'>Actualizar Producto</button>
                        </div>
                    </form>
                </>
                )}
        </div>
    );
};

export default UpdateProduct;

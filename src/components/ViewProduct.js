import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ViewProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("ViewProduct.js");
        console.log(id);

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError(true);
                } else {
                    setError('Ocurrió un error al buscar los productos.');
                }
            }
        };
        fetchProduct();
    }, [id]);

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
                    <h2 className='mb-4'>Ver Producto</h2>
                    <form className='form row g-3'>
                        <div className='mb-3'>
                            <label className='form-label'>Nombre:</label>
                            <input className='form-control' type="text" value={product.name} readOnly />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Descripción:</label>
                            <textarea className='form-control' value={product.description} readOnly></textarea>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Precio:</label>
                            <input className='form-control' type="number" value={product.price} readOnly />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Cantidad:</label>
                            <input className='form-control' type="number" value={product.quantity} readOnly />
                        </div>
                        <div>
                            <button type='button' onClick={handleBack} className='btn btn-secondary me-2'>Atras</button>
                        </div>
                    </form>
                </>
                )}
        </div>
    );
};

export default ViewProduct;

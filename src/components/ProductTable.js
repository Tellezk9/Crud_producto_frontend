import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:8000/api/products');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        let borrar = window.confirm('¿Estás seguro de eliminar este producto?');
        if (!borrar) {
            return;
        }
        await axios.delete(`http://localhost:8000/api/products/${id}`);
        setProducts(products.filter(product => product.id !== id));
        alert('Producto eliminado correctamente');
    };

    return (
        <table className='table table-sm'>
            <thead>
                <tr>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Descripción</th>
                    <th scope='col'>Precio</th>
                    <th scope='col'>Cantidad</th>
                    <th className='d-flex justify-content-center align-items-center'>
                        <Link to='/create' className='btn btn-primary btn-sm me-2' title='Crear'>
                            <i class="bi bi-plus-circle"></i>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody className='table-group-divider'>
                {products.map(product => (
                    <tr key={product.id} >
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td className='d-flex justify-content-center align-items-center'>
                            <Link to={`/update/${product.id}`} className='btn btn-warning btn-sm me-2' title='Editar'>
                                <i className='bi bi-pencil-square'></i>
                            </Link>
                            <Link to={`/view/${product.id}`} className='btn btn-secondary btn-sm me-2' title='Ver'>
                                <i class="bi bi-eye-fill"></i>
                            </Link>
                            <button onClick={() => handleDelete(product.id)} className='btn btn-danger btn-sm me-2' title='Eliminar'>
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;


import React, { useEffect, useState } from 'react';
import { setAddEditProducts,deleteProductFromState } from '../../redux/productSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {useToken} from '../../Auth/useToken';

import axios from 'axios';
// Function to sanitize the image filename

const ViewProducts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [token] =useToken();

  useEffect(() => {
    const getLoadingData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/get-products');
        const data = response.data;

        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Unexpected data format', data);
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
      }
    };
    getLoadingData();
  }, []);
  //Delete product
  const handleDelete = async (productId) => {
    console.log(productId);
    if (window.confirm('Are you sure you want to delete this product?')) {
        try {
            if (!token) {
                throw new Error('No authorization token found');
            }

            const response = await axios.delete(`http://localhost:8080/api/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Optionally reload the product list
                getLoadingData();
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    }
};



  return (
    <section className="content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Products</h3>
        </div>
        <div className="card-body p-0">
          {products.length === 0 ? (
            <div className="no-data-message">
              <p>No products found.</p>
            </div>
          ) : (
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: '1%' }}>Sr.No</th>
                  <th style={{ width: '15%' }}>Product Title</th>
                  <th style={{ width: '10%' }}>Category</th>
                  <th style={{ width: '15%' }}>Image</th>
                  <th style={{ width: '10%' }}>Price</th>
                  <th style={{ width: '8%' }} className="text-center">Status</th>
                  <th style={{ width: '20%', paddingLeft: '150px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>
                      <img
                        alt="Product"
                        className="table-avatar"
                        src={
                          product.image
                            ? `http://localhost:8080/uploads/products/${product.image}`
                            : 'path-to-default-placeholder-image.jpg'
                        }
                      />
                    </td>
                    <td>{product.price}</td>
                    <td>
                      <span className={`badge badge-${product.status === "true" ? "success" : "danger"}`}>
                        {product.status === "true" ? <h5>Active</h5> : <h5>Not active</h5>}
                      </span>

                    </td>
                    <td className="project-actions  text-right">
                      <Link
                        className="btn btn-info mr-2 btn-sm"
                        to={`/add-edit-product/${product._id}`}
                        onClick={() => dispatch(setAddEditProducts(true))}
                      >
                        <i className="fas fa-pencil-alt" /> Edit
                      </Link>
                      <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(product._id)}>
                        <i className="fas fa-trash" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewProducts;

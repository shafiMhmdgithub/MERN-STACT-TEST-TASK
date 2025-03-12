import React, { useState } from 'react';
import axios from 'axios';
import{useDispatch} from 'react-redux';
import {useToken} from '../../Auth/useToken';
import { setViewProducts } from '../../redux/productSlice';
const AddEditProducts = () => {
    const dispatch = useDispatch();
    const [token,setToken] =useToken();
    const [title, setTitle] = useState('');
    const [productImageName, setProductImageName] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [section, setSection] = useState('');
    const [status, setStatus] = useState(false); // New state for status

    const [message, setMessage] = useState(''); // Message for success/error
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('productImage', productImage); // Ensure this matches `upload.single('productImage')`
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('brand', brand);
        formData.append('section', section);
        formData.append('status', status);
    
        // Debugging FormData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/product', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Success:', response.data);
            const { token } = response.data;
            setToken(token);
            //Here i wanna go to the viewProducts if the submission gone successfull without any error
            dispatch(setViewProducts(true));
            setMessage('Product added successfully!'); // Success message
            setIsError(false); // Clear error state
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Add / Edit Product</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                            {message && (
                                    <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                                        {message}
                                    </div>
                                )}
                                {/* Product Title */}
                                <div className="form-group">
                                    <label htmlFor="productTitle">Product Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productTitle"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter product title"
                                    />
                                </div>
                                
                                {/* Image */}
                                <div className="form-group">
                                            <label htmlFor="exampleInputFile">Product Image</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        className="custom-file-input"
                                                        onChange={e => {
                                                            const file = e.target.files[0];
                                                            setProductImage(file);
                                                            setProductImageName(file.name);
                                                        }}
                                                        id="exampleInputFile" />
                                                    <label className="custom-file-label" htmlFor="exampleInputFile">{productImageName || 'Choose file'}</label>
                                                </div>
                                                <div className="input-group-append">
                                                    <button className="input-group-text">Upload</button>
                                                </div>
                                            </div>
                                        </div>

                                {/* Description */}
                                <div className="form-group">
                                    <label htmlFor="productDescription">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="productDescription"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="3"
                                        placeholder="Enter product description"
                                    />
                                </div>
                                
                                {/* Category */}
                                <div className="form-group">
                                    <label htmlFor="productCategory">Category</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productCategory"
                                        name="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="Enter category"
                                    />
                                </div>

                                {/* Price */}
                                <div className="form-group">
                                    <label htmlFor="productPrice">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="productPrice"
                                        name="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter price"
                                    />
                                </div>

                                {/* Stock */}
                                <div className="form-group">
                                    <label htmlFor="productStock">Stock</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="productStock"
                                        name="stock"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        placeholder="Enter stock quantity"
                                    />
                                </div>

                                {/* Brand */}
                                <div className="form-group">
                                    <label htmlFor="productBrand">Brand</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productBrand"
                                        name="brand"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        placeholder="Enter brand"
                                    />
                                </div>

                                {/* Section */}
                                <div className="form-group">
                                    <label htmlFor="productSection">Section</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productSection"
                                        name="section"
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                        placeholder="Enter section (e.g., electronics, clothing)"
                                    />
                                </div>
                                 {/* Status */}
                                 <div className="form-group">
                                    <label htmlFor="productStatus">Status</label>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="productStatus"
                                            checked={status}
                                            onChange={(e) => setStatus(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="productStatus">
                                            Active
                                        </label>
                                    </div>
                                </div>
                            </div>
                             
                            

                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditProducts;

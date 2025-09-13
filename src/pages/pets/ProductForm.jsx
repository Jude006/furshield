import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'food',
    price: '',
    description: '',
    stockQuantity: '',
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const { name, category, price, description, stockQuantity } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onImageChange = (e) => {
    setImages(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('category', category);
    data.append('price', price);
    data.append('description', description);
    data.append('stockQuantity', stockQuantity);
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    try {
      const res = await axios.post('http://localhost:3002/api/admin/products/unprotected', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Product created successfully!');
      console.log(res.data);
      setFormData({
        name: '',
        category: 'food',
        price: '',
        description: '',
        stockQuantity: '',
      });
      setImages([]);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error creating product');
      console.error(err.response?.data);
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h2 className="text-2xl font-display mb-4">Create Product</h2>
      {message && (
        <div className={`mb-4 p-2 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={category}
            onChange={onChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary-600"
          >
            <option value="food">Food</option>
            <option value="grooming">Grooming</option>
            <option value="toys">Toys</option>
            <option value="health">Health</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Price (NGN)</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={onChange}
            required
            min="0"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary-600"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={stockQuantity}
            onChange={onChange}
            required
            min="0"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Images (up to 5)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={onImageChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
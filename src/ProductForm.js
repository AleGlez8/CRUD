import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: 1,
    nombre: '',
    descripcion: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [idCounter, setIdCounter] = useState(1); // Inicia en 1 para el ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    if (editingIndex !== null) {
      // Editar producto existente
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = newProduct;
      setProducts(updatedProducts);
      setEditingIndex(null);
  
      // No incrementar el ID después de editar
      setNewProduct({
        id: newProduct.id,
        nombre: '',
        descripcion: '',
      });
    } else {
      // Agregar nuevo producto con ID autoincrementable
      setProducts([...products, { ...newProduct, id: idCounter }]);
      setNewProduct({
        id: idCounter + 1, // Incrementa el contador solo para nuevos productos
        nombre: '',
        descripcion: '',
      });
      setIdCounter(idCounter + 1);
    }
  };  
  
  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setNewProduct(productToEdit);
    setEditingIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div className="bakery-form">
      <h2><center>Productos</center></h2>
      <form>
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={newProduct.id}
          onChange={handleChange}
        />

        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={newProduct.nombre}
          onChange={handleChange}
        />

        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={newProduct.descripcion}
          onChange={handleChange}
        />

        <button type="button" onClick={handleAddProduct}>
          {editingIndex !== null ? 'Editar Producto' : 'Agregar Producto'}
        </button>
      </form>

      <table className="bakery-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
              <td>
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => handleEditProduct(index)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => handleDeleteProduct(index)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductForm;

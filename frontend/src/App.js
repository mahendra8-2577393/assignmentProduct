import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price: '',
    image: '',
    currency: '',
  });
  const [editRole, setEditRole] = useState(false);
  const [currentProductId, setCurrentProductId] = useState("")
  useEffect(() => {
    fetchProcut();
  }, [])

  const fetchProcut = async () => {
    try {
      await axios.get('http://localhost:4000/products').then((res) => {
        setProducts(res.data)
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newProduct)
    try {
      if (editRole) {
        await axios.put(`http://localhost:4000/productUpdate/${currentProductId}`, newProduct).then((res) => {
          fetchProcut();
          setCurrentProductId("")
          setEditRole(false)
          const nP = {
            ...newProduct,
            name: "",
            type: "",
            price: "",
            image:  '',
          }
          setNewProduct(prev => nP)
        })
        
      } else {
        console.log(newProduct)
        await axios.post('http://localhost:4000/createProduct', newProduct).then((res) => {
          console.log(res);
          fetchProcut();
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleDelete = async (prod) => {
    try {
      await axios.delete(`http://localhost:4000/deleteProduct/${prod._id}`)
        .then((res) => {
          console.log(res);
          fetchProcut();
        })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='app-container'>
      <div className="form-container">
        <div className="form">
          <input
            type="text"
            name="name"
            placeholder='Product name'
            value={newProduct.name}
            onChange={handleInput}
          />
          <input
            type="text"
            name="type"
            placeholder='Product type'
            value={newProduct.type}
            onChange={handleInput}
          />
        
          <select name="currency" onChange={handleInput}>
            <option value="" disable selected>Select Currency</option>
            <option value="INR" >INR</option>
            <option value="USD">USD</option>
            <option value="EURO">EURO</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder='Price'
            value={newProduct.price}
            onChange={handleInput}
          />
          <input
            type="text"
            name="image"
            placeholder='Image Link'
            value={newProduct.image}
            onChange={handleInput}
          />

          <button onClick={handleSubmit}>{editRole ? `Edit` : `Create`}</button>
        </div>
      </div>

      <h1 className='heading'>Products</h1>
      <div className='products'>
        {(products.length > 0) ? (
products.map((product) => {
  return (<div className='product'>
    <img src={product.image} alt="" />
    <p>Product  Name:  {product.name}</p>
    <p>Product Price: {product.currency} {product.price}</p>
    <p>Product Type:  {product.type}</p>
    <button onClick={() => handleDelete(product)}>Delete</button>
    <button onClick={(e) => {
      setEditRole(true);
      const nP = {
        ...newProduct,
        name: product.name,
        type: product.type,
        price: product.price,
        image:  product.image,
        currency: product.currency
      }
      setNewProduct(prev => nP)
      setCurrentProductId(product._id)
    }}>Edit</button>
  </div>)
})
        ) : (
          `No Products found`
        )}
      </div>
    </div>
  )
}

export default App
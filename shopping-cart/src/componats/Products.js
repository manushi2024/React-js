import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, edit, remove } from '../store/CreateSlice';
import fetchproducts from '../store/Thunk';
import { status } from '../store/ProductSlice';
import "../App.css"
import Loader from './Spennier';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { data, states } = useSelector((state) => state.product);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
     
       dispatch(fetchproducts());
    }, []);

    const handleDropdownChange = (action, product) => {
        switch (action) {
            case 'add':
                dispatch(add(product));
                break;
            case 'edit':
                // Handle edit logic
                break;
            case 'delete':
                dispatch(remove(product.id));
                break;
            default:
                break;
        }
        setShowDropdown(false);
    };

    const handleCartClick = (product) => {
        setShowDropdown(!showDropdown);
        setSelectedProduct(product);
    };

    const handleOutsideClick = () => {
        setShowDropdown(true);
    };

    document.addEventListener('click', handleOutsideClick);

    return (
        <>
        <button onClick={()=>{
            navigate("/")
           }}>back</button>
        <div className="productsWrapper">
          
            {states === 'loading' && <Loader/>}
            {states === 'idle' && data.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <div className="cartIcon" onClick={() => handleCartClick(product)}>
                        ...
                    </div>
                    {showDropdown && selectedProduct && selectedProduct.id === product.id && (
                        <div className="dropdown">
                            <select
                                className="dropdown"
                                onChange={(e) => handleDropdownChange(e.target.value, product)}
                            >
                                <option value="add">Add to Cart</option>
                                <option value="edit">Edit</option>
                                <option value="delete">Delete</option>
                            </select>
                        </div>
                    )}
                </div>
            ))}
              {states === 'error' && <div>Error loading products.</div>}
            {/* <Loader/>
            {data.map((product) => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <div className="cartIcon" onClick={() => handleCartClick(product)}>
                        ...
                    </div>
                    {showDropdown && selectedProduct && selectedProduct.id === product.id && (
                        <div className="dropdown">
                            <select
                                className="dropdown"
                                onChange={(e) => handleDropdownChange(e.target.value, product)}
                            >
                                <option value="add">Add to Cart</option>
                                <option value="edit">Edit</option>
                                <option value="delete">Delete</option>
                            </select>
                          
                        </div>
                    )}
                </div>
            ))} */}
        </div>
        </>
    );
};

export default Products;
//loader is show befor api call after data is load loader is not display
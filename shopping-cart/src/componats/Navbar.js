import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import fetchproducts from '../store/Thunk';
import { status } from '../store/ProductSlice';


const Navbar = () => {
   
  //display carts items
  const items=useSelector(state=>state.cart)
  console.log(items);
    return (
        // <div
        //     style={{
        //         display: 'flex',
        //         alignItems: 'center',
        //         justifyContent: 'space-between',
        //     }}
        // >
        //     <span className="logo">REDUX STORE</span>
        //     <div>
        //         <Link className="navLink" to="/">
        //             Home
        //         </Link>
        //         <Link className="navLink" to="/cart">
        //             Cart
        //         </Link>
        //         {/* when user add cart into item display number */}
        //         <span className="cartCount">Cart items: {items.length}</span>
        //     </div>
            
        // </div>
        <div>
            
        </div>
    );
};

export default Navbar;

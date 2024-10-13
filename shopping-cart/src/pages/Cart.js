import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../store/CreateSlice';



const Cart = () => {
 
const product=useSelector(state=>state.cart)
const dispatch=useDispatch()

const handelremove=(productId)=>{
    dispatch(remove(productId))
}
console.log(product);
    return (
        <div>
            <h3>Cart Data</h3>
            <div className="cartWrapper">
                {
                    product.map((product)=>(
                        <div className="card" key={product.id}>
                        <img src={product.image} alt="" />
                        <h4>{product.title}</h4>
                        <h5>{product.price}</h5>
                        <button  className="btn" onClick={()=>handelremove(product.id)} >
                          remove
                        </button>
                    </div>  
                    ))
                }
            </div>
        </div>
    );
};

export default Cart;

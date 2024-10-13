import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loginpage from './Loginpage';

function FewProduct() {
const navigate =useNavigate()
    const { data, states } = useSelector((state) => state.product);
    const viewproduct=()=>{
      navigate('/products')
    }
  return (
    <>

    <h2 className="heading" style={{marginLeft:"35%"}}>Welcome to the Redux toolkit store</h2>
    <button onClick={viewproduct}>view all</button>
    {
    data.slice(0,4).map((product) => (
        <>
       
        <div className="card" key={product.id}>
            <img src={product.image} alt="" />
            <h4>{product.title}</h4>
            <h5>{product.price}</h5>
           
        </div>
        </>
       
    ))}
    </>
  )
}

export default FewProduct
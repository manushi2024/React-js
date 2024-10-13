import React from 'react';
import Products from '../componats/Products';
import FewProduct from '../componats/FewProduct';

const Home = () => {
    return (
        <div>
            
            <h2 className="heading" style={{marginLeft:"35%"}}>Welcome to the Redux toolkit store</h2>
            <section>
                <h3>Products</h3>
                <FewProduct/>
                {/* <Products /> */}
            </section>
        </div>
    );
};

export default Home;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FewProduct from './componats/FewProduct';
import Product from './componats/Products';
import Loginpage from './componats/Loginpage';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Loginpage />} />
        <Route path="/" element={<FewProduct />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;

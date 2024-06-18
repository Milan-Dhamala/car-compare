import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CarList from './pages/CarList/CarList';
import CarDetails from './pages/CarDetails/CarDetails';
import BrandModels from './pages/BrandModels/BrandModels';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route path="/car-list" element={<CarList />} /> 
          <Route path="/car-details/:carId" element={<CarDetails />} />
          <Route path="/brand/:brandId" element={<BrandModels />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

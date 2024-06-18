import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddBrand from './pages/AddBrand/AddBrand';
import EditBrand from './pages/EditBrand/EditBrand';
import BrandList from './pages/BrandList/BrandList';
import AddModel from './pages/AddModel/AddModel';
import ModelList from './pages/ModelList/ModelList';
import AddCar from './pages/AddCar/AddCar';
import ListCar from './pages/ListCar/ListCar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditModel from './pages/EditModel/EditModel';
import EditCar from './pages/EditCar/EditCar';
import Login from './pages/Login/Login';
import StoreContext from './contexts/StoreContext';

const App = () => {
  const url = "http://localhost:4000";
  const { token } = useContext(StoreContext);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        {token ? (
          <>
            <Sidebar />
            <Routes>
              <Route exact path='/' element={<AddBrand url={url} token={token} />} />
              <Route path='/addbrand' element={<AddBrand url={url} token={token} />} />
              <Route path='/edit-brand/:id' element={<EditBrand url={url} token={token} />} />
              <Route path='/brandlist' element={<BrandList url={url} token={token} />} />
              <Route path='/addmodel' element={<AddModel url={url} token={token} />} />
              <Route path='/modellist' element={<ModelList url={url} token={token} />} />
              <Route path='/edit-model/:id' element={<EditModel url={url} token={token} />} />
              <Route path='/addcar' element={<AddCar url={url} token={token} />} />
              <Route path='/carlist' element={<ListCar url={url} token={token} />} />
              <Route path='/edit-car/:id' element={<EditCar url={url} token={token} />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;

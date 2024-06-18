import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-use-history';
import CarList from '../../pages/CarList/CarList';
import './ModelSearch.css';

const ModelSearch = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [cars, setCars] = useState([]);
  const [formValues, setFormValues] = useState({
    year: '',
    brand: '',
    type: '',
    model: '',
    fuelType: '',
    transmission: '',
  });
  const history = useHistory();

  useEffect(() => {
    // Fetch available brands when the component mounts
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/brand/list`);
        setBrands(response.data.data || []);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands([]);
      }
    };

    fetchBrands();
  }, []);

  const fetchModels = async (brandId) => {
    if (!brandId) return setModels([]);
    const response = await axios.get(`http://localhost:4000/api/model/listbybrand/${brandId}`);
    setModels(response.data.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    if (name === 'brand') {
      fetchModels(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/car/search`,{ params: formValues });
      setCars(response.data.data);
      history.push('/car-list', { cars: response.data.data });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const getYearsOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2015;
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  const getFuelTypeOptions = () => {
    return ['Petrol', 'Diesel', 'Electric'].map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ));
  };

  const getTransmissionOptions = () => {
    return ['Manual', 'Automatic', 'Semi-Automatic'].map((transmission) => (
      <option key={transmission} value={transmission}>
        {transmission}
      </option>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="model-search-content">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-offset-1 col-md-2 col-sm-12">
                  <div className="single-model-search">
                    <h2>Select Year</h2>
                    <div className="model-select-icon">
                      <select className="form-control" name="year" value={formValues.year} onChange={handleChange}>
                        <option value="">Year</option>
                        {getYearsOptions()}
                      </select>
                    </div>
                  </div>
                  <div className="single-model-search">
                    <h2>Body Style</h2>
                    <div className="model-select-icon">
                      <select className="form-control" name="type" value={formValues.type} onChange={handleChange}>
                        <option value="">Select Body Style</option>
                        <option value="SUV">SUV</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Wagon">Wagon</option>
                        <option value="Minivan">Minivan</option>
                        <option value="Pickup Truck">Pickup Truck</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-offset-1 col-md-2 col-sm-12">
                  <div className="single-model-search">
                    <h2>Select Make</h2>
                    <div className="model-select-icon">
                      <select className="form-control" name="brand" value={formValues.brand} onChange={handleChange}>
                        <option value="">Select Brand</option>
                        {brands.map((brand) => (
                          <option key={brand._id} value={brand._id}>{brand.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="single-model-search">
                    <h2>Transmission</h2>
                    <div className="model-select-icon">
                      <select className="form-control" name="transmission" value={formValues.transmission} onChange={handleChange}>
                        <option value="">Select Transmission</option>
                        {getTransmissionOptions()}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-offset-1 col-md-2 col-sm-12">
                  <div className="single-model-search">
                    <h2>Select Model</h2>
                    <div className="model-select-icon">
                      <select className="form-control" name="model" value={formValues.model} onChange={handleChange}>
                        <option value="">Select Model</option>
                        {models.map((model) => (
                          <option key={model._id} value={model._id}>{model.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="single-model-search">
                    <h2>Fuel Type</h2>
                    <div className="model-select-icon">
                      <select className="form-control" name="fuelType" value={formValues.fuelType} onChange={handleChange}>
                        <option value="">Select Fuel Type</option>
                        {getFuelTypeOptions()}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-sm-12">
                  <div className="single-model-search text-center">
                    <button className="welcome-btn model-search-btn" type="submit">Search</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ModelSearch;

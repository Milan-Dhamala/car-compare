import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-use-history';
import './EditCar.css'; // Optional: Add your CSS file here

const EditCar = ({ url,token }) => {
  const { id } = useParams(); // Get car ID from URL
  const history = useHistory();
  const [car, setCar] = useState({
    brand: '',
    model: '',
    type: '',
    price: '',
    description: '',
    year: '',
    mileage: '',
    engineDisplacement: '',
    fuelType: '',
    transmission: '',
    power: '',
    seatingCapacity: '',
    image: null,
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${url}/api/car/${id}`);
        if (response.data.success) {
          setCar(response.data.data);
        } else {
          toast.error("Error fetching car details");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Error fetching car details");
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${url}/api/brand/list`);
        if (response.data.success) {
          setBrands(response.data.data);
        } else {
          toast.error("Error fetching brands");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Error fetching brands");
      }
    };

    fetchCar();
    fetchBrands();
  }, [url, id]);

  useEffect(() => {
    if (car.brand) {
      const fetchModels = async () => {
        try {
          const response = await axios.get(`${url}/api/model/listbybrand/${car.brand}`);
          if (response.data.success) {
            setModels(response.data.data);
          } else {
            toast.error("Error fetching models");
          }
        } catch (error) {
          console.error("Error fetching models:", error);
          toast.error("Error fetching models");
        }
      };

      fetchModels();
    }
  }, [car.brand, url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleFileChange = (e) => {
    setCar({ ...car, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('brand', car.brand);
    formData.append('model', car.model);
    formData.append('type', car.type);
    formData.append('price', car.price);
    formData.append('description', car.description);
    formData.append('year', car.year);
    formData.append('mileage', car.mileage);
    formData.append('engineDisplacement', car.engineDisplacement);
    formData.append('fuelType', car.fuelType);
    formData.append('transmission', car.transmission);
    formData.append('power', car.power);
    formData.append('seatingCapacity', car.seatingCapacity);
    if (car.image) {
      formData.append('image', car.image);
    }

    try {
      const response = await axios.put(`${url}/api/car/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        toast.success("Car updated successfully");
        history.push('/carlist');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Error updating car");
    }
  };

  return (
    <div className="edit-car">
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Brand</label>
          <select name="brand" value={car.brand} onChange={handleInputChange} required>
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Model</label>
          <select name="model" value={car.model} onChange={handleInputChange} required>
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model._id} value={model._id}>{model.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Type</label>
          <select name="type" value={car.type} onChange={handleInputChange} required>
            <option value="">Select Type</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="Wagon">Wagon</option>
            <option value="Minivan">Minivan</option>
            <option value="Pickup Truck">Pickup Truck</option>
          </select>       
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="price" value={car.price} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={car.description} onChange={handleInputChange} ></textarea>
        </div>
        <div>
          <label>Year</label>
          <input type="number" name="year" value={car.year} onChange={handleInputChange}  />
        </div>
        <div>
          <label>Mileage</label>
          <input type="number" name="mileage" value={car.mileage} onChange={handleInputChange}  />
        </div>
        <div>
          <label>Engine Displacement</label>
          <input type="text" name="engineDisplacement" value={car.engineDisplacement} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Fuel Type</label>
          <select name="fuelType" value={car.fuelType} onChange={handleInputChange} required>
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>        
        </div>
        <div>
          <label>Transmission</label>
          <select name="transmission" value={car.transmission} onChange={handleInputChange}  required>
            <option value="">Select Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>        
        </div>
        <div>
          <label>Power</label>
          <input type="text" name="power" value={car.power} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Seating Capacity</label>
          <input type="number" name="seatingCapacity" value={car.seatingCapacity} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Image</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default EditCar;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddModel.css'
import { useHistory } from 'react-router-use-history';

const AddModel = ({ url, token }) => {
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    shortdesc: '',
    image: null
  });
  const [availableBrands, setAvailableBrands] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${url}/api/brand/list`);
        if (response.data.success) {
          setAvailableBrands(response.data.data);
        } else {
          toast.error("Error fetching brands");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Error fetching brands");
      }
    };
    fetchBrands();
  }, [url]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, brandName, shortdesc, image } = formData;

    if (!name || !brandName || !image) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('brandName', brandName);
      formData.append('shortdesc', shortdesc);
      formData.append('image', image);

      await axios.post(`${url}/api/model/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });

      toast.success("Model added successfully");
      // Clear form data after successful submission
      setFormData({ name: '', brandName: '', shortdesc: '', image: null });

      history.push("/modellist");
    } catch (error) {
      console.error("Error adding model:", error);
      toast.error("Error adding model");
    }
  };

  return (
    <div className="add-model">
      <h2>Add Model</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Model Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Select Brand:</label>
          <select name="brandName" value={formData.brandName} onChange={handleInputChange} required>
            <option value=""></option>
            {availableBrands.map((brand) => (
              <option key={brand._id} value={brand.name}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Short Description:</label>
          <textarea name="shortdesc" value={formData.shortdesc} onChange={handleInputChange} required maxLength={100} />
        </div>
        <div>
          <label>Model Image:</label>
          <input type="file" name="image" onChange={handleFileChange} accept="image/*" required />
        </div>
        <button type="submit">Add Model</button>
      </form>
    </div>
  );
};

export default AddModel;

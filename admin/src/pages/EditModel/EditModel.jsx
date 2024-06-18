import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-use-history';
import axios from 'axios';
import { toast } from 'react-toastify';
import './EditModel.css';

const EditModel = ({ url,token }) => {
  const { id } = useParams();
  const history = useHistory();
  const [model, setModel] = useState({
    name: '',
    brand: '',
    shortdesc: '',
    image: null,
    previousImage: ''
  });
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get(`${url}/api/model/${id}`);
        if (response.data.success) {
          setModel({
            ...response.data.data,
            previousImage: response.data.data.image
          });
        } else {
          toast.error("Error fetching model details");
        }
      } catch (error) {
        console.error("Error fetching model details:", error);
        toast.error("Error fetching model details");
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

    fetchModel();
    fetchBrands();
  }, [id, url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModel({ ...model, [name]: value });
  };

  const handleFileChange = (e) => {
    setModel({ ...model, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', model.name);
    formData.append('brand', model.brand);
    formData.append('shortdesc', model.shortdesc);
    if (model.image) {
      formData.append('image', model.image);
    }

    try {
      const response = await axios.put(`${url}/api/model/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.data.success) {
        toast.success("Model updated successfully");
        history.push('/modellist');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating model:", error);
      toast.error("Error updating model");
    }
  };

  return (
    <div className='edit-model'>
      <h2>Edit Model</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type='text' name='name' value={model.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Brand</label>
          <select name='brand' value={model.brand} onChange={handleInputChange} required>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Short Description</label>
          <input type='text' name='shortdesc' value={model.shortdesc} onChange={handleInputChange} maxLength="100" />
        </div>
        <div>
          <label>Previous Image</label>
          {model.previousImage && (
            <img src={`${url}/images/${model.previousImage}`} alt="Previous Image" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          )}
        </div>
        <div>
          <label>New Image</label>
          <input type='file' name='image' onChange={handleFileChange} />
        </div>
        <button type='submit'>Update Model</button>
      </form>
    </div>
  );
};

export default EditModel;

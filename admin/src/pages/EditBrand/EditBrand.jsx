import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory} from 'react-router-use-history'
import axios from 'axios';
import { toast } from 'react-toastify';
import './EditBrand.css'

const EditBrand = ({ url, token }) => {
  const { id } = useParams();
  const history = useHistory();
  const [brand, setBrand] = useState({ name: '', logo: null });

  useEffect(() => {
    const fetchBrand = async () => {
      const response = await axios.get(`${url}/api/brand/${id}`);
      if (response.data.success) {
        setBrand(response.data.data);
      } else {
        toast.error("Error fetching brand details");
      }
    };
    fetchBrand();
  }, [id, url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrand({ ...brand, [name]: value });
  };

  const handleFileChange = (e) => {
    setBrand({ ...brand, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', brand.name);
    if (brand.logo) {
      formData.append('logo', brand.logo);
    }

    try {
      const response = await axios.put(`${url}/api/brand/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        history.push('/brandlist');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating brand");
    }
  };

  return (
    <div className='edit-brand'>
      <h2>Edit Brand</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type='text' name='name' value={brand.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Previous Logo</label>
          {brand.logo && (
            <img src={`${url}/images/${brand.logo}`} alt="Previous Logo" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          )}
        </div>
        <div>
          <label>New Logo</label>
          <input type='file' name='logo' onChange={handleFileChange} />
        </div>
        <button type='submit'>Update Brand</button>
      </form>
    </div>
  );
};

export default EditBrand;

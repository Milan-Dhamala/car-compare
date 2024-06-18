import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './ModelList.css';

const ModelList = ({ url }) => {
  const [brandsWithModels, setBrandsWithModels] = useState([]);
  const [expandedBrands, setExpandedBrands] = useState({});

  useEffect(() => {
    const fetchModelsByBrand = async () => {
      try {
        const response = await axios.get(`${url}/api/model/listbybrand`);
        if (response.data.success) {
          setBrandsWithModels(response.data.data);
        } else {
          toast.error("Error fetching models");
        }
      } catch (error) {
        console.error("Error fetching models:", error);
        toast.error("Error fetching models");
      }
    };
    fetchModelsByBrand();
  }, [url]);

  const removeModel = async (modelId) => {
    if (window.confirm("Are you sure you want to delete this model?")) {
      try {
        const response = await axios.post(`${url}/api/model/remove`, { id: modelId });
        if (response.data.success) {
          toast.success(response.data.message);
          setBrandsWithModels(brandsWithModels.map(brand => ({
            ...brand,
            models: brand.models.filter(model => model._id !== modelId)
          })));
        } else {
          toast.error("Error deleting model");
        }
      } catch (error) {
        console.error("Error deleting model:", error);
        toast.error("Error deleting model");
      }
    }
  };

  const toggleBrand = (brandId) => {
    setExpandedBrands(prevState => ({
      ...prevState,
      [brandId]: !prevState[brandId]
    }));
  };

  return (
    <div className="model-list">
      <h2>Models by Brand</h2>
      {brandsWithModels.map((brandWithModels) => (
        <div key={brandWithModels.brand._id} className="brand-section">
          <h3 onClick={() => toggleBrand(brandWithModels.brand._id)} className="brand-name">
            {brandWithModels.brand.name}
            {expandedBrands[brandWithModels.brand._id] ? (
              <span className="arrow up">▲</span>
            ) : (
              <span className="arrow down">▼</span>
            )}
          </h3>
          <div className={`models-container ${expandedBrands[brandWithModels.brand._id] ? 'expanded' : 'collapsed'}`}>
            <table className="models-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Model Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {brandWithModels.models.map((model) => (
                  <tr key={model._id}>
                    <td>
                      <img src={`${url}/images/${model.image}`} alt={model.name} className="model-image" />
                    </td>
                    <td>{model.name}</td>
                    <td>
                      <Link to={`/edit-model/${model._id}`} className="edit-button">Edit</Link>
                      <button onClick={() => removeModel(model._id)} className="remove-button">X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelList;

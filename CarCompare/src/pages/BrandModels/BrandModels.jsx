import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './BrandModels.css';
import TopArea from '../../components/TopArea/TopArea';
import Footer from '../../components/Footer/Footer';

const BrandModels = () => {
    const { brandId } = useParams();
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/model/listbybrand/${brandId}`);
                const modelsData = response.data.data;

                // Fetch car details for each model to get the carId
                const carDetails = await Promise.all(modelsData.map(async (model) => {
                    try {
                        const carResponse = await axios.get(`http://localhost:4000/api/car/detailsbymodel/${model._id}`);
                        return { carId: carResponse.data.data._id };
                    } catch (error) {
                        console.error('Error fetching car details:', error);
                        return { carId: null }; // Handle scenario where car details are not available
                    }
                }));

                // Merge carId with existing model data
                const modelsWithCarId = modelsData.map((model, index) => {
                    return { ...model, carId: carDetails[index].carId };
                });

                setModels(modelsWithCarId);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching models:', error);
                setLoading(false);
            }
        };

        fetchModels();
    }, [brandId]);

    if (loading) {
        return <div>Loading models...</div>;
    }

    return (
        <div>
            <TopArea /> 
            <div className="brand-models-page">
                <h1>Models</h1>
                {models.length > 0 ? (
                    <div className="models-grid">
                        {models.map((model, index) => (
                            <div className="model-card" key={index}>
                                <img src={`http://localhost:4000/images/${model.image}`} alt={model.name} className="model-image"/>
                                <div className="model-info">
                                    <h2>
                                        {model.carId !== null ? (
                                            <Link to={`/car-details/${model.carId}`}>{model.name}</Link>
                                        ) : (
                                            <span>{model.name}</span>
                                        )}
                                    </h2>
                                    <p>{model.shortdesc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No models available for this brand.</p>
                )}
            </div>
            <Footer /> 
        </div>
    );
};

export default BrandModels;

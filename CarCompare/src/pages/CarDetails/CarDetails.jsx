import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CarDetails.css";
import TopArea from "../../components/TopArea/TopArea";
import Footer from "../../components/Footer/Footer";

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [brandModel, setBrandModel] = useState({ brand: "", model: "" });
  const [relatedCars, setRelatedCars] = useState([]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/car/${carId}`);
        setCar(response.data.data);

        const modelId = response.data.data.model;
        const modelResponse = await axios.get(`http://localhost:4000/api/model/${modelId}`);
        setBrandModel({
          brand: modelResponse.data.data.brand,
          model: modelResponse.data.data.name,
        });

        const relatedResponse = await axios.get(`http://localhost:4000/api/car/list`);
        setRelatedCars(relatedResponse.data.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleRelatedCarClick = (id) => {
    navigate(`/car-details/${id}`);
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="car-details-page">
      <TopArea />
      <div className="car-details-container">
        <div className="main-content">
          <h1>{brandModel.model}</h1>
          <h2>Price: ${car.price}</h2>
          <div className="top-section">
            <div className="car-images">
              <img
                src={`http://localhost:4000/images/${car.image}`}
                alt={`${brandModel.model}`}
              />
              <div className="thumbnail-container">
                {car.images && car.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:4000/images/${image}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail"
                  />
                ))}
              </div>
            </div>
            <div className="car-info">
              <h2>Key Specs</h2>
              <div className="info-row">
                <span>Model Name:</span>
                <span>{brandModel.model}</span>
              </div>
              <div className="info-row">
                <span>Gear:</span>
                <span>{car.transmission}</span>
              </div>
              <div className="info-row">
                <span>Power:</span>
                <span>{car.power}</span>
              </div>
              <div className="info-row">
                <span>Mileage:</span>
                <span>{car.mileage}</span>
              </div>
              <div className="info-row">
                <span>Total Seats:</span>
                <span>{car.seatingCapacity}</span>
              </div>
              <div className="info-row">
                <span>Car Type:</span>
                <span>{car.type}</span>
              </div>
              <div className="info-row">
                <span>Engine Capacity:</span>
                <span>{car.engineDisplacement}</span>
              </div>
              <div className="info-row">
                <span>Year Register:</span>
                <span>{car.year}</span>
              </div>
              <div className="info-row">
                <span>Fuel:</span>
                <span>{car.fuelType}</span>
              </div>
            </div>
          </div>
          <div className="car-description">
            <h2>Description</h2>
            <p>{car.description}</p>
          </div>
        </div>
        <div className="related-cars">
          <h2>Related Cars</h2>
          <ul className="related-cars-list">
            {relatedCars.map((relatedCar) => (
              <li key={relatedCar._id} className="related-car-item" onClick={() => handleRelatedCarClick(relatedCar._id)}>
                <img
                  src={`http://localhost:4000/images/${relatedCar.image}`}
                  alt={relatedCar.name}
                />
                <div className="related-car-info">
                  <p className="related-car-model">{relatedCar.model.name}</p>
                  <p className="related-car-price">${relatedCar.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarDetails;

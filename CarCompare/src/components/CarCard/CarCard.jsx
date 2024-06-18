import React from 'react';
import './CarCard.css'
import { Link } from 'react-router-dom'
const CarCard = ({ car, onDelete }) => {
    return (
        <div className="car-card">
            <h2><Link to={`/car-details/${car._id}`}>
                     {car.model}
                </Link>
                </h2>
            <button className="delete-button" onClick={onDelete}>X</button>
            <div className="car-details">
                <img src={`http://localhost:4000/images/${car.image}`} alt={`${car.model}`} />
                <div className="car-info">
                    <p><strong>Type:</strong> {car.type}</p>
                    <p><strong>Price:</strong> ${car.price}</p>
                    <p><strong>Year:</strong> {car.year}</p>
                    <p><strong>Mileage:</strong> {car.mileage ? car.mileage : 'N/A'}</p>
                    <p><strong>Engine Displacement:</strong> {car.engineDisplacement}</p>
                    <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                    <p><strong>Transmission:</strong> {car.transmission}</p>
                    <p><strong>Power:</strong> {car.power}</p>
                    <p><strong>Seating Capacity:</strong> {car.seatingCapacity}</p>
                </div>
            </div>
        </div>
    );
};

export default CarCard;

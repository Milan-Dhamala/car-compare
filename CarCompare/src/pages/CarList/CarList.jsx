import React from 'react';
import TopArea from '../../components/TopArea/TopArea';
import Footer from '../../components/Footer/Footer'; 
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CarList.css';

const CarList = () => {
    const location = useLocation();
    const cars = location.state?.cars || [];

    return (
        <div className="car-list-page">
            <TopArea />
            <div className="car-list-container">
                <h2>Car List</h2>
                {cars.length === 0 ? (
                    <p>No cars found.</p>
                ) : (
                    <div className="car-grid">
                        {cars.map((car) => (
                            <div key={car._id} className="car-card">
                                <img src={`http://localhost:4000/images/${car.image}`} alt={car.brand} className="car-image" />
                                <div className="car-details">
                                    <h3><Link to={`/car-details/${car._id}`}>{car.brand}</Link></h3>
                                    <h4>{car.model}</h4>
                                    <p>Year: {car.year}</p>
                                    <p>Type: {car.type}</p>
                                    <p>Price: ${car.price}</p>
                                    <p>Description: {car.description}</p>
                                    <p>Mileage: {car.mileage}</p>
                                    <p>Engine Displacement: {car.engineDisplacement}</p>
                                    <p>Fuel Type: {car.fuelType}</p>
                                    <p>Transmission: {car.transmission}</p>
                                    <p>Power: {car.power}</p>
                                    <p>Seating Capacity: {car.seatingCapacity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CarList;

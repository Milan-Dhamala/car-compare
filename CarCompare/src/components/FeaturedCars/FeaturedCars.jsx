import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeaturedCarItem from '../FeaturedCarItem/FeaturedCarItem.jsx';
import './FeaturedCars.css'; 
const FeaturedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/car/list');
        const carData = response.data.data.map(car => ({
          id: car._id,
          name: car.name,
          brand: car.brand,
          model: car.model,
          description: car.description,
          image: car.image,
          year: car.year,
          mileage: car.mileage,
          engineDisplacement: car.engineDisplacement,
          fuelType: car.fuelType,
          transmission: car.transmission,
          power: car.power,
          price: car.price
        }));
        setCars(carData);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <section id="featured-cars" className="featured-cars">
      <div className="container">
        <div className="section-header">
          <p>Checkout <span>the</span> featured cars</p>
          <h2>Featured Cars</h2>
        </div>
        <div className="featured-cars-content">
          <div className="row">
            {cars.map(car => (
              <FeaturedCarItem
                carId={car.id}
                imgSrc={`http://localhost:4000/images/${car.image}`}
                model={car.year}
                miles={car.mileage}
                hp={car.power}
                transmission={car.transmission}
                name={car.model.name}
                price={car.price}
                description={car.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;

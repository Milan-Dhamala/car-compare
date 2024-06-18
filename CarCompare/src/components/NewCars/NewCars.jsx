import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewCars.css'; 
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import NewCarItem from '../NewCarItem/NewCarItem.jsx';
import fc3 from '../../assets/images/fc3.png'

const NewCars = () => {
  const [carItems, setCarItems] = useState([]);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/car/list', {
          params: { sortBy: 'modifiedDate', order: 'desc' }
        });
        setCarItems(response.data.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCarData();
  }, []);

  const carouselOptions = {
    items: 1,
    autoplay: true,
    loop: true,
    dots: true,
    mouseDrag: true,
    nav: false,
    smartSpeed: 1000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOutLeft'
  };

  return (
    <section id="new-cars" className="new-cars">
      <div className="container">
        <div className="section-header">
          <p>checkout <span>the</span> latest cars</p>
          <h2>newest cars</h2>
        </div>
        <div className="new-cars-content">
          <OwlCarousel className="owl-theme" {...carouselOptions}>
            {carItems.map((item, index) => (
              <NewCarItem 
                key={index} 
                carId={item._id}
               // image={`http://localhost:4000/images/${item.image}`} 
                image={fc3}
                title={item.model.name} 
                description={item.description} 
              />
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewCars;

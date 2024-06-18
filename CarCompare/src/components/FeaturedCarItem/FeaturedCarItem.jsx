import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FeaturedCarItem.css';

const truncateDescription = (description, maxWords) => {
  const words = description.split(' ');
  if (words.length <= maxWords) {
    return description;
  }
  return words.slice(0, maxWords).join(' ') + '...';
};

const FeaturedCarItem = ({ imgSrc, model, miles, hp, transmission, name, price, description, carId }) => {
  const truncatedDescription = truncateDescription(description, 20); // Adjust the number of words as needed

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="single-featured-cars">
        <div className="featured-img-box">
          <div className="featured-cars-img">
            <img src={imgSrc} alt={name} />
          </div>
          <div className="featured-model-info">
            <p>
              Model: {model}
              <span className="featured-mi-span"> {miles} mi</span>
              <span className="featured-hp-span"> {hp} HP</span>
              {transmission}
            </p>
          </div>
        </div>
        <div className="featured-cars-txt">
          <h2>
            <Link to={`/car-details/${carId}`}>{name}</Link>
          </h2>
          <h3>${price}</h3>
          <p>{truncatedDescription}</p>
        </div>
      </div>
    </div>
  );
};

FeaturedCarItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  model: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  miles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  transmission: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  carId: PropTypes.string.isRequired,
};

export default FeaturedCarItem;

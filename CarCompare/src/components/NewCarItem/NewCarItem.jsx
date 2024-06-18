import React from 'react';
import { Link } from 'react-router-dom';


const NewCarItem = ({ carId, image, title, description }) => {
  return (
    <div className="new-cars-item">
      <div className="single-new-cars-item">
        <div className="row">
          <div className="col-md-7 col-sm-12">
            <div className="new-cars-img">
              <img src={image} alt="img" />
            </div>
          </div>
          <div className="col-md-5 col-sm-12">
            <div className="new-cars-txt">
              <h2><Link to={`/car-details/${carId}`}>{title}</Link></h2>
              <p>{description}</p>
              <Link to={`/car-details/${carId}`}>
                <button className="welcome-btn new-cars-btn">
                  view details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCarItem;

import React from 'react';

const ClientTestimonial = ({ imgSrc, comment, name, location }) => {
    return (
        <div className="col-sm-3 col-xs-12">
            <div className="single-testimonial-box">
                <div className="testimonial-description">
                    <div className="testimonial-info">
                        <div className="testimonial-img">
                            <img src={imgSrc} alt="image of clients person" />
                        </div>
                    </div>
                    <div className="testimonial-comment">
                        <p>{comment}</p>
                    </div>
                    <div className="testimonial-person">
                        <h2><a href="#">{name}</a></h2>
                        <h4>{location}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientTestimonial;

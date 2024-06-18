import React, { useEffect } from 'react';
import ClientTestimonial from '../ClientTestimonial/ClientTestimonial.jsx';
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';

// Import images
import c1 from '../../assets/images/c1.png';
import c2 from '../../assets/images/c2.png';
import c3 from '../../assets/images/c3.png';


const ClientSay = () => {
    
    const testimonials = [
        {
            imgSrc: c1,
            comment: 'Sed ut pers unde omnis iste natus error sit voluptatem accusantium dolor laudan rem aperiam, eaque ipsa quae ab illo inventore verit.',
            name: 'tomas lili',
            location: 'new york'
        },
        {
            imgSrc: c2,
            comment: 'Sed ut pers unde omnis iste natus error sit voluptatem accusantium dolor laudan rem aperiam, eaque ipsa quae ab illo inventore verit.',
            name: 'romi rain',
            location: 'london'
        },
        {
            imgSrc: c3,
            comment: 'Sed ut pers unde omnis iste natus error sit voluptatem accusantium dolor laudan rem aperiam, eaque ipsa quae ab illo inventore verit.',
            name: 'john doe',
            location: 'washington'
        }
    ];

    const options = {
        items: 3,
        margin: 0,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            640: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    };


    return (
        <section id="clients-say" className="clients-say">
            <div className="container">
                <div className="section-header">
                    <h2>what our clients say</h2>
                </div>
                <div className="row">
                <OwlCarousel className="owl-theme testimonial-carousel" {...options}>
                        {testimonials.map((testimonial, index) => (
                            <ClientTestimonial
                                key={index}
                                imgSrc={testimonial.imgSrc}
                                comment={testimonial.comment}
                                name={testimonial.name}
                                location={testimonial.location}
                            />
                        ))}
                    </OwlCarousel>
                </div>
            </div>
        </section>
    );
};

export default ClientSay;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';

const Brand = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/brand/list');
                setBrands(response.data.data);
            } catch (error) {
                console.error('Error fetching brand data:', error);
            }
        };

        fetchBrands();
    }, []);

    const options = {
        items: 6,
        loop: true,
        smartSpeed: 1000,
        autoplay: true,
        dots: false,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 2
            },
            415: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    };

    return (
        <section id="brand" className="brand">
            <div className="container">
                <div className="brand-area">
                    {brands.length > 0 ? (
                        <OwlCarousel className="owl-theme" {...options}>
                            {brands.map((brand, index) => (
                                <div className="item" key={index}>
                                    <Link to={`/brand/${brand._id}`}>
                                        <img src={`http://localhost:4000/images/${brand.logo}`} alt={brand.name} />
                                    </Link>
                                </div>
                            ))}
                        </OwlCarousel>
                    ) : (
                        <p>Loading brands...</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Brand;

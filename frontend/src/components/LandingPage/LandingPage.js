import React, { useState, useEffect } from 'react';
import carImage1 from "../../Images/Car.jpg"
import carImage2 from "../../Images/Car2.jpg";
import carImage3 from "../../Images/Car3.jpg";
import carImage4 from "../../Images/Car4.jpg";
import carImage5 from "../../Images/Car5.jpg";
import { Link } from 'react-router-dom';

const images = [carImage1, carImage2, carImage3, carImage4, carImage5];

const LandingPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, [currentImageIndex]);

    const currentImage = images[currentImageIndex];
    return (
        <div className="landing-page">
            <img src={currentImage} alt="Car rental" className="landing-page__image" />
            <h1 className="landing-page__title">Welcome to Car Rental</h1>
            <p className="landing-page__subtitle">Find the perfect car for your needs</p>
            <Link to="/register"><button className="landing-page__button">Get Started</button></Link>
        </div>
    );
};

export default LandingPage;
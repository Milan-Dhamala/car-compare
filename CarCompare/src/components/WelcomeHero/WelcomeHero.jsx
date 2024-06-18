import React from 'react';
import './WelcomeHero.css'; 
import TopArea from '../TopArea/TopArea';
import ModelSearch from '../ModelSearch/ModelSearch';
import { useEffect } from 'react';

const WelcomeHero = ({url}) => {

  useEffect(() => {
    $(window).on('load', function() {
      $(".welcome-hero-txt h2, .welcome-hero-txt p").removeClass("animated fadeInUp").css({ 'opacity': '0' });
      $(".welcome-hero-txt button").removeClass("animated fadeInDown").css({ 'opacity': '0' });
    });

    $(window).on('load', function() {
      $(".welcome-hero-txt h2, .welcome-hero-txt p").addClass("animated fadeInUp").css({ 'opacity': '0' });
      $(".welcome-hero-txt button").addClass("animated fadeInDown").css({ 'opacity': '0' });
    });
  }, []);

  return (
    <section id="home" className="welcome-hero">
        <TopArea url={url} />
      <div className="container">
        <div className="welcome-hero-txt">
          <h2>get your desired car in reasonable price</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <ModelSearch url={url} />
    </section>
  );
};

export default WelcomeHero;

import React from "react";
import WelcomeHero from "../../components/WelcomeHero/WelcomeHero";
import Service from "../../components/Service/Service";
import NewCars from "../../components/NewCars/NewCars";
import FeaturedCars from "../../components/FeaturedCars/FeaturedCars";
import ClientSay from "../../components/ClientSay/ClientSay";
import Brand from "../../components/Brand/Brand";
import Footer from "../../components/Footer/Footer";
import Compare from "../../components/Compare/Compare";

const Home = () => {
  return (
    <div>
      <WelcomeHero />
      <Compare />
      <Service />
      <NewCars />
      <FeaturedCars />
      <ClientSay />
      <Brand />
      <Footer />
    </div>
  );
};

export default Home;

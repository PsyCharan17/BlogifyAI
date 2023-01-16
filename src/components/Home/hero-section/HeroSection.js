import React from "react";
import InputForm from "./InputForm/InputForm";
import Navbar from "./Navbar/NavbarTop";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Navbar />
      <main>
        <InputForm />
      </main>
    </div>
  );
};

export default HeroSection;

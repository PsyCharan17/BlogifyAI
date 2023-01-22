import React from "react";
import InputForm from "./InputForm/InputForm";
import Navbar from "./Navbar/NavbarTop";
import "./HeroSection.css";

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

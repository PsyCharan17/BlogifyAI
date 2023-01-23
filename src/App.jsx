import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Blog from "./pages/Blog/blog";
import Home from "./pages/Home/homePage";
import InputForm from "./components/Home/hero-section/InputForm/InputForm";
import HeroSection from "./components/Home/hero-section/HeroSection";
import Navbar from "./components/Home/hero-section/Navbar/NavbarTop";

const App = () => {
  return (
    <div>
      {/* <section style={{ width: "100%", display: "inline-block" }}>
        <div>
          <HeroSection />
        </div>
      </section> */}
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog_creation" component={InputForm} />
          <Route path="/blog/:id" component={Blog} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};

export default App;

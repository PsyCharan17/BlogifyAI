import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Blog from "./pages/Blog/blog";
import Home from "./pages/Home/homePage";
import HeroSection from "./components/Home/hero-section/HeroSection";

const App = () => {
  return (
    <div>
      {/* <section style={{ width: "100%", display: "inline-block" }}>
        <div>
          <HeroSection />
        </div>
      </section> */}
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog/:id" component={Blog} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};

export default App;

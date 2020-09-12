import React, { Component } from "react";
import FooterPage from "../Footer";
import Header from "../Header/index";
import Slider from "../slider";
import About from '../about'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Slider/>
        <About/>
        <FooterPage />
      </div>
    );
  }
}

export default App;

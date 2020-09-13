import React, { Component } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Slider from "../slider";
import About from "../about";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import Products from "../Products/Products"
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route exact path="/" component={Slider} />
          <Route exact path="/about" component={About} />
          <Route exact path="/hair-styles" component={Products} />

          <Footer />
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);

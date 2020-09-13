import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBView,
  MDBIcon,
} from "mdbreact";
import braid from "../../images/braid.jpg";
import cliphair from "../../images/cliphair.jpg";
import cuthair from "../../images/cuthair.jpg";

class Products extends Component {
  state = {
    products: [
      {
        name: "Braid Style",
        img: braid,
        price: "1700",
        time: "6 hrs",
      },
      {
        name: "Another Style",
        img: cuthair,
        price: "1700",
        time: "6 hrs",
      },
      {
        name: "And Another Style",
        img: cliphair,
        price: "1700",
        time: "6 hrs",
      },
    ],
  };

  renderProducts = () => {
    const { products } = this.state;

    return (
      products.length > 0 &&
      products.map((prod) => (
        <MDBCol md="4" className="clearfix d-flex align-items-stretch">
          <MDBCard className="mb-3">
            <MDBCardImage
              hover
              overlay="white-light"
              className="card-img-top"
              src={prod.img}
              alt="hair"
            />

            <MDBCardBody cascade className="text-center">
              <MDBCardTitle className="card-title">
                <strong>{prod.name}</strong>
              </MDBCardTitle>

              {/*  <p className="font-weight-bold blue-text">Wev developer</p> */}

              <MDBCardText className="text-left">
                Style Name: {prod.name}
              </MDBCardText>
              <MDBCardText className="text-left">Time: {prod.time}</MDBCardText>
              <MDBCardText className="text-left">
                Price: ${prod.price}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ))
    );
  };

  render() {
    return <MDBRow>{this.renderProducts()}</MDBRow>;
  }
}

export default Products;

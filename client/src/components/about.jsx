import React from "react";
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody, 
  MDBCardTitle,
  MDBCardText,
} from "mdbreact";
import EyeBrow from '../images/eyebrow.jpg'
const About = () => {
  return (
    <MDBContainer className="mt-5 text-center">
      <MDBRow>
        <MDBCol>
          <MDBJumbotron className="p-0 z-depth-3">
            <MDBCardImage className="img-fluid" style={{width:"100%", margin: "0 0"}}  src={EyeBrow} />
            <MDBCardBody>
              <MDBCardTitle className="h3">About Us</MDBCardTitle>
              <MDBCardText>
                Welcome to BookMi. A platform for setting your appointments to
                get your hair, nails and eyebrows done.
              </MDBCardText>
              <MDBBtn href="#" gradient="purple" rounded>
                BUTTON
              </MDBBtn>
            </MDBCardBody>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default About;
 
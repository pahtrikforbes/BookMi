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

const About = () => {
  return (
    <MDBContainer className="mt-5 text-center">
      <MDBRow>
        <MDBCol>
          <MDBJumbotron className="p-0 z-depth-3">
            <MDBCardImage
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Slides/img%20(134).jpg"
            />
            <MDBCardBody>
              <MDBCardTitle className="h3">Card title</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
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
 
import React, { Component } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
} from "mdbreact";

import googleIcon from "../../images/google-icon.jpg";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  RegisterForm = () => {
    return (
      <MDBRow>
        <MDBCol md="12">
          <div className="modal-content cascading-modal">
            <div className="modal-body mx-3">
              <div className="md-form mb-5">
                <i className="fas fa-user prefix grey-text"></i>
                <input
                  type="text"
                  id="orangeForm-name"
                  className="form-control validate"
                />
                <label
                  data-error="wrong"
                  data-success="right"
                  htmlFor="orangeForm-name"
                >
                  Your name
                </label>
              </div>
              <div className="md-form mb-5">
                <i className="fas fa-envelope prefix grey-text"></i>
                <input
                  type="email"
                  id="orangeForm-email"
                  className="form-control validate"
                />
                <label
                  data-error="wrong"
                  data-success="right"
                  htmlFor="orangeForm-email"
                >
                  Your email
                </label>
              </div>

              <div className="md-form mb-4">
                <i className="fas fa-lock prefix grey-text"></i>
                <input
                  type="password"
                  id="orangeForm-pass"
                  className="form-control validate"
                />
                <label
                  data-error="wrong"
                  data-success="right"
                  htmlFor="orangeForm-pass"
                >
                  Your password
                </label>
              </div>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    );
  };

  render() {
    return (
      <>
        <MDBModalHeader toggle={this.props.toggle}>
          <span className="w-100 font-weight-bold">Register</span>
        </MDBModalHeader>
        <MDBModalBody>{this.RegisterForm()}</MDBModalBody>
        <MDBModalFooter className="modal-footer d-flex justify-content-center">
          <MDBBtn className="btn btn-default z-depth-1-half">Register</MDBBtn>
          or
          <div className="float-right clearfix">
            <a href="/auth/google">
              Sign in with Google <i className="fab fa-google prefix"></i>
            </a>
          </div>
        </MDBModalFooter>
      </>
    );
  }
}

export default Register;

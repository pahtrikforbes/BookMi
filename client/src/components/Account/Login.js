import React, { Component } from "react";
import {
    MDBBtn,
  MDBCol,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
} from "mdbreact";

class Login extends Component {
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

  loginForm = () => {
    return (
      <MDBRow>
        <MDBCol md="12">
              <div className="modal-content cascading-modal">
                <div className="modal-body mx-3">
                  <div className="md-form mb-5">
                    <i className="fas fa-envelope prefix grey-text"></i>
                    <input
                      type="email"
                      id="email"
                      className="form-control validate"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="email"
                    >
                      Your email
                    </label>
                  </div>

                  <div className="md-form mb-4">
                    <i className="fas fa-lock prefix grey-text"></i>
                    <input
                      type="password"
                      id="defaultForm-pass"
                      className="form-control validate"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="defaultForm-pass"
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
          <span className="w-100 font-weight-bold">Login</span>
        </MDBModalHeader>
        <MDBModalBody>{this.loginForm()}</MDBModalBody>
        <MDBModalFooter className="modal-footer d-flex justify-content-center">
          <MDBBtn className="btn btn-default z-depth-1-half">Login</MDBBtn>
          or
          <div>
              <a
                href="/auth/google"
                type="button"
                className="btn-floating btn-small btn-fb"
              >
                Sign in with Google <i className="fab fa-google"></i>
              </a>
          </div>
        </MDBModalFooter>
      </>
    );
  }
}

export default Login;

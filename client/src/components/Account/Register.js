import React, { Component } from "react";
import {
  MDBCol,
  MDBInput,
  MDBModalBody,
  MDBRow,
  MDBModalFooter,
  MDBBtn,
} from "mdbreact";
import { validator } from "../../utils/index";
class RegisterPage extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      mobilePhone: "",
      errors: {},
    };
  }

  submitHandler = async (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      mobilePhone: this.state.mobilePhone,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    let errors = await validator(userData);

    if (errors) {
      this.setState({ errors: errors });

     
      return false;
    }
    if (!errors) alert("safe");

    return true;
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <>
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold mb-4">Register</h4>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.props.toggle}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <MDBModalBody>
          <MDBRow>
            <MDBCol md="12">
              <div className="modal-content cascading-modal">
                <div className="modal-body mx-3 grey-text">
                  <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate
                  >
                    <MDBRow>
                      <div className="col-md-6 mb-3">
                        <MDBInput
                          value={this.state.firstName}
                          name="firstName"
                          onChange={this.changeHandler}
                          type="text"
                          id="materialFormRegisterFirstNameEx"
                          label="Enter your first name"
                          icon="user"
                          group
                          required
                        >
                          <div
                            style={{ marginLeft: "2.5rem" }}
                            className="valid-feedback"
                          >
                            Looks good!
                          </div>
                          <div
                            style={{ marginLeft: "2.5rem" }}
                            className="invalid-feedback"
                          >
                            {errors.firstName}
                          </div>
                        </MDBInput>
                      </div>
                      <div className="col-md-6 mb-3">
                        <MDBInput
                          value={this.state.lastName}
                          name="lastName"
                          onChange={this.changeHandler}
                          type="text"
                          id="materialFormRegisterLastNameEx"
                          label="Enter your last name"
                          icon="user"
                          group
                          required
                        >
                          <div
                            style={{ marginLeft: "2.5rem" }}
                            className="valid-feedback"
                          >
                            Looks good!
                          </div>
                          <div
                            style={{ marginLeft: "2.5rem" }}
                            className="invalid-feedback"
                          >
                            {errors.lastName}
                          </div>
                        </MDBInput>
                      </div>
                    </MDBRow>
                    <MDBRow>
                      <div className="col-md-6 mb-3">
                        <MDBInput
                          value={this.state.email}
                          name="email"
                          onChange={this.changeHandler}
                          type="email"
                          id="materialFormRegisterEmailEx"
                          label="Type your email"
                          icon="envelope"
                          group
                          required
                        >
                          <div
                            style={{ marginLeft: "2.5rem" }}
                            className="valid-feedback"
                          >
                            Looks good!
                          </div>
                          <div
                            style={{ marginLeft: "2.5rem" }}
                            className="invalid-feedback"
                          >
                            {errors.email}
                          </div>
                        </MDBInput>
                      </div>
                      <div className="col-md-6 mb-3">
                        <MDBInput
                          value={this.state.mobilePhone}
                          name="mobilePhone"
                          onChange={this.changeHandler}
                          type="number"
                          id="materialFormRegisterMobileEx"
                          label="Enter phone number"
                          icon="mobile"
                          group
                          required
                        >
                          {this.state.mobilePhone.length > 9 &&
                          !isNaN(parseInt(this.state.mobilePhone)) ? (
                            <div
                              style={{ marginLeft: "2.5rem" }}
                              className="valid-feedback"
                            >
                              Looks good!
                            </div>
                          ) : (
                            <div
                              style={{ marginLeft: "2.5rem", fontSize: "80%" }}
                              className="red-text"
                            >
                              {errors.mobilePhone}
                            </div>
                          )}
                        </MDBInput>
                      </div>
                    </MDBRow>

                    <div className="md-form mb-5">
                      <MDBInput
                        value={this.state.password}
                        name="password"
                        onChange={this.changeHandler}
                        type="password"
                        id="materialFormRegisterPasswordEx"
                        label="Type your password"
                        icon="lock"
                        group
                        required
                      >
                        {this.state.password.length > 7 ? (
                          <div
                            style={{ marginLeft: "2.5rem" }}
                            className="valid-feedback"
                          >
                            Looks good!
                          </div>
                        ) : (
                          <div
                            style={{ marginLeft: "2.5rem", fontSize: "80%" }}
                            className="red-text"
                          >
                            <p>{errors.password}</p>
                          </div>
                        )}
                      </MDBInput>
                    </div>
                    <div className="md-form">
                      <MDBInput
                        value={this.state.confirmPassword}
                        name="confirmPassword"
                        onChange={this.changeHandler}
                        type="password"
                        id="materialFormRegisterConfirmPasswordEx"
                        label="Re-type your password"
                        icon="exclamation-triangle"
                        group
                        required
                      >
                        {this.state.confirmPassword.length > 7 &&
                        this.state.confirmPassword === this.state.password ? (
                          <div
                            style={{ marginLeft: "2.5rem" }}
                            className="valid-feedback"
                          >
                            Looks good!
                          </div>
                        ) : (
                          <div
                            style={{ marginLeft: "2.5rem", fontSize: "80%" }}
                            className="red-text"
                          >
                            <p>{errors.confirmPassword}</p>
                          </div>
                        )}
                      </MDBInput>
                    </div>
                    <div className="md-form d-flex justify-content-center">
                      <MDBBtn className="z-depth-1-half" type="submit">
                        Register
                      </MDBBtn>
                    </div>
                    <MDBModalFooter className="modal-footer d-flex justify-content-center">
                      <div className="float-right clearfix">
                        <a href="/auth/google">
                          Sign in with Google{" "}
                          <i className="fab fa-google prefix"></i>
                        </a>
                      </div>
                    </MDBModalFooter>
                  </form>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
      </>
    );
  }
}

export default RegisterPage;

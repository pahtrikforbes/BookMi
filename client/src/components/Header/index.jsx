import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBModal,
  MDBModalFooter,MDBBtn
} from "mdbreact";
import { connect } from "react-redux";
import Login from "../Account/Login";
import Register from "../Account/Register";
class NavbarPage extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      modal: false,
      modalContent: ""
    };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggle = (data) => {
    this.setState({
      modal: !this.state.modal,
      modalContent: data
    });

  };

  componentDidMount(){
    
  }

  renderContent() {
    switch (this.props.auth) {
      case false:
        return (
          <MDBNavItem>
            <MDBNavLink to="#!">Logout</MDBNavLink>
          </MDBNavItem>
        );
      default:
        return (
          <>
            <MDBNavItem>
              <MDBNavLink to="#!" onClick={() => this.toggle("login")}>
                Login
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!" onClick={() => this.toggle("register")}>
                Register
              </MDBNavLink>
            </MDBNavItem>
          </>
        );
    }
  }

  render() {
    const { modal, modalContent }= this.state;
    return (
      <>
        <MDBNavbar
          color="teal"
          dark
          expand="md"
          style={{ marginBottom: "2rem" }}
        >
          <MDBNavbarBrand>
            <strong className="white-text">BookMi</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/hair-styles">Hair Styles</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/about">About Us</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <span className="mr-2">Dropdown</span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem href="#!">
                      Create Appointment
                    </MDBDropdownItem>
                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">
                      Something else here
                    </MDBDropdownItem>
                    <MDBDropdownItem href="#!">
                      Something else here
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves>
                  <div className="md-form my-0">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      
                    />
                  </div>
                </MDBFormInline>
              </MDBNavItem>
              {this.renderContent()}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <MDBContainer>
          <MDBModal size={modalContent==="login" ? 'md':'lg'} fade isOpen={modal} toggle={this.toggle}>
            {modalContent === "login" && <Login toggle={this.toggle} />}
            {modalContent === "register" && <Register toggle={this.toggle} />}
          </MDBModal>
        </MDBContainer>
      </>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(NavbarPage);

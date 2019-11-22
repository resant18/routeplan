import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();    
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
          <div id="welcome">
            <h3 className="title">Hi, {this.props.currentUser.username}</h3>
            <div className="plus">
              <button className="btn" onClick={this.showModal}>New Trip +</button>
            </div>
            <div className="btn-container">
              <button className="header-button btn-logout" onClick={this.logoutUser}>Logout</button>
            </div>
            {/* <a className="plus" href="#">Menu</a> */}
          </div>
      );
    } else {
      return (
        <div id="session-actions-container">
          <Link id="signup" className="btn" to={"/signup"}>Signup</Link>
          <Link id="login" className="btn" to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  showModal() {  
    this.props.showModal('trip-form');
  }

  render() {
    return (
      <nav className="navbar">
        <div id="logo-container">
          {/* <i className="fab fa-trello"></i> */}
          <img className="logo-thumb" src="https://i.pinimg.com/474x/2a/ab/f9/2aabf9cf0568205df4d033981c750e71--typography-logo-design-design-logos.jpg"></img>
          <Link id="logo" to={"/"}>
            RoutePlan
          </Link>
        </div>
        <div className="navbar-content">{this.getLinks()}</div>
      </nav>
    );
  }
}

export default NavBar;

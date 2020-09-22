import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo.jpg";

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
         <div id='welcome'>
            <h3 className='title'>
               Hello,
               <NavLink activeClassName='username' to={`/trips/user/${this.props.currentUser.id}`}>
                  {" "}
                  {this.props.currentUser.username}{" "}
               </NavLink>
            </h3>
            <div className='plus'>
               <button id='new-trip-btn' className='btn' onClick={this.showModal}>
                  <i className='new-trip'></i>
                  <span>New Trip +</span>
               </button>
            </div>
            <div className='btn-container'>
               <button className='header-button btn-logout' onClick={this.logoutUser}>
                  Logout
               </button>
            </div>
         </div>
      );
    } else {
      return (
        <div id="session-actions-container">
          <Link id="signup" className="btn" to={"/signup"}>
            Signup
          </Link>
          <Link id="login" className="btn" to={"/login"}>
            Login
          </Link>
        </div>
      );
    }
  }

  showModal() {
    this.props.showModal("trip-form");
  }

  render() {
    return (
       <nav className='navbar'>
          <div id='logo-container'>
             <Link id='logo' to={"/"}>
                <img className='logo-thumb' src={logo} alt='Route Plan' />
                <span>RoutePlan</span>
             </Link>
          </div>
          <div className='navbar-content'>{this.getLinks()}</div>
       </nav>
    );
  }
}

export default NavBar;

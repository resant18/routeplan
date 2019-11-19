import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
// import '../../lib/place-search';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentDidMount() {
    window.placeSearch({
      key: 'GtJj838k2uUMChaJbStq3F7qM0WobjXf',
      container: document.querySelector('#place-search-input')
    });
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={'/tweets'}>All Tweets</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/new_tweet'}>Write a Tweet</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Route Plan</h1>
        {this.getLinks()}
        <input
          type='search'
          id='place-search-input'
          placeholder='Start Searching...'
        />
      </div>
    );
  }
}

export default NavBar;

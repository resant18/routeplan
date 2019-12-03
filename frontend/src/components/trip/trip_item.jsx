import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './trip.css';


class TripItem extends React.Component {  

  handleDelete(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.loggedIn) {
      this.props.destroyTrip(this.props.trip._id);
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    const { _id, name } = this.props.trip;
    let img;
    img = <img src={this.props.im} className="bbg" alt=""></img>; 
    return (
      <div className="trip-container">
        <Link to={`/trips/${_id}`} className="item-link">
          <div className="overlay"></div>
          {img}
          <div className="item-container">
            <div className="t-title">{name}</div>
            <div className="item-actions">
              <div onClick={(e) => this.handleDelete(e)} className="t-action">&#x1f5d1;</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(TripItem);

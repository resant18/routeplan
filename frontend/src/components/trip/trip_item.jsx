import React from 'react';
import { Link } from 'react-router-dom';
import './trip.css';


class TripItem extends React.Component {  
  render() {
    const { _id, name } = this.props.trip;
    let img;
    img = <img src={this.props.im} className="bbg"></img>; 
    return (
      <div className="trip-container">
        <Link to={`/trips/${_id}`} className="item-link">
          <div className="overlay"></div>
          {img}
          <div className="t-title">{name}</div>
        </Link>
      </div>
    );
  }
}

export default TripItem;

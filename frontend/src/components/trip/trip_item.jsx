import React from 'react';
import { Link } from 'react-router-dom';


class TripItem extends React.Component {  
  render() {
    
    const { _id, name } = this.props.trip;

    return (
      <div className="trip-container">        
        <Link to={`/trips/${_id}`} className="item-link">
          <div className="overlay"></div>
          <div className="t-title">{name}</div>
        </Link>        
      </div>
    );
  }
}

export default TripItem;

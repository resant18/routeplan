import React from 'react';
import { Link } from 'react-router-dom';

export default function main_page_item(props) {
    return (
      <div className="trip-container">
        <Link to={`/${props.trip._id}`} className="item-link">
            <div className="overlay"></div>
            <div className="t-title">{props.trip.name}</div>
        </Link>
      </div>
    );
}

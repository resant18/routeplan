import React from 'react';
import { Link } from 'react-router-dom';

export default function main_page_item(props) {
    return (
      <div>
        <div>
          <Link to={`/${props.trip._id}`} >{props.trip.name}</Link>
        </div>
      </div>
    );
}

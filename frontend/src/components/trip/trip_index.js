import React from 'react';
import TripItem from './trip_item';

export default class TripIndex extends React.Component {    
    componentDidMount() {
        this.props.fetchTrips();
    }

    render() {
        if (this.props.trips === []) return null;

        return (
          <div className="trips-container">
            <div className="trips-index">
              <div className="trips-list">
                {this.props.trips.map((trip, idx) => {
                  return <TripItem trip={trip} key={idx} />;
                })}
              </div>
            </div>
          </div>
        );
    }
}

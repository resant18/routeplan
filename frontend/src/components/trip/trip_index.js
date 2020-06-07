import React from "react";
import TripItem from "./trip_item";
import bgImage from "../../assets/bg_map.jpg";

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
            {this.props.trips.map((trip, idx) =>                             
                <TripItem
                  loggedIn={this.props.loggedIn}
                  destroyTrip={this.props.destroyTrip}
                  editTrip={this.props.editTrip}                  
                  trip={trip}
                  key={idx}
                />              
            )}
          </div>
        </div>
      </div>
    );
  }
}

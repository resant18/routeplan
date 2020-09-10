import React from "react";
import TripItem from "./trip_item";
import bgImage from "../../assets/bg_map.jpg";

export default class TripIndex extends React.Component {
  componentDidMount() {      
    if (this.props.userId) {
       this.props.fetchUserTrips(this.props.userId);
    } else {
       this.props.fetchTrips();
    }
  }

  render() {
    if (this.props.trips === []) return null;

    return (
       <main>
          <div className='trips-container'>
             <div className='trips-index'>
                <div className='trips-list'>
                   {this.props.trips.map((trip, idx) => (
                      <TripItem
                         loggedIn={this.props.loggedIn}
                         creatorId={trip.user}
                         destroyTrip={this.props.destroyTrip}
                         editTrip={this.props.editTrip}
                         trip={trip}
                         key={idx}
                      />
                   ))}
                </div>
             </div>
          </div>
       </main>
    );
  }
}

import React from "react";
import MapQuest from '../map/map_quest';
const keys = require("../../config/api_keys");

class TripShow extends React.Component {
  componentDidMount() {    
    if (!this.props.origin.length || !this.props.destination.length) {        
      if (this.props.tripId) {
        this.props.fetchTrip(this.props.tripId);
        console.log('fetch trip...')
      }
      else return null;
    };
  }


  render() {        
    const { origin, destination } = this.props;

    if (!origin.length || !destination.length) return null;

    // console.log(this.props.locationFrom);
    // console.log('origin:' + origin);
    // console.log("destination:" + destination);

    return (
      <div>
        <MapQuest
          center={origin} //{[37.7749, -122.4194]}   //{this.props.origin}
          baseLayer={"map"}
          zoom={12}
          routeStart={origin} //{[37.798634, -122.4194]} //{this.props.origin}
          routeEnd={destination} //{[37.7724, -122.4415]} //{this.props.destination}
          apiKey={keys.MAP_KEY}
          maxMatches={500}
        />
      </div>
    );
  }
}

export default TripShow;

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

    if (origin === undefined || destination === undefined) return null;
    if (!origin.length || !destination.length) return null;

    return (
      <div>
        <MapQuest
          center={origin} 
          baseLayer={"map"}
          zoom={12}
          routeStart={origin} 
          routeEnd={destination} 
          apiKey={keys.MAP_KEY}
          maxMatches={500}
        />
      </div>
    );
  }
}

export default TripShow;

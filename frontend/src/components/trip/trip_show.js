import React from "react";
import MapQuest from '../map/map_quest';
const keys = require("../../config/api_keys");

class TripShow extends React.Component {
  constructor(props) {
    super(props);   
  }

  

  render() {   
    // if (!this.props.location) return null;

    // const { origin, destination } = this.props.location.new;
    
    return (
      <div>
        <MapQuest
          center={this.props.origin} //{[37.7749, -122.4194]}   //{this.props.origin}
          baseLayer={"map"}
          zoom={12}
          routeStart={this.props.origin} //{[37.798634, -122.4194]} //{this.props.origin}
          routeEnd={this.props.destination} //{[37.7724, -122.4415]} //{this.props.destination}
          apiKey={keys.MAP_KEY}
          maxMatches={500}          
        />
      </div>
    );
  }
}

export default TripShow;

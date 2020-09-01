import React from "react";
import MapQuest from "../map/map_quest";
import { getTrip } from "../../util/trip_api_util";
const keys = require("../../config/api_keys");

class TripShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: {},
      destination: {}      
    };    
  }

  componentDidMount() {    
    getTrip(this.props.tripId).then(res => {            
      this.setState({
        origin: res.data.origin,
        destination: res.data.destination
      });
    });
  }

  render() {
    let { origin, destination } = this.state;
    
    if (!(Object.values(origin).length && Object.values(destination).length)) return null;      

    let originPos = [origin.lat, origin.lng];
    let destinationPos = [destination.lat, destination.lng];

    return (      
      <div className="main-wrapper">
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

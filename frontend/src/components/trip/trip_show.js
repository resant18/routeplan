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

    this.selectedPois = [];
  }

  componentDidMount() {    
    getTrip(this.props.tripId).then(res => {            
      this.setState({
        origin: res.data.origin,
        destination: res.data.destination        
      });      
      this.selectedPois = res.data.pois;
    });
  }

  render() {
    let { origin, destination, selectedPois } = this.state;
    
    if (!(Object.values(origin).length && Object.values(destination).length)) return null;          

    return (      
      <div className="main-wrapper">
        <MapQuest
            center={origin}
            baseLayer={"map"}
            zoom={12}
            routeStart={origin}
            routeEnd={destination}
            selectedPois={this.selectedPois}
            apiKey={keys.MAP_KEY}
            maxMatches={500}
        />
      </div>      
    );
  }
}

export default TripShow;

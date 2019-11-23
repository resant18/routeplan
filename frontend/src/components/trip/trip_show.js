import React from "react";
import MapQuest from '../map/map_quest';
import TripShowDetailContainer from "./trip_show_detail_container";
const keys = require("../../config/api_keys");

class TripShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: this.props.origin,
      destination: this.props.destination
    }
  }

  componentDidMount() {        
    this.props.fetchTrip(this.props.tripId)
      .then(this.setState({
        origin: this.props.origin,
        destination: this.props.destination
      }))
  }


  render() {        
    const { origin, destination } = this.props;
    
    if (!origin.length || !destination.length) return null;

    return (
      <div>
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
        <div>
          {/* <TripShowDetailContainer /> */}
        </div>
      </div>
    );
  }
}

export default TripShow;

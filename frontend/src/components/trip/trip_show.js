import React from "react";
import MapQuest from "../map/map_quest";
import { getTrip } from "../../util/trip_api_util";
const keys = require("../../config/api_keys");

class TripShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: [],
      destination: []
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
    let origin = this.state.origin;
    let destination = this.state.destination;
    if (!(origin.length && destination.length)) return null;

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
      </div>
    );
  }
}

export default TripShow;

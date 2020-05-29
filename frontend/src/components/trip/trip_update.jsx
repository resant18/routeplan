import React from "react";
import PlaceSearchBar from "../place_search/place_search_bar";

class TripUpdateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "", // this.props.name
      error: null,
      origin: [], // this.props.origin
      destination: [] // this.props.destination
    };

    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeOrigin(pos) {
    this.setState({ origin: Object.values(pos) });
  }

  handleChangeDestination(pos) {
    this.setState({ destination: Object.values(pos) });
  }

  handleInput(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let trip = Object.assign({}, this.state);
    this.props
      .editTrip(trip)
      .then(trip => trip.trip.data._id)
      .then(tripId => this.props.history.push(`/trips/${tripId}`))
      .then(this.props.hideModal)
      .catch(err => {
        this.setState({
          err
        });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <PlaceSearchBar
              key="origin"
              placeholder="Start point"
              input={this.handleChangeOrigin}
            />
          </div>
          <div>
            <PlaceSearchBar
              key="destination"
              placeholder="End point"
              input={this.handleChangeDestination}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="insert name from props"
              onChange={this.handleInput}
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default TripUpdateForm;

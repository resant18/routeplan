import React, { Component } from "react";
import ReactDOM from "react-dom";
const keys = require("../../config/api_keys");

class PlaceSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this._getLocation = this._getLocation.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const inputBox = ReactDOM.findDOMNode(this.placeSearchInput);
    this.ps = window.placeSearch({
      key: keys.MAP_KEY,
      container: inputBox,
      useDeviceLocation: true,
      collection: ["poi", "airport", "address", "adminArea"]
    });
  }

  _getLocation() {
    this.ps.on("change", e => {
      this.props.input({
        lat: e.result.latlng["lat"],
        lng: e.result.latlng["lng"]
      });
    });
  }

  handleChange() {
    this._getLocation();
  }

  handleKeyPress() {
    this._getLocation();
  }

  handleError() {
    this.ps.on("error", e => {
      console.log(e);
    });
  }

  render() {
    return (
      <input
        type="search"
        id="place-search-input"
        ref={placeSearchInput => {
          this.placeSearchInput = placeSearchInput;
        }}
        placeholder={this.state.placeholder}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    );
  }
}

export default PlaceSearchBar;

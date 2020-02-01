import React, { Component } from "react";
import Sidebar from "./sidebar";
import Select from "react-select";
import TripShowDetail from "../trip/trip_show_detail";
import "./sidebar.css";
const axios = require("axios");
var qs = require("qs");
var assert = require("assert");

class MapQuest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      value: ""
    };
    this.pointsOfInterest = [];
    this.filteredPoints = [];
    this.markers = [];
    this.handleChange = this.handleChange.bind(this);

    this._setBoundingBox = this._setBoundingBox.bind(this);
    this.initializeMap = this.initializeMap.bind(this);
    this.drawRoute = this.drawRoute.bind(this);
    this.fetchMapData = this.fetchMapData.bind(this);
  }

  _setBoundingBox(routeProps) {
    const { routeStart, routeEnd } = routeProps;
    return String(routeStart.concat(routeEnd));
  }

  initializeMap() {
    window.L.mapquest.key = this.props.apiKey;

    this.map = window.L.mapquest.map("map", {
      center: this.props.center,
      layers: window.L.mapquest.tileLayer(this.props.baseLayer),
      zoom: this.props.zoom
    });
  }

  fetchMapData(boundingBoxParam) {
    // fetch POI
    const proxy_url = "https://cors-anywhere.herokuapp.com/";

    axios
      .get(`${proxy_url}https://www.mapquestapi.com/search/v2/rectangle`, {
        params: {
          key: this.props.apiKey,
          boundingBox: boundingBoxParam,
          maxMatches: 500
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      })
      .then(result => {
        this.pointsOfInterest = result.data.searchResults;
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  drawRoute(routeProps) {
    let directions = window.L.mapquest.directions();

    directions.setLayerOptions({
      startMarker: {
        draggable: false
      },
      endMarker: {
        draggable: false
      },
      routeRibbon: {
        draggable: false
      }
    });

    directions.route({
      start: routeProps.routeStart,
      end: routeProps.routeEnd,
      options: {
        routeType: "pedestrian"
      }
    });
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    const boundingBoxParam = this._setBoundingBox(nextProps);
    this.fetchMapData(boundingBoxParam);

    this.drawRoute(nextProps);
  }

  componentDidMount() {
    const boundingBoxParam = this._setBoundingBox(this.props);
    this.fetchMapData(boundingBoxParam);

    this.initializeMap();
    this.drawRoute(this.props);
    this.map.addControl(window.L.mapquest.locatorControl());
  }

  handleChange = selectedOption => {
    this.setState({ value: selectedOption.value });
  };

  filterMap() {
    for (let layer of this.markers) {
      this.map.removeLayer(layer);
    }
    this.filteredPoints = [];
    if (this.state.value.length > 0) {
      for (let pt of this.pointsOfInterest) {
        if (pt.fields.group_sic_code.startsWith(this.state.value)) {
          this.filteredPoints.push(pt);
          let curMarker = window.L.marker(pt.shapePoints, {
            icon: window.L.mapquest.icons.marker({
              shadow: false
            }),
            draggable: false,
            opacity: 0.5
          });
          curMarker
            .bindPopup(
              pt.name + "<br/>" + pt.fields.address + ", " + pt.fields.city
            )
            .addTo(this.map);
          this.markers.push(curMarker);
        }
      }
    }
  }

  render() {
    this.filterMap();

    const mapStyle = {
      height: "75vh",
      width: "80%",
      zIndex: 1
    };

    const options = [
      { value: "5812", label: "Restaurants" },
      { value: "8412", label: "Museums" },
      { value: "799", label: "Parks" },
      { value: "5813", label: "Bars" },
      { value: "5942", label: "Books" },
      { value: "602101", label: "ATM" },
      { value: "5461", label: "Bakeries" }
    ];

    return (
      <div className="col-right">
        <div id="map" style={mapStyle}></div>
        <div className="trip-details">
          <div style={{ width: "300px" }}>
            <Select
              options={options}
              placeholder="--Filter by category--"
              onChange={this.handleChange}
            />
          </div>

          <Sidebar pointsOfInterest={this.filteredPoints} />
        </div>
      </div>
    );
  }
}
export default MapQuest;

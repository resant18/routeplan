import React, { Component } from "react";
import Sidebar from "./sidebar";
import Select from "react-select";
import "./sidebar.css";

const axios = require("axios");
var qs = require("qs");

class MapQuest extends Component {
   constructor(props) {
      super(props);

      this.state = {
         error: null,
         value: "",
         icon: "",
         showTripDetail: false,
      };
      this.pointsOfInterest = [];
      this.filteredPoints = [];
      this.markers = [];
      this.handleChange = this.handleChange.bind(this);

      this._setBoundingBox = this._setBoundingBox.bind(this);
      this.initializeMap = this.initializeMap.bind(this);
      this.drawRoute = this.drawRoute.bind(this);
      this.fetchMapData = this.fetchMapData.bind(this);
      this.toggleTripDetail = this.toggleTripDetail.bind(this);
   }

   _setBoundingBox(routeProps) {
      const { routeStart, routeEnd } = routeProps;
      const routeStartPos = [routeStart.lat, routeStart.lng];
      const routeEndPos = [routeEnd.lat, routeEnd.lng];
      return String(routeStartPos.concat(routeEndPos));
   }

   initializeMap() {
      window.L.mapquest.key = this.props.apiKey;

      this.map = window.L.mapquest.map("map", {
         center: this.props.center,
         layers: window.L.mapquest.tileLayer(this.props.baseLayer),
         zoom: this.props.zoom,
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
               maxMatches: 500,
            },
            paramsSerializer: (params) => {
               return qs.stringify(params);
            },
         })
         .then((result) => {
            this.pointsOfInterest = result.data.searchResults;
         })
         .catch((error) => {
            this.setState({
               error,
            });
         });
   }

   fetchWaypoints() {
      if (this.props.waypoints === undefined || this.props.waypoints.length === 0) return;

      let waypoints = [];
      for (const w of this.props.waypoints) {
         waypoints.push(w.name + ", " + w.address + ", " + w.city);
      }

      return waypoints;
   }

   drawRoute(routeProps) {
      let directions = window.L.mapquest.directions();
      let waypoints = this.fetchWaypoints();

      directions.setLayerOptions({
         startMarker: {
            draggable: false,
         },
         endMarker: {
            draggable: false,
         },
         routeRibbon: {
            draggable: false,
         },
      });

      directions.route({
         start: routeProps.routeStart.detail,
         end: routeProps.routeEnd.detail,

         waypoints: waypoints,
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

   handleChange = (selectedOption) => {
      this.setState({
         value: selectedOption.value,
         icon: selectedOption.label,
      });
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
                     shadow: false,
                  }),
                  draggable: false,
                  opacity: 0.5,
               });
               curMarker.bindPopup(pt.name + "<br/>" + pt.fields.address + ", " + pt.fields.city).addTo(this.map);
               this.markers.push(curMarker);
            }
         }
      }
   }

   addSelectedPois() {
      if (this.props.selectedPois === undefined || this.props.selectedPois.length === 0) return;

      for (const poi of this.props.selectedPois) {
         let lat = poi.lat;
         let lng = poi.lng;
         let poiName = poi.name;
         window.L.marker([lat, lng], {
            icon: window.L.mapquest.icons.marker(),
            draggable: false,
         })
            .bindPopup(poiName)
            .addTo(this.map);
      }
   }

   toggleTripDetail() {
     this.setState({...this.state, showTripDetail: !(this.state.showTripDetail)});
   }

   isLargeDevice() {     
     return window.matchMedia('(min-width: 769px)').matches;
   }

   render() {     
      this.filterMap();
      this.addSelectedPois();

      const mapStyle = {
         height: "100%",
         zIndex: 1,
      };

      const options = [
         { value: "5812", label: "Restaurants" },
         { value: "8412", label: "Museums" },
         { value: "799", label: "Parks" },
         { value: "5813", label: "Bars" },
         { value: "5942", label: "Books" },
         { value: "602101", label: "ATMs" },
         { value: "5461", label: "Bakeries" },
      ];

      return (
         <div className='main-content'>
            <div id='map' style={mapStyle} />
            <div className='trip-details'>
               <div className='trip-control-bar'>
                  <div className='trip-details-list'>
                     <Select
                        options={options}
                        placeholder='--Filter by category--'
                        onChange={this.handleChange}
                        className='poi-category'
                     />
                  </div>
                  <button type='button' onClick={this.toggleTripDetail}>
                     {this.state.showTripDetail ? 'Hide detail' : 'Show detail'}
                  </button>
               </div>

               <Sidebar visibility={ this.isLargeDevice() ? true : this.state.showTripDetail } 
                        pointsOfInterest={this.filteredPoints} 
                        selectedPoiCategoryIcon={this.state.icon} />
            </div>
         </div>
      );
   }
}
export default MapQuest;

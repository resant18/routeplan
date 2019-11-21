import React, { Component } from 'react';
import Sidebar from './sidebar'
const axios = require('axios');
var qs = require('qs');
var assert = require('assert');
// import '../../lib/mapquest-js';
// import '../../lib/mapquest-js.css';

class MapQuest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            value: '',
        }
        this.pointsOfInterest = [];
        this.filteredPoints = [];
        this.markers = [];
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const proxy_url = "https://cors-anywhere.herokuapp.com/";

        const {routeStart, routeEnd } = this.props;
        // ajax tests
        const boundingBoxParam = String(routeStart.concat(routeEnd));
        // const boundingBoxParam = "37.81024, -122.41048, 37.807806, -122.4047";
        console.log(boundingBoxParam);

        axios
          .get(`${proxy_url}https://www.mapquestapi.com/search/v2/rectangle`, {
            params: {
              key: this.props.apiKey,            
              boundingBox: boundingBoxParam,
              maxMatches: 500,
              hostedData: ["mqap.ntpois"]
            },
            paramsSerializer: params => {
              return qs.stringify(params);
            }
        })
            .then(
                (result) => {
                    this.pointsOfInterest = result.data.searchResults;
                    console.log(this.pointsOfInterest)
                })
            .catch(error => {
                this.setState({
                    error
                })

            });
          });
        //--------
        window.L.mapquest.key = this.props.apiKey;

        this.map = window.L.mapquest.map('map', {
            center: this.props.center,
            layers: window.L.mapquest.tileLayer(this.props.baseLayer),
            zoom: this.props.zoom
        });
        
        let directions = window.L.mapquest.directions();        
        directions.route({
            start: this.props.routeStart,
            end: this.props.routeEnd
        });

        // let bounds = [this.props.routeStart, this.props.routeEnd];
        // // create an orange rectangle
        // window.L.rectangle(bounds, { color: "#ff7800", weight: 1 }).addTo(this.map);
        // // zoom the map to the rectangle bounds
        // this.map.fitBounds(bounds);
        //-----
        this.map.addControl(window.L.mapquest.locatorControl());
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

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
                    curMarker.bindPopup(pt.name + '<br/>' + pt.fields.address + ', ' + pt.fields.city).addTo(this.map);
                    this.markers.push(curMarker);
                }
            }
        }
    }

    render() {
        this.filterMap();

        const mapStyle = {
            height: '75vh',
            width: '80%',
        };

        return (
            <div className="col-left">
                <div id="map" style={mapStyle}>
                </div>
                    <form>
                        <select onChange={this.handleChange} value={this.state.value}>
                            <option value="">--Filter by place you'd like to visit--</option>
                            <option value="5812">Restaurants</option>
                            <option value="8412">Museums</option>
                            <option value="799">Parks</option>
                            <option value="5813">Bars</option>
                            <option value="5942">Books</option>
                            <option value="602101">ATM</option>
                            <option value="5461">Bakeries</option>
                        </select>
                    </form>
                    {this.filteredPoints.length > 0 &&
                        <Sidebar pointsOfInterest={this.filteredPoints}/>
                    }
            </div>
        );
    }
}
export default MapQuest;
import React, { Component } from 'react';
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
            isLoaded: false,
            pointsOfInterest: [],
            value: '',
        }
        this.markers = [];
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        for (let layer of this.markers) {
            this.map.removeLayer(layer);
        }
        this.markers = [];
        if (this.state.value.length > 0) {
            for (let pt of this.state.pointsOfInterest) {
                if (pt.fields.group_sic_code.startsWith(this.state.value)) {
                    let curMarker = window.L.marker(pt.shapePoints, {
                        icon: window.L.mapquest.icons.marker({
                            shadow: false
                        }),
                        draggable: false,
                        opacity: 0.5
                    })
                    curMarker.bindPopup(pt.name).addTo(this.map);
                    this.markers.push(curMarker);
                }
            }
        }

    }

    componentDidMount() {
        // ajax tests
        axios.get('https://www.mapquestapi.com/search/v2/rectangle', {
            params: {
                key: this.props.apiKey,
                boundingBox: '37.7724, -122.4415, 37.798634, -122.4194',
                maxMatches: 500,
                hostedData: ['mqap.ntpois']
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
            .then(
                (result) => {
                this.setState({
                    isLoaded: true,
                    pointsOfInterest: result.data.searchResults
                });
                console.log(this.state.pointsOfInterest);
                // for (let res of response.data.results) {

                //     window.L.marker(res.place.geometry.coordinates.reverse(), {
                //         icon: window.L.mapquest.icons.marker({
                //             shadow: false
                //         }),
                //         draggable: true,
                //         opacity: 0.5
                //     }).bindPopup(res.name).addTo(map);
                // }
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                })
            });
        //--------

        window.L.mapquest.key = this.props.apiKey;

        this.map = window.L.mapquest.map('map', {
            center: this.props.center,
            layers: window.L.mapquest.tileLayer(this.props.baseLayer),
            zoom: this.props.zoom
        });

        // let directionsControl = window.L.mapquest.directionsControl().addTo(map);
        // console.log(directionsControl);

        // let directions = window.L.mapquest.directions();
        // directions.route({
        //     start: this.props.routeStart,
        //     end: this.props.routeEnd
        // });

        let bounds = [this.props.routeStart, this.props.routeEnd];
        // create an orange rectangle

        window.L.rectangle(bounds, { color: "#ff7800", weight: 1 }).addTo(this.map);
        // zoom the map to the rectangle bounds
        this.map.fitBounds(bounds);

        //-----
        this.map.addControl(window.L.mapquest.locatorControl());
    }

    handleChange(e) {
        this.setState({value: e.target.value})
        console.log(this.state);

    }

    render() {

        const mapStyle = {
            height: '75vh',
            width: '80%',
        };
        return (
            <div>
                <div id="map" style={mapStyle}>
                </div>
                    <form>
                        <select onChange={this.handleChange} value={this.state.value}>
                            <option value="">--Filter by place you'd like to visit--</option>
                            <option value="5812">Food</option>
                            <option value="8412">Museums</option>
                            <option value="799">Parks</option>
                        </select>
                    </form>

            </div>
        );
    }    
}

export default MapQuest
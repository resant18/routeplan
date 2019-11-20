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
            isLoaded: false,
            pointsOfInterest: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // ajax tests
        axios.get('https://www.mapquestapi.com/search/v2/rectangle', {
            params: {
                key: this.props.apiKey,
                boundingBox: '37.7724, -122.4415, 37.798634, -122.4194',
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
            .then(
                (result) => {
                console.log(result);
                this.setState({
                    isLoaded: true,
                    pointsOfInterest: result.data.searchResults
                });
                console.log(this.state);
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
                console.log(error.response)
            });
        //--------

        window.L.mapquest.key = this.props.apiKey;

        let map = window.L.mapquest.map('map', {
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
        window.L.rectangle(bounds, { color: "#ff7800", weight: 1 }).addTo(map);
        // zoom the map to the rectangle bounds
        map.fitBounds(bounds);

        //-----
        window.L.marker(this.props.center, {
            icon: window.L.mapquest.icons.marker({
                shadow: false
            }),
            draggable: true,
            opacity: 0.5
        }).bindPopup('center of san francisco').addTo(map);
        map.addControl(window.L.mapquest.locatorControl());
    }

    handleSubmit(e) {
        e.preventDefault();
        alert('works')
        console.log(this.state);
    }

    handleChange(e) {
        this.setState({q: e.target.value})
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
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="query string" value={this.state.q} onChange={this.handleChange}/>
                        <button type="submit">submit q</button>
                    </form>
            </div>
        );
    }    
}

export default MapQuest
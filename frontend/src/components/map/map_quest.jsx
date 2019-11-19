import React, { Component } from 'react';
// import '../../lib/mapquest-js';
// import '../../lib/mapquest-js.css';

class MapQuest extends Component {

    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    componentDidMount() {
        window.L.mapquest.key = this.state.apiKey;

        let map = window.L.mapquest.map('map', {
            center: this.state.center,
            layers: window.L.mapquest.tileLayer(this.state.baseLayer),
            zoom: this.state.zoom
        });

        let directions = window.L.mapquest.directions();
        directions.route({
            start: this.props.routeStart,
            end: this.props.routeEnd
        });

        let bounds = [[37.7749, -122.4194], [37.4724, -122.2415]];
        // create an orange rectangle
        window.L.rectangle(bounds, { color: "#ff7800", weight: 1 }).addTo(map);
        // zoom the map to the rectangle bounds
        map.fitBounds(bounds);

        window.L.marker([37.615223, -122.389977], {
            icon: window.L.mapquest.icons.marker(),
            draggable: false
        }).bindPopup('San Francisco, CA').addTo(map);
    }

    render() {
        const mapStyle = {
            height: this.state.height,
            width: this.state.width
        };
        return (
            <div id="map" style={mapStyle}>
                <p style={{ textAlign: 'center' }}>Map loading...</p>
            </div>
        );
    }    
}

export default MapQuest
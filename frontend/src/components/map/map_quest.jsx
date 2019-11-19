import React, { Component } from 'react';
// import '../../lib/mapquest-js';
// import '../../lib/mapquest-js.css';

class MapQuest extends Component {

    constructor(props) {
        super(props);
        this.state = { ...props };

        this.handleTest = this.handleTest.bind(this);
    }

    componentDidMount() {
        window.L.mapquest.key = this.state.apiKey;

        let map = window.L.mapquest.map('map', {
            center: this.state.center,
            layers: window.L.mapquest.tileLayer(this.state.baseLayer),
            zoom: this.state.zoom
        });


        let directionsControl = window.L.mapquest.directionsControl();
        directionsControl.addTo(map);
        directionsControl.setStart({
            street: "1555 Blake St",
            city: "Denver",
            county: "Denver",
            state: "CO"
        });

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

        window.L.marker([37.7733, -122.4253], {
            icon: window.L.mapquest.icons.marker({
                shadow: false
            }),
            draggable: true,
            opacity: 0.5
        }).bindPopup('<b>Center of</b> San Francisco, CA').addTo(map);
        map.addControl(window.L.mapquest.locatorControl());
    }

    handleTest() {
        console.log(window.L.mapquest.directionsControl());
    }

    render() {
        const mapStyle = {
            height: '75vh',
            width: '80%',
        };
        return (
            <div>
                <button onClick={this.handleTest}>Test</button>
                <div id="map" style={mapStyle}>
                    <p style={{ textAlign: 'center' }}>Map loading...</p>
                </div>
            </div>
        );
    }    
}

export default MapQuest
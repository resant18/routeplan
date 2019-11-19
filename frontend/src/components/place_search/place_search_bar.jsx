import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import '../../lib/mapquest-js';
// import '../../lib/mapquest-js.css';
const keys = require('../../config/api_keys');

class PlaceSearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = { ...props };
        this.placeSearch = window.placeSearch;
        
    }

    componentDidMount() {
        const inputBox = ReactDOM.findDOMNode(this.placeSearchInput);
        const ps = this.placeSearch({
            key: keys.MAP_KEY,
            container: inputBox,
            useDeviceLocation: true,
            collection: [
                'poi',
                'airport',
                'address',
                'adminArea',
            ]
        });
        
        ps.on('change', e => {                        
            console.log(e.result.latlng);
            this.props.input({
              lat: e.result.latlng["lat"],
              lng: e.result.latlng["lng"]
            });
        });

        ps.on('error', e => {
            console.log(e);
        })
    }

    render() {
        console.log(this.props);
        return (
            <input
                type='search'
                id='place-search-input'
                ref={placeSearchInput => { this.placeSearchInput = placeSearchInput }}
                placeholder={this.state.placeholder}             
            />
        );
    }
}

export default PlaceSearchBar
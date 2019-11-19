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
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const inputBox = ReactDOM.findDOMNode(this.placeSearchInput);
        const ps = this.placeSearch({
            key: keys.MAP_KEY,
            container: inputBox
        });
        
        ps.on('change', e => {                        
            // console.log(e.result.latlng);
            this.props.input({
              lat: e.result.latlng["lat"],
              lng: e.result.latlng["lng"]
            });
        });

        ps.on('error', e => {
            console.log(e);
        })
    }

    handleChange() {
        // const inputBox = ReactDOM.findDOMNode(this.placeSearchInput);
        // const ps = window.placeSearch({
        //     key: keys.MAP_KEY,
        //     container: document.querySelector('#place-search-input')
        // });
        // ps.on('change', e => {
        //     debugger
        //     console.log(e.result.state);
        // });
    }
    

    render() {
        const mapStyle = {
            height: this.state.height,
            width: this.state.width
        };
        return (
            <input
                type='search'
                id='place-search-input'
                ref={placeSearchInput => { this.placeSearchInput = placeSearchInput }}
                placeholder='Start Searching...'
                onChange={this.handleChange}
            />
        );
    }
}

export default PlaceSearchBar
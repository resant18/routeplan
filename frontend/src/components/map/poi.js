import React, { Component } from 'react'
const axios = require('axios');
const yelp = require('yelp-fusion');
var qs = require('qs');

export default class Poi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedToTrip: false,
            data: []
        }
    }

    componentDidMount() {
        const apiKey = 'p-XhSqgupUYL5Wv0qR38I6O5hCGVMLYjdoU4iEGS_fUizw_5u9YQDaff3i5t8wL21NgEF5Y\
SyHM5YXEECxfMWwSVnZi_LWvlDVpBuGEa0VjvdU-8EstUwDb_yiNvXHYx';
        // Place holder for Yelp Fusion's API Key. Grab them                                    
        // from https://www.yelp.com/developers/v3/manage_app                                   

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${this.props.city}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            },
            params: {
                term: this.props.name
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
            .then(
                (res) => {
                    this.setState({data: res.data.businesses[0]})
                }
            )
            // .then(() => new Promise(resolve => setTimeout(resolve, 400)))
            .catch(err => {
                console.log(err)
            });
    }

    handleClick = e => {

    }

    render() {
        return (
            <div className="poi">
            <h3>{this.props.name}</h3>
            {this.state.data && <img src={this.state.data.image_url}></img>}
            <button>Add to trip</button>
            </div>
        )
    }
}

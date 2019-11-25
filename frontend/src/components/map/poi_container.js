import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPoiToTrip } from '../../actions/poi_actions';
import './poi.css'
import defaultSvg from '../../assets/default-place.svg'
const axios = require('axios');
const qs = require('qs');
const API_KEY = require('../../config/api_keys');

class PoiContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            data: [],
            selectedPois: []
        }
    }

    yelpCall() {
        const apiKey = API_KEY.YELP_KEY;
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
                //console.log(err)
            });
    }

    componentDidUpdate() {
        this.yelpCall();
    }

    componentDidMount() {
        this.yelpCall();
    }

    
    // This function pass selected POI up to Sidebar component
    handleAddToTrip(poi) {             
        this.props.addPoiToTrip({
            tripId: this.props.tripId,
            poi: poi.fields
        })
        .then(() => {            
            this.props.selectedPois(poi); 
        })
        
    }
    
    render() {
        let defaultImg = defaultSvg;
        if (this.state.data && this.state.data.image_url) {
            defaultImg = this.state.data.image_url;
        }

        // https://imgur.com/a/r89Zfjk
        const rateMapping = {
            1: 'https://i.imgur.com/188xWM4.png',
            1.5: 'https://i.imgur.com/188xWM4.png',
            2: 'https://i.imgur.com/0ju9JrY.png',
            2.5: 'https://i.imgur.com/c2tN4zA.png',
            3: 'https://i.imgur.com/mB5jFJj.png',
            3.5: 'https://i.imgur.com/qr6e6IJ.png',
            4: 'https://i.imgur.com/fU6ZjD9.png',
            4.5: 'https://i.imgur.com/FoKELFt.png',
            5: 'https://i.imgur.com/8JscCtn.png'
        }
        return (
          <div>
            <div className="poi-item">
              <h3>{this.props.name}</h3>
              <img className='poi-pic' src={defaultImg}></img>
              {this.state.data && (
                        <div>{rateMapping[this.state.data.rating] || <img src="https://i.imgur.com/k0udNsq.png"></img>}</div>
              )}
              <button onClick={this.handleAddToTrip.bind(this, this.props.poi)}>Add to trip</button>
            </div>            
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    tripId: ownProps.match.params.tripId,
    poi: ownProps.poi,
    key: ownProps.key,
    name: ownProps.name,
    city: ownProps.city,
    selectedPois: ownProps.selectedPois
});

const mapDispatchToProps = dispatch => ({
    addPoiToTrip: (poi) => dispatch(addPoiToTrip(poi))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PoiContainer));



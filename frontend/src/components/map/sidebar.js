import React, { Component } from 'react';
import Poi from './poi'
import TripShowDetail from '../trip/trip_show_detail';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        
        this.handleAddPoiToTrip = this.handleAddPoiToTrip.bind(this);
        this.state = {
            tripPois: []
        }        
    }

    handleAddPoiToTrip(poi) {                
        this.setState({
            tripPois: this.state.tripPois.concat(poi) 
        })        
    }

    render() {
        const sidebarStyle = {
            backgroundColor: 'white'
        }

        return (
          <div style={sidebarStyle}>
            <TripShowDetail pois={this.state.tripPois} />
            {this.props.pointsOfInterest.map((pt, i) => (
              <Poi
                poi={pt}
                key={i}
                name={pt.name}
                city={pt.fields.city}
                selectedPois={this.handleAddPoiToTrip}
              />
            ))}
          </div>
        );
    }
}

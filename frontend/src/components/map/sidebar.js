import React, { Component } from 'react';
import PoiContainer from './poi_container'
import TripShowDetail from '../trip/trip_show_detail';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        
        this.handleAddPoiToTrip = this.handleAddPoiToTrip.bind(this);
        this.state = {
            selectedPois: []
        }        
    }

    handleAddPoiToTrip(poi) {                
        this.setState({
            selectedPois: this.state.selectedPois.concat(poi) 
        })        
    }

    render() {
        const sidebarStyle = {
            backgroundColor: 'white'
        }

        return (
          <div style={sidebarStyle}>
            <TripShowDetail selectedPois={this.state.selectedPois} />
            {this.props.pointsOfInterest.map((pt, i) => (
              <PoiContainer
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

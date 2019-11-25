import React, { Component } from 'react';
import PoiContainer from './poi_container'
import './sidebar.css'
import TripShowDetailContainer from '../trip/trip_show_detail_container';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        
        this.handleAddPoiToTrip = this.handleAddPoiToTrip.bind(this);
        this.state = {
            selectedPois: []
        }        
    }

    // This function accept the new POI send from POI container component
    handleAddPoiToTrip(poi) {                
        this.setState({
            selectedPois: this.state.selectedPois.concat(poi) 
        })        
    }

    render() {
        const sidebarStyle = {
            backgroundColor: 'white'
        }

        let component;

        if (this.props.pointsOfInterest.length === 0) {
            component = ""; 
        } else {
            component = this.props.pointsOfInterest.map((pt, i) => (
              <PoiContainer
                poi={pt}
                key={i}
                name={pt.name}
                city={pt.fields.city}
                selectedPois={this.handleAddPoiToTrip}
              />
            ));
        }

        return (
          <div className='trip-detail-container' style={sidebarStyle}>
            <div className='poi-container'>
              {component}
            </div>
            <div className='trip-show-container'>
                <TripShowDetailContainer selectedPois={this.state.selectedPois} />  
            </div>
          </div>
        );
    }
}

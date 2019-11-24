import React, { Component } from 'react'

class TripShowDetail extends Component {
  constructor(props) {
    super(props);       
  }

  componentDidMount() {        
      this.props.fetchTrip(this.props.tripId);          
  }

  componentDidUpdate(prevProps) {    
    if (this.props.selectedPois !== prevProps.selectedPois) {
      this.props.fetchTrip(this.props.tripId);      
    }
  }

  render() {
    
    if (this.props.trip === undefined) return null;

    const { name, origin, destination, pois } = this.props.trip;

    return (
      <div className="trip-show-detail">
        <h3>Trip Detail</h3>
        <h4>{name}</h4>
        {pois === undefined ? null : pois.map((poi, i) => {                    
              return (
                <div key={poi.id} className="poi">
                  <div>
                    <strong>{poi.name}</strong>
                  </div>
                  <div>{poi.phone}</div>
                  <div>{poi.address}</div>
                  <div>{poi.city}</div>
                  <div>
                    {poi.state}, {poi.postal_code}
                  </div>
                  <div>{poi.country}</div>
                </div>
              );
            })}
      </div>
    );
  }
}

export default TripShowDetail;

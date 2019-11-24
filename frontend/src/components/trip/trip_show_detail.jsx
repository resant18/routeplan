import React, { Component } from 'react'

class TripShowDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {...props};
    }

    componentDidMount() {
        
        if (this.props.trip === undefined ) {
            this.props.fetchTrip(this.props.tripId)
        }
    }

    render() {                
        

        if (this.props.trip === undefined ) return null;
        const { name, origin, destination, pois } = this.props.trip;
        const { selectedPois } = this.props;
        const arrPois = pois === undefined ? [] : pois;
        const poiList = arrPois.concat(selectedPois);

        
          
        return (
          <div className="trip-show-detail">
            <h3>Trip Detail</h3>
            <h4>{name}</h4>
            {poiList.length === 0 ? "" : poiList.map((poi, i) => {
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

import React, { Component } from 'react'

class TripShowDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {...props};
    }

    componentDidMount() {
        // this.props.fetchTrip(this.props.tripId)
    }

    render() {                
        // const { name } = this.props.trips.selected;  
        
        console.log(this.props.pois);   
          
        return (
            <div className="trip-show-detail">
                <h3>Trip Detail</h3>
                <strong>Trip Name here</strong>
                {
                    this.props.pois.map( (poi, i) => 
                        <div key={i}>{poi.name}</div>
                    )
                }        
            </div>
        )
    }
}

export default TripShowDetail;

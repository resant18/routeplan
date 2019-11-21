import React, { Component } from 'react'

export default class Poi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addedToTrip: false
        }
    }

    render() {
        return (
            <div className="poi">
            <h3>{this.props.name}</h3>
            <button>Add to trip</button>
            </div>
        )
    }
}
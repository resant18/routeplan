import React, { Component } from 'react';
import Poi from './poi'
const axios = require('axios');
var qs = require('qs');

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className="col-right">
                {this.props.pointsOfInterest.map((pt, i) => {
                    return (<Poi name={pt.name}/>)
                })}
            </div>
        )
    }
}

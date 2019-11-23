import React, { Component } from 'react'

export default class CurrTripItem extends Component {
    render() {
        return (
            <div>
                <div>POI name</div>
                <div>POI img</div>
                <div>POI rating</div>
                <form>
                    <button>trash</button>
                </form>
            </div>
        )
    }
}

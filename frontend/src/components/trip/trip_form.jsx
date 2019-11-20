import React from "react";
import PlaceSearchBar from '../place_search/place_search_bar';

class TripForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      origin: [],
      destination: []
    };

    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChangeOrigin(pos) {    
    this.setState({origin: Object.values(pos)});
  }

  handleChangeDestination(pos) {    
    this.setState({destination: Object.values(pos)});
  }

  handleInput(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let trip = Object.assign({}, this.state);    
    this.props.createTrip(trip)
      .then(() => this.props.history.push('/trip'));      
  }

  renderErrors() {
      
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <PlaceSearchBar 
              key="origin" 
              placeholder="Start point"
              input={this.handleChangeOrigin} />
          </div>
          <div>
            <PlaceSearchBar
              key="destination"
              placeholder="End point"
              input={this.handleChangeDestination}
            />
          </div>
          <div>
            <input type="text" placeholder="Trip name" onChange={this.handleInput} />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default TripForm;

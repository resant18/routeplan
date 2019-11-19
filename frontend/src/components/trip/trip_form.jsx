import React from "react";
import PlaceSearchBar from '../place_search/place_search_bar';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: {},
      destination: {}
    };

    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {}

  componentWillReceiveProps(newState) {}

  handleChangeOrigin(pos) {    
    this.setState({origin: pos});
  }

  handleChangeDestination(pos) {    
    this.setState({destination: pos});
  }

  renderErrors() {
      
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <PlaceSearchBar 
            key="origin" 
            input={this.handleChangeOrigin} />

          <PlaceSearchBar
            key="destination"
            input={this.handleChangeDestination}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Profile;

import React from "react";
import TripFormContainer from '../trip/trip_form_container';

class MainPage extends React.Component {
  render() {
    let component;
    if (this.props.loggedIn)
      component = <TripFormContainer />
    else 
      component = "Trip Index here"
    return (
      <div>          
        {component} 
        
        <footer>Copyright Alfredo - Lance - Renata - Timothy</footer>
      </div>
    );
  }
}

export default MainPage;

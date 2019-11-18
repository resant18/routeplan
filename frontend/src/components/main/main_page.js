import React from "react";
import TripContainer from '../../components/trips/trip_container';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <TripContainer />        
        <footer>Copyright Alfredo - Lance - Renata - Timothy</footer>
      </div>
    );
  }
}

export default MainPage;

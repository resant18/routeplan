import React from 'react';
import TripIndexContainer from '../trip/trip_index_container';
import "./main_page.css";

class MainPage extends React.Component {  
  render() {            
    let component = <TripIndexContainer />
    
    return (
      <div>
        <main>{component}</main>
        <footer>Copyright Alfredo - Lance - Renata - Timothy</footer>
      </div>
    );
  }
}

export default MainPage;

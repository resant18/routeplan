import React from "react";
import MainPageItem from './main_page_item';
import "./main_page.css";

class MainPage extends React.Component {
  componentDidMount() {
    this.props.fetchTrips();
  }

  render() {        
    let component;
    if (this.props.trips === undefined) {
      return null;
    }
    else {
      component = (
           <div className="trips-container">
             <div className="trips-index">
               <div className="trips-list">
                 {this.props.trips.map((trip, idx) => {
                   return <MainPageItem trip={trip} key={idx} />;
                 })}
               </div>               
             </div>
           </div>
         );
    }

    return (
      <div>
        <main>{component}</main>
        <footer>Copyright Alfredo - Lance - Renata - Timothy</footer>
      </div>
    );
  }
}

export default MainPage;

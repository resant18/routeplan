import React from "react";
import MainPageItem from './main_page_item';
import "./main_page.css";

class MainPage extends React.Component {
  componentDidMount() {
    this.props.fetchTrips();
  }

  render() {
    if (this.props.trips === undefined) {
      return null;
    }

    return (
      <div className="trips-container">
        <div className="trips-index">
          <div className="trips-list">
            {this.props.trips.map((trip, idx) => {
              return <MainPageItem trip={trip} key={idx} />;
            })}
          </div>
          <footer>Copyright Alfredo - Lance - Renata - Timothy</footer>
        </div>
      </div>
    );
  }
}

export default MainPage;

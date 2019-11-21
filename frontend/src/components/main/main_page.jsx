import React from "react";
import MainPageItem from './main_page_item';

class MainPage extends React.Component {
  componentDidMount() {
    this.props.fetchTrips();
  }

  render() {
    if (this.props.trips === undefined) {
      return null;
    }

    return (
      <div> 
        {this.props.trips.map((trip, idx) => {
          return <MainPageItem trip={trip} key={idx} />;
        })}
        <footer>Copyright Alfredo - Lance - Renata - Timothy</footer>
      </div>
    );
  }
}

export default MainPage;

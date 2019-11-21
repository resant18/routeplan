import { connect } from "react-redux";
import TripShow from "./trip_show";


const mapStateToProps = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    // location: state.trips,
    // origin: state.trips.new.origin || [],
    // destination: state.trips.new.destination || []

    origin: state.trips.new === undefined ? [] : state.trips.new.origin,
    destination: state.trips.new === undefined ? [] : state.trips.new.destination
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//   };
// };

export default connect(mapStateToProps, null)(TripShow);

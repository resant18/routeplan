import { connect } from "react-redux";
import { fetchTrips, destroyTrip } from "../../actions/trip_actions";
import TripIndex from "../trip/trip_index";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  trips: Object.values(state.trips.all) || []
});

const mapDispatchToProps = dispatch => ({
  fetchTrips: () => dispatch(fetchTrips()),
  destroyTrip: dataId => dispatch(destroyTrip(dataId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripIndex);

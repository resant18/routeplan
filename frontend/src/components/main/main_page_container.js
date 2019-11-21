import { connect } from "react-redux";
import { fetchTrips } from "../../actions/trip_actions";
import MainPage from "./main_page";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  trips: Object.values(state.trips.all)
});

const mapDispatchToProps = dispatch => ({
  fetchTrips: () => dispatch(fetchTrips()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

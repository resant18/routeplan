import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchTrip } from "../../actions/trip_actions";
import TripShowDetail from "./trip_show_detail";
import { removePoiFromTrip } from "../../actions/poi_actions";

const mapStateToProps = (state, ownProps) => {
  let tripId = ownProps.match.params.tripId;
  const trip = state.trips.selected;

  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    tripId,
    trip
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrip: tripId => dispatch(fetchTrip(tripId)),
    removePoiFromTrip: poi => dispatch(removePoiFromTrip(poi))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TripShowDetail)
);

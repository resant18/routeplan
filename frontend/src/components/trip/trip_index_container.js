import { connect } from "react-redux";
import { fetchTrips, fetchUserTrips, destroyTrip } from "../../actions/trip_actions";
import TripIndex from "../trip/trip_index";

const mapStateToProps = (state, ownProps) => {
   return {
      loggedIn: state.session.isAuthenticated,      
      userId: (ownProps.match && ownProps.match.params.userId) || null,
      trips:
         ownProps.match && ownProps.match.params.userId
            ? Object.values(state.trips.user)
            : Object.values(state.trips.all),
   };
};

const mapDispatchToProps = dispatch => ({
  fetchTrips: () => dispatch(fetchTrips()),
  fetchUserTrips: userId => fetchUserTrips(userId),
  destroyTrip: dataId => dispatch(destroyTrip(dataId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripIndex);

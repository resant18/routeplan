import { connect } from "react-redux";
import { showModal } from "../../actions/modal_actions";
import { fetchTrips, fetchUserTrips, destroyTrip } from "../../actions/trip_actions";
import TripIndex from "../trip/trip_index";

const mapStateToProps = (state, ownProps) => {   
   return {
      loggedIn: state.session.isAuthenticated,      
      userId: (ownProps.match && ownProps.match.params.userId) || null,
      trips:
         ownProps.match && ownProps.match.params.userId
            ? Object.values(state.trips.user)
            : [],
   };
};

const mapDispatchToProps = dispatch => ({
  fetchTrips: () => dispatch(fetchTrips()),
  fetchUserTrips: (userId, page) => dispatch(fetchUserTrips(userId, page)),
  destroyTrip: dataId => dispatch(destroyTrip(dataId)),
  showModal: modal => dispatch(showModal(modal)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(TripIndex);

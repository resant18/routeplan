import { connect } from 'react-redux';
import { fetchTrip } from '../../actions/trip_actions';
import TripShow from './trip_show';


const mapStateToProps = (state, ownProps) => {  
  let origin, destination;
  let tripId = ownProps.match.params.tripId;
  
  if (state.trips.selected) {
    origin = state.trips.selected.origin;
    destination = state.trips.selected.destination;    
  } else {
    origin = [];
    destination = [];    
  }

  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    tripId,
    origin,
    destination
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrip: tripId => dispatch(fetchTrip(tripId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripShow);

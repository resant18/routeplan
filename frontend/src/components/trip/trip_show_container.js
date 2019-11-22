import { connect } from 'react-redux';
import { fetchTrip } from '../../actions/trip_actions';
import TripShow from './trip_show';


const mapStateToProps = (state, ownProps) => {  
  let origin, destination;
  let tripId = ownProps.match.params.tripId;
  let locationFrom;
  if (tripId) {
    origin = (state.trips.show === undefined ? [] : state.trips.show.origin);
    destination = (state.trips.show === undefined ? [] : state.trips.show.destination);    
    locationFrom = 'show';
  } else {
    origin = (state.trips.new === undefined ? [] : state.trips.new.origin);
    destination = (state.trips.new === undefined ? [] : state.trips.new.destination);    
    tripId = (state.trips.new === undefined ? [] : state.trips.new._id);
    locationFrom = "new";
  }

  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    tripId,
    origin,
    destination,
    locationFrom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrip: tripId => dispatch(fetchTrip(tripId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripShow);

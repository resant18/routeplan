import { connect } from "react-redux";
import { createTrip } from "../../actions/trip_actions";
import TripForm from "./trip_form";

const mapStateToProps = state => {
  return {
    currentUser: state.session.user,
    newTrip: state.trips.new
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTrip: data => dispatch(createTrip(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripForm);

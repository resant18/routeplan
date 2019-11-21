import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TripForm));

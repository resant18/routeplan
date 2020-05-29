import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { editTrip } from "../../actions/trip_actions";
import { hideModal } from "../../actions/modal_actions";
import TripForm from "./trip_form";

const mapStateToProps = state => {
  return {
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editTrip: data => dispatch(editTrip(data)),
    hideModal: () => dispatch(hideModal())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TripForm)
);

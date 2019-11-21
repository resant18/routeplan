import { connect } from "react-redux";
import MainPage from "./main_page";
import { fetchTrips } from "../../actions/trip_actions";
// import { openModal } from "../../actions/modal_actions";

const mSTP = state => {
    return {
      trips: Object.values(state.trips.all)
    };
};

const mDTP = dispatch => ({
  fetchTrips: () => dispatch(fetchTrips()),
//   openModal: modal => dispatch(openModal(modal))
});

export default connect(mSTP, mDTP)(MainPage);

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { showModal, hideModal } from "../../actions/modal_actions";
import NavBar from "./navbar";

const mapStateToProps = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  showModal: modal => dispatch(showModal(modal)),
  hideModal: () => dispatch(hideModal)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

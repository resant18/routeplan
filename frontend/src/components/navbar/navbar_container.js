import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { showModal, hideModal } from '../../actions/modal_actions';
import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout),
  showModal: modal => dispatch(showModal(modal)),
  hideModal: () => dispatch(hideModal)
});


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

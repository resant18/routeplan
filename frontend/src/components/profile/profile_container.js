import { connect } from "react-redux";
import Profile from "./profile";
import { requireUser } from "../../actions/user_actions";

const mapStateToProps = state => {
  return {
    users: state.users,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requireUser: userId => dispatch(requireUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

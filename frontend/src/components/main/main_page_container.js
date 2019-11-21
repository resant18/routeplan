import { connect } from "react-redux";

import MainPage from "./main_page";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(mapStateToProps, null)(MainPage);

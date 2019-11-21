import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import Modal from './modal/modal';

import TripShowContainer from './trip/trip_show_container'
import MainPageContainer from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
// import ProfileContainer from './profile/profile_container';

const App = () => (
  <div>
    <NavBarContainer />
    <Modal />
    
    <Switch>
      <Route exact path="/" component={MainPageContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/trip" component={TripShowContainer} />
    </Switch>    
  </div>
);

export default App;

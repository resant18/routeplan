import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NavBarContainer from './navbar/navbar_container';
import Modal from './modal/modal';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import TripShowContainer from './trip/trip_show_container';
import ProfileContainer from './profile/profile_container';


const App = () => (
  <div className="main">
    <NavBarContainer />
    
    <Modal />

    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/trip" component={TripShowContainer} />
      <ProtectedRoute exact path="/trips/:tripId" component={TripShowContainer} />
      <ProtectedRoute exact path="/users/:userId" component={ProfileContainer} />
      <Route exact path="/" component={MainPage} />
    </Switch>
    <footer>Copyright Alfredo - Lance - Renata - Timothy</footer>
  </div>
);

export default App;

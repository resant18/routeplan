import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import MapQuest from './map/map_quest';

import Trip from './trip/trip_form';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
// import ProfileContainer from './profile/profile_container';

const App = () => (
  <div>
    <NavBarContainer />

    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/trip" component={Trip} />

      {/* <ProtectedRoute exact path='/tweets' component={TweetsContainer} />
      <ProtectedRoute exact path='/profile' component={ProfileContainer} />
      <ProtectedRoute
        exact
        path='/new_tweet'
        component={TweetComposeContainer}
      /> */}
    </Switch>
    <MapQuest
      center={[37.7749, -122.4194]} 
      baseLayer={"map"}
      zoom={12}
      routeStart={[37.798634, -122.408355]}
      routeEnd={[37.799064, -122.401156]}
      apiKey={"GtJj838k2uUMChaJbStq3F7qM0WobjXf"}
      />

  </div>
);

export default App;

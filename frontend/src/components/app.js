import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import MapQuest from './map/map_quest';

import Trip from './trips/trip';
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
      height={500}
      width={1000}
      center={[37.7749, -122.4194]}
      baseLayer={"dark"}
      zoom={12}
      apiKey={"GtJj838k2uUMChaJbStq3F7qM0WobjXf"}
    />
  </div>
);

export default App;

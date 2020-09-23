import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBarContainer from "./navbar/navbar_container";
import Modal from "./modal/modal";
import MainPageContainer from "./main/main_page_container";
import TripIndexContainer from "./trip/trip_index_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import TripShowContainer from "./trip/trip_show_container";
import ProfileContainer from "./profile/profile_container";
import "./app.css";
import "./responsive.css";
import renataAvatar from '../assets/profile/renata.png';
import timAvatar from "../assets/profile/tim.png";
import lanceAvatar from "../assets/profile/lance.png";
import alfredoAvatar from "../assets/profile/alfredo.png";

const App = () => (
   <div className='content'>
      <NavBarContainer />

      <Modal />
      <Switch>
         <AuthRoute exact path='/login' component={LoginFormContainer} />
         <AuthRoute exact path='/signup' component={SignupFormContainer} />
         <ProtectedRoute exact path='/trip' component={TripShowContainer} />
         <ProtectedRoute exact path='/trips/user/:userId' component={TripIndexContainer} />
         <ProtectedRoute exact path='/trips/:tripId' component={TripShowContainer} />
         <ProtectedRoute exact path='/users/:userId' component={ProfileContainer} />
         <Route exact path='/' component={MainPageContainer} />
      </Switch>
      <footer>
         <div>
            <span>Copyright</span>
            <a href=''>
               <img className='avatar' src={alfredoAvatar} alt='Alfredo' />
            </a>
            <a href=''>
               <img className='avatar' src={lanceAvatar} alt='Lance' />
            </a>
            <a href='https://github.com/resant18' target='_blank'>
               <img className='avatar' src={renataAvatar} alt='Renata' />
            </a>
            <a href=''>
               <img className='avatar' src={timAvatar} alt='Tim' />
            </a>
            <span>Image Credit</span>
         </div>
      </footer>
   </div>
);

export default App;

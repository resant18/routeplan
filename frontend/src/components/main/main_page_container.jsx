import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import "./main_page.css";
import walkImage from '../../assets/walk.jpg';

const MainPage = (props) => (
   <main className='landing'>
      <div className='landing-text'>
         <h1>
            Stress Less.
            <br />
            Travel More.
         </h1>
         <p className='desc'>
            Plan your route so you spend less time wandering around and more time doing.             
            Walk Route planner will helps you find the fastest itinerary along with multiple stops. 
            Find amazing places, and take fascinating detours for your route with the world's #1 road trip planning platform.
         </p>
         <div>  
            {
               props.loggedIn ? 
               (
                  <Link className='btn get-started' to={`/trips/user/${props.currentUser.id}`} >View My Trips</Link>
               )
               :
               (
                  <Link className='btn get-started' to={"/signup"}>Get Started</Link>

               )
            }            
         </div>
      </div>
      <div className='landing-image'>
         <img src={walkImage} alt='Walk image' width='100%' />
      </div>
   </main>
);

const mapStateToProps = (state) => {
   return {
      loggedIn: state.session.isAuthenticated,
      currentUser: state.session.user
   };
};

export default connect(mapStateToProps, null)(MainPage);

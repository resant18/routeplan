import React from "react";
import TripItem from "./trip_item";
import { Link } from "react-router-dom";
import bgImage from "../../assets/bg_map.jpg";

export default class TripIndex extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         trips: this.props.trips || [],
         isTripsFetched: false,
         page: 1,
         showLoadingMore: true
      };

      this.loadMore = this.loadMore.bind(this);
      this.showModal = this.showModal.bind(this);          
   }

   async loadMore() {         
      this.fetchItems();
   }

   fetchItems() {      
      this.props.fetchUserTrips(this.props.userId, this.state.page).then((res) => {                  
         if (res) {
            if (res.trips.data.length > 0) {
               this.setState((prevState) => ({
                  trips: prevState.trips.concat(res.trips.data),
                  page: prevState.page + 1,
                  isTripsFetched: true,
                  showLoadingMore: true
               }));         
            }
            else {
               this.setState({
                  isTripsFetched: true,
                  showLoadingMore: false
               });
            }
         }
      });      
   }

   componentDidMount() {       
      if (this.props.userId) this.fetchItems();
   }

   showModal() {      
      this.props.showModal("trip-form");
   }

   render() {            
      if (!this.state.isTripsFetched) return null;

      if (this.state.trips.length === 0) return (
         <main className='user_trips'>
            <div className='no-trips'>
               <h3>You have not save any route plan yet.</h3>
               <button onClick={this.showModal}>Let's make one!</button>               
            </div>
         </main>
      );

      return (
         <main className='user_trips'>
            <div className='trips-container'>
               <div className='trips-index'>
                  <div className='trips-list'>
                     {this.state.trips.map((trip, idx) => (
                        <TripItem
                           loggedIn={this.props.loggedIn}
                           creatorId={trip.user}
                           destroyTrip={this.props.destroyTrip}
                           editTrip={this.props.editTrip}
                           trip={trip}
                           key={idx}
                        />
                     ))}
                  </div>
                  {this.state.trips.length > 0 && this.state.showLoadingMore && (
                     <div>
                        <button id="load-btn" onClick={this.loadMore} className='load btn'>
                           Load More
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </main>
      );
   }
}

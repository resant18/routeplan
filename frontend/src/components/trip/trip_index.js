import React from "react";
import TripItem from "./trip_item";
import bgImage from "../../assets/bg_map.jpg";

export default class TripIndex extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         trips: [],
         page: 1,
         showLoadingMore: true
      };

      this.loadMore = this.loadMore.bind(this);
   }

   async loadMore() {         
      this.fetchItems();
   }

   fetchItems() {      
      this.props.fetchUserTrips(this.props.userId, this.state.page).then((res) => {                  
         if (res) {
            if (res.trips.data.length > 0) {
               this.setState({
                  trips: this.state.trips.concat(res.trips.data),
                  page: this.state.page + 1,
                  showLoadingMore: true
               });         
            }
            else {
               this.setState({
                  showLoadingMore: false
               })
            }
         }
      });      
   }

   componentDidMount() {
      if (this.props.userId) {
         this.fetchItems();
      } else {
         this.props.fetchTrips();
      }
   }

   render() {          
      if (this.state.trips === []) return null;

      return (
         <main>
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

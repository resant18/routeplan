import React from "react";
import PlaceSearchBar from '../place_search/place_search_bar';

class TripForm extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         name: "",
         error: null,         
         origin: {},
         destination: {},
      };

      this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
      this.handleChangeDestination = this.handleChangeDestination.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChangeOrigin(origin) {   
      this.setState({origin: origin});      
   }

   handleChangeDestination(destination) {   
      this.setState({destination: destination});      
   }

   handleInput(e) {
      this.setState({
         name: e.target.value,
      });
   }

   handleSubmit(e) {
      e.preventDefault();

      let trip = Object.assign({}, this.state);
      this.props
         .createTrip(trip)
         .then((trip) => trip.trip.data._id)
         .then((tripId) => this.props.history.push(`/trips/${tripId}`))
         .then(this.props.hideModal)
         .catch((err) => {
            this.setState({
               err,
            });
         });
   }

   render() {
      return (
         <div>
            <div>
               <span className='form-label'>Trip Plan</span>
            </div>
            <form onSubmit={this.handleSubmit} id='place-search-form'>
               <div>
                  <PlaceSearchBar key='origin' placeholder='Start point' input={this.handleChangeOrigin} />
               </div>
               <div>
                  <PlaceSearchBar key='destination' placeholder='End point' input={this.handleChangeDestination} />
               </div>
               <div>
                  <input className='form-input' type='text' placeholder='Trip name' onChange={this.handleInput} />
               </div>
               <div className='form-button'>
                  <input className='btn' type='submit' value='Submit' />
                  <input className='btn' type='button' value='Cancel' onClick={this.props.hideModal} />
               </div>
            </form>
         </div>
      );
   }
}

export default TripForm;

import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./trip.css";

const deleteIcon = require('../../assets/trash-32.png');

class TripItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         onHovered: false,
      };      
   }

   handleHover(hoverState) {
      this.setState({ onHovered: hoverState });
   }

   handleDelete(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.props.loggedIn) {
         this.props.destroyTrip(this.props.trip._id);
      } else {
         this.props.history.push("/login");
      }
   }

   handleViewDetails(id, e) {     
     e.stopPropagation();
     e.preventDefault();     
    this.props.history.push(`/trips/${id}`);     
   }

   render() {
      const { _id, name } = this.props.trip;      
      
      return (
         <div
            className={`trip-container card fade-in ${this.state.onHovered ? "active" : ""}`}
            onMouseEnter={this.handleHover.bind(this, true)}
            onMouseLeave={this.handleHover.bind(this, false)}
         >
            <Link to={`/trips/${_id}`} className='item-link'>
               <div className='item-container face face1'>
                  <div className='content'>
                     <h3 className='t-title'>{name}</h3>
                  </div>
               </div>
               <div className='face face2'>
                  <div className='content'>
                     <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis
                        provident at.
                     </p>
                     <div className='action'>
                        {                           
                         (this.props.creatorId === this.props.loggedUserId) &&
                          <button onClick={this.handleDelete.bind(this)} className='btn'>
                            Delete
                          </button>
                        }
                        <button onClick={this.handleViewDetails.bind(this, _id)} className='btn'>
                           View Details
                        </button>
                     </div>
                  </div>
               </div>
            </Link>
         </div>
      );
   }
}

export default withRouter(TripItem);

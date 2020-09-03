// poi_container.js => npm i react-modal
import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addPoiToTrip } from "../../actions/poi_actions";
import "./poi.css";
import defaultSvg from "../../assets/default-place.svg";
import restaurantIcon from "../../assets/icons/icons8-restaurant.png";
import museumIcon from "../../assets/icons/icons8-museum.png";
import parkIcon from "../../assets/icons/icons8-park.png";
import bookIcon from "../../assets/icons/icons8-book.png";
import barIcon from "../../assets/icons/icons8-bar.png";
import atmIcon from "../../assets/icons/icons8-atm.png";
import bakeryIcon from "../../assets/icons/icons8-bakery.png";

const axios = require("axios");
const qs = require("qs");
const API_KEY = require("../../config/api_keys");

const icons = {
   "Restaurants": restaurantIcon,
   "Museums": museumIcon,
   "Parks": parkIcon,
   "Books": bookIcon,
   "Bars": barIcon,
   "ATMs": atmIcon,
   "Bakeries": bakeryIcon
}

class PoiContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [],
         selectedPois: [],
         showModal: false,
         showPoiDetail: false,
      };
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handleTogglePoiDetail = this.handleTogglePoiDetail.bind(this);
   }

   handleOpenModal() {
      this.yelpCall();
      this.setState({ showModal: true });
   }

   handleCloseModal() {
      this.setState({ showModal: false });
   }

   yelpCall() {
      const apiKey = API_KEY.YELP_KEY;
      // Place holder for Yelp Fusion's API Key. Grab them
      // from https://www.yelp.com/developers/v3/manage_app
      let name = this.props.name;
      if (name.split(" ").length > 2) {
         name = name.split(" ").slice(0, 2).join(" ");
      }

      axios
         .get(
            `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${
               this.props.city
            }`,
            {
               headers: {
                  Authorization: `Bearer ${apiKey}`,
                  accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "X-Requested-With": "XMLHttpRequest",
               },
               params: {
                  term: name,
               },
               paramsSerializer: (params) => {
                  return qs.stringify(params);
               },
            }
         )
         .then((res) => {            
            this.setState({ data: res.data.businesses[0] });
         })
         .catch((err) => {
            //console.log(err)
         });
   }

   ratingPic() {
      // https://imgur.com/a/r89Zfjk
      const rateMapping = {
         1: "https://i.imgur.com/APOFtVe.png",
         1.5: "https://i.imgur.com/MluSqV6.png",
         2: "https://i.imgur.com/njznajS.png",
         2.5: "https://i.imgur.com/Fe66UB8.png",
         3: "https://i.imgur.com/W40BlGO.png",
         3.5: "https://i.imgur.com/3bdhkhV.png",
         4: "https://i.imgur.com/wEnzfos.png",
         4.5: "https://i.imgur.com/YsW2hsg.png",
         5: "https://i.imgur.com/w66Vcol.png",
      };

      if (this.state.data && this.state.data.rating) {
         return rateMapping[this.state.data.rating];
      }
      return "https://i.imgur.com/T7Rlhll.png";
   }

   // This function pass selected POI up to Sidebar component
   handleAddToTrip(poi) {
      this.props
         .addPoiToTrip({
            tripId: this.props.tripId,
            poi: poi.fields,
         })
         .then(() => {
            this.props.selectedPois(poi);
         });
   }

   handleTogglePoiDetail(e) {
      e.stopPropagation();
      this.setState({ ...this.state, showPoiDetail: !this.state.showPoiDetail });
   }  

   render() {
      let defaultImg = defaultSvg;
      if (this.state.data && this.state.data.image_url) {
         defaultImg = this.state.data.image_url;
      }      

      // https://imgur.com/a/r89Zfjk
      return (
         <div>
            <div className='poi-item' aria-label='Click for more info' onClick={this.handleOpenModal}>
               <div className='poi-header' onClick={this.handleTogglePoiDetail}>
                  <div className='poi-category-icon'>
                     <img src={icons[`${this.props.selectedPoiCategoryIcon}`]} alt='icon' width='12' height='12' />
                  </div>
                  <div className='poi-name' style={{ fontWeight: this.state.showPoiDetail ? "700" : "400" }}>
                     {this.props.name}
                  </div>
               </div>
               {this.state.showPoiDetail && (
                  <div>
                     <p>
                        {`${this.props.poi.fields.address}, ${this.props.city}`}
                        <br></br>
                        <i>Click for more info</i>
                     </p>
                     <button onClick={this.handleAddToTrip.bind(this, this.props.poi)}>Add to trip</button>
                  </div>
               )}
            </div>

            <ReactModal
               isOpen={this.state.showModal}
               contentLabel='POI info'
               onRequestClose={this.handleCloseModal}
               shouldCloseOnOverlayClick={true}
               overlayClassName='popover'
               className='modal_content'
               ariaHideApp={false}
            >
               <div
                  style={{
                     display: "flex",
                     alignItems: "center",
                     flexDirection: "column",
                     margin: "10px",
                  }}
               >
                  <h3>{this.props.name}</h3>
                  <p style={{ textAlign: "center" }}>
                     {`${this.props.poi.fields.address}, ${this.props.city}`}
                     <br></br>
                     {this.state.data && this.state.data.display_phone}
                  </p>
                  {this.state.data && (
                     <a href={this.state.data.url} target='_blank' rel='noopener noreferrer'>
                        Yelp Page
                     </a>
                  )}
                  {!this.state.data && (
                     <span>
                        <strong>Yelp page not found</strong>
                     </span>
                  )}
                  <br></br>
                  <img className='poi-pic' src={defaultImg} alt={this.props.name}></img>
                  <img src={this.ratingPic()} alt='rating'></img>
               </div>
            </ReactModal>
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => ({
  tripId: ownProps.match.params.tripId,
  poi: ownProps.poi,
  key: ownProps.key,
  name: ownProps.name,
  city: ownProps.city,
  address: ownProps.address,
  selectedPois: ownProps.selectedPois
});

const mapDispatchToProps = dispatch => ({
  addPoiToTrip: poi => dispatch(addPoiToTrip(poi))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PoiContainer)
);

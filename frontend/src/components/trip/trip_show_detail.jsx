import React, { Component } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";
import "./trip.css";
import gmarker from "../../assets/marker-green.png";
import rmarker from "../../assets/marker-red.png";

class TripShowDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrip(this.props.tripId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedPois !== prevProps.selectedPois) {
      this.props.fetchTrip(this.props.tripId);
    }
  }

  render() {
    if (this.props.trip === undefined) return null;

    const { name, origin, destination, pois } = this.props.trip;

    const shareUrl = window.location.href;

    return (
       <div className='trip-show-detail' style={{ paddingLeft: "15px" }}>
          <div className='share-container' style={{ display: "flex" }}>
             <h3>Share your trip!</h3>
             <div className='btn-container'>
                <TwitterShareButton className='share-btn' url={shareUrl}>
                   <TwitterIcon style={{ cursor: "pointer" }} size={32} round />
                </TwitterShareButton>
                <FacebookShareButton className='share-btn' url={shareUrl}>
                   <FacebookIcon style={{ cursor: "pointer" }} size={32} round />
                </FacebookShareButton>
                <EmailShareButton className='share-btn' url={shareUrl}>
                   <EmailIcon style={{ cursor: "pointer" }} size={32} round />
                </EmailShareButton>
             </div>
          </div>
          <br />
          <hr />
          <br />
          <h3>My Trip</h3>
          <h4>{name}</h4>
          <div className='place-label'>
             <img src={gmarker} alt='Origin' />
          </div>
          <div className='place-name'>{origin.name}</div>
          <div className='place-detail'>{origin.detail.replace(origin.name + ", ", "")}</div>
          <div className='place-label'>
             <img src={rmarker} alt='Destination' />
          </div>
          <div className='place-name'>{destination.name}</div>
          <div className='place-detail'>{destination.detail.replace(destination.detail, "")}</div>
          {pois === undefined
             ? null
             : pois.map((poi, i) => {
                  return (
                     <div key={poi.name} className='poi'>
                        <div>
                           <strong>{poi.name}</strong>
                        </div>
                        <div>{poi.phone}</div>
                        <div>{poi.address}</div>
                        <div>{poi.city}</div>
                        <div>
                           {poi.state}, {poi.postal_code}
                        </div>
                        <div>{poi.country}</div>
                     </div>
                  );
               })}
       </div>
    );
  }
}

export default TripShowDetail;

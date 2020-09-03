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
import shareIcon from "../../assets/icons/icons8-share.png";

class TripShowDetail extends Component {
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
          {/* <div className='share-container' style={{ display: "flex" }}>
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
          <br /> */}
          <div className='my-trip-header'>
             <div className='my-trip-label'>
                <h3>My Trip</h3>
             </div>
             <div className='my-trip-share'>
                <nav className='menu'>
                   <input type='checkbox' href='#' className='menu-open' name='menu-open' id='menu-open' />
                   <label className='menu-open-button' htmlFor='menu-open'>
                      <img src={shareIcon} alt='Share Trip' />
                   </label>
                   <TwitterShareButton className='menu-item share-btn' url={shareUrl}>
                      <TwitterIcon style={{ cursor: "pointer" }} size={32} round />
                   </TwitterShareButton>{" "}
                   <FacebookShareButton className='menu-item share-btn' url={shareUrl}>
                      <FacebookIcon style={{ cursor: "pointer" }} size={32} round />
                   </FacebookShareButton>
                   <EmailShareButton className='menu-item share-btn' url={shareUrl}>
                      <EmailIcon style={{ cursor: "pointer" }} size={32} round />
                   </EmailShareButton>
                </nav>

                <svg xmlns='http://www.w3.org/2000/svg' version='1.1'>
                   <defs>
                      <filter id='shadowed-goo'>
                         <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='10' />
                         <feColorMatrix
                            in='blur'
                            mode='matrix'
                            values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7'
                            result='goo'
                         />
                         <feGaussianBlur in='goo' stdDeviation='3' result='shadow' />
                         <feColorMatrix
                            in='shadow'
                            mode='matrix'
                            values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2'
                            result='shadow'
                         />
                         <feOffset in='shadow' dx='1' dy='1' result='shadow' />
                         <feComposite in2='shadow' in='goo' result='goo' />
                         <feComposite in2='goo' in='SourceGraphic' result='mix' />
                      </filter>
                      <filter id='goo'>
                         <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='10' />
                         <feColorMatrix
                            in='blur'
                            mode='matrix'
                            values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7'
                            result='goo'
                         />
                         <feComposite in2='goo' in='SourceGraphic' result='mix' />
                      </filter>
                   </defs>
                </svg>
             </div>
          </div>
          <div className='trip-name'>{name}</div>
          <div className='row'>
             <div className='place-icon'>
                <img src={gmarker} alt='Origin' />
             </div>
             <div className='place-info'>
                <div className='place-name'>{origin.name}</div>
                <div className='place-detail'>{origin.detail.replace(origin.name + ", ", "")}</div>
             </div>
          </div>
          <div className='row'>
             <div className='place-icon'>
                <img src={rmarker} alt='Destination' />
             </div>
             <div className='place-info'>
                <div className='place-name'>{destination.name}</div>
                <div className='place-detail'>{destination.detail.replace(destination.name + ", ", "")}</div>
             </div>
          </div>
          <ul className='poi-list'>
             {pois &&
               pois.map((poi, i) => (                     
                  <li key={poi.name + i} className='poi'>
                     <span></span>
                     <div className='poi-detail'>
                        {/* <div>
                           { i + 2 }{'.'}
                        </div> */}
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
                  </li>
                ))}
          </ul>
       </div>
    );
  }
}

export default TripShowDetail;

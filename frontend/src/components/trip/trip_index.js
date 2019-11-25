import React from 'react';
import TripItem from './trip_item';

export default class TripIndex extends React.Component {    
    componentDidMount() {
        this.props.fetchTrips();
    }

    render() {
        if (this.props.trips === []) return null;
        // OPTION 2 --> STATIC BACKGROUND
        // images = 'https://i.imgur.com/xCxjjjO.jpg https://www.sftodo.com/sanfrancisco/wp-content/uploads/2017/05/cable-cars-san-francico.jpg https://media-cdn.tripadvisor.com/media/photo-s/01/32/d5/d4/caption.jpg https://cdn.vox-cdn.com/thumbor/qKZr1z32bMxED18atSmHtZIMqEY=/0x0:3366x3021/1200x800/filters:focal(1401x1621:1939x2159)/cdn.vox-cdn.com/uploads/chorus_image/image/62981751/IMG_5487.0.jpeg https://sfrecpark.org/wp-content/uploads/Japanese-Tea-Garden.jpg https://assets3.thrillist.com/v1/image/1716382/size/tmg-article_default_mobile.jpg https://sfrecpark.org/wp-content/uploads/IMG_3820-e1423936154587-600x400.jpg https://tnimage.s3.hicloud.net.tw/photos/2019/11/17/1573972063-5dd0e85f9c348.jpg https://media.timeout.com/images/105320285/630/472/image.jpg https://s3-us-east-2.amazonaws.com/orbitz-media/blog/wp-content/uploads/2018/01/15173411/winter-in-yosemite.jpg'.split(' ');
        // let image = "https://loading.io/mod/background/ripple/index.svg";
        let images;
        images = `https://s3-media4.fl.yelpcdn.com/bphoto/g26YFr1eVNV1zq-vn4iaDA/o.jpg https://miro.medium.com/max/3456/1*xw0LmTs7pNUoOgDMAWX-qw.jpeg https://miro.medium.com/max/3456/1*KYQxelNRjXS477E52OHZyg.jpeg https://media.timeout.com/images/105204047/630/472/image.jpg https://santabarbaraca.com/content/uploads/2015/08/solvang-santa-barbara-county.jpg https://66.media.tumblr.com/3f5566e426d07fedb11b904cb5ac648d/tumblr_nljg13HUlJ1qdeuyro3_1280.jpg https://www.kevinandamanda.com/wp-content/uploads/2017/01/lucerne-switzerland-10.jpg https://i.ytimg.com/vi/GMZwLCwh2lg/maxresdefault.jpg https://www.tripsavvy.com/thmb/gvhnd2X2LFF4oBgHcD52hNZ6MKA=/2119x1414/filters:fill(auto,1)/beautiful-cityscape-skyline-of-florence-with-cathedral-and-torre-di-arnolfo---tuscany--italy-1136168524-5c9248a1c9e77c00014a9e63.jpg https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg https://www.sftodo.com/sanfrancisco/wp-content/uploads/2017/05/cable-cars-san-francico.jpg https://i.imgur.com/ArdWgEL.jpg https://cdn.vox-cdn.com/thumbor/qKZr1z32bMxED18atSmHtZIMqEY=/0x0:3366x3021/1200x800/filters:focal(1401x1621:1939x2159)/cdn.vox-cdn.com/uploads/chorus_image/image/62981751/IMG_5487.0.jpeg https://sfrecpark.org/wp-content/uploads/Japanese-Tea-Garden.jpg https://assets3.thrillist.com/v1/image/1716382/size/tmg-article_default_mobile.jpg https://sfrecpark.org/wp-content/uploads/IMG_3820-e1423936154587-600x400.jpg https://miro.medium.com/max/2304/1*MIcVyciqzxoMmVYpdTM3YA.jpeg https://media.timeout.com/images/105320285/630/472/image.jpg https://s3-us-east-2.amazonaws.com/orbitz-media/blog/wp-content/uploads/2018/01/15173411/winter-in-yosemite.jpg https://cdn.getyourguide.com/img/location_img-59-1969619245-148.jpg https://i.ytimg.com/vi/gYLQThUxpvQ/maxresdefault.jpg https://www.shutterbug.com/images/styles/960-wide/public/photo_post/103340/Salvang%20HDR.jpg https://www.japan-guide.com/g18/3008_01.jpg https://www.japan-guide.com/g18/3004_02.jpg https://japanistry-yvxqriqk.netdna-ssl.com/wp-content/uploads/2017/09/Asakusa-Nakamise-v01-800x534.jpg https://culinarybackstreets.com/wp-content/uploads/cb_tokyo_sakura_istock.jpg https://savvytokyo.scdn3.secure.raxcdn.com/app/uploads/2017/03/iStock-504827624-1024x682.jpg https://acalanda.com/wp-content/uploads/2019/06/japon.jpg https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/north-america/mexico-city-travel.adapt.1900.1.jpg`.split(' ');
        return (
          <div className="trips-container">
            <div className="trips-index">
              <div className="trips-list">
                {this.props.trips.map((trip, idx) => {
                  let a;
                  a = Math.floor(Math.random() * images.length);
                  let ri;
                  ri = images[a];
                  return <TripItem destroyTrip={this.props.destroyTrip} editTrip={this.props.editTrip} im={ri} trip={trip} key={idx} />;
                })}
              </div>
            </div>
          </div>
        );
    }
}

import React from 'react';
import TripItem from './trip_item';

export default class TripIndex extends React.Component {    
    componentDidMount() {
        this.props.fetchTrips();
    }

    render() {
        if (this.props.trips === []) return null;
        let images;
        images = 'https://i.imgur.com/xCxjjjO.jpg https://www.sftodo.com/sanfrancisco/wp-content/uploads/2017/05/cable-cars-san-francico.jpg https://media-cdn.tripadvisor.com/media/photo-s/01/32/d5/d4/caption.jpg https://cdn.vox-cdn.com/thumbor/qKZr1z32bMxED18atSmHtZIMqEY=/0x0:3366x3021/1200x800/filters:focal(1401x1621:1939x2159)/cdn.vox-cdn.com/uploads/chorus_image/image/62981751/IMG_5487.0.jpeg https://sfrecpark.org/wp-content/uploads/Japanese-Tea-Garden.jpg https://assets3.thrillist.com/v1/image/1716382/size/tmg-article_default_mobile.jpg https://sfrecpark.org/wp-content/uploads/IMG_3820-e1423936154587-600x400.jpg https://tnimage.s3.hicloud.net.tw/photos/2019/11/17/1573972063-5dd0e85f9c348.jpg https://media.timeout.com/images/105320285/630/472/image.jpg https://s3-us-east-2.amazonaws.com/orbitz-media/blog/wp-content/uploads/2018/01/15173411/winter-in-yosemite.jpg'.split(' ');
        return (
          <div className="trips-container">
            <div className="trips-index">
              <div className="trips-list">
                {this.props.trips.map((trip, idx) => {
                  let a;
                  a = (Math.floor(Math.random() * idx)) % images.length;
                  let ri;
                  ri = images[a];
                  return <TripItem im={ri} trip={trip} key={idx} />;
                })}
              </div>
            </div>
          </div>
        );
    }
}

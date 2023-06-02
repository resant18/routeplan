> 📣: Please note that this project is no longer being maintained.

# Project Overview
Routeplan is an app for creating walking trips. Users can select a start and end point on the map, then add points of interest on their trip.

Try it out: [**Heroku link**](https://routeplan.herokuapp.com/#/)

---

## Visualize Navigation Proccess
<div align="center">
    <img width=80% src="https://media.giphy.com/media/JSXscMwmXXbuBrpdeK/giphy.gif">
</div>

<br>

---

## Features
- User authentication (signup, login, logout)
- Create, update and delete trip plan.
- Display points of interest within a start and end point, filtered by category.
- Add POIs to trip (bound within a start and end point).
- View additional information (from Yelp) about a POI.
- View all trips along with added POIs.

---

## Languages/tech
- Database: MongoDB
- Web framework: Express
- Front-end framework: React
- Server: Node.js
- Language: HTML, CSS, JavaScript
- State management: Redux
- APIs: [MapQuest](https://developer.mapquest.com/), [Yelp Fusion](https://www.yelp.com/fusion)

---

## Creating the Trips Backend Routes with Express and Mongoose

<div align="center">
    <img width=80% src="https://media.giphy.com/media/gLF1aPzcNJ2tzx92IH/giphy.gif">
</div>

<br>

```javascript
const express = require('express');
const router = express.Router();
const passport = require('passport');
const tripsController = require('../../controllers/trips_controller');


router.get('/', tripsController.getAllTrips);
router.get('/:userId/:tripId', tripsController.getUserTrips);
router.get('/:tripId', tripsController.getTrip);
router.post('/new',
  passport.authenticate('jwt', { session: false }),
  tripsController.createTrip
);
router.patch('/:tripId', tripsController.updateTrip);
router.delete('/:tripId', tripsController.deleteTrip);
```

And delegating responsabilities to **tripsController** (only showing *createTrip* and *deleteTrip* for readability)

```javascript
exports.createTrip = (req, res) => {
    const { errors, isValid } = validateTrip(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newTrip = new Trip({
      user: req.user.id,
      name: req.body.name,
      origin: req.body.origin, 
      destination: req.body.destination 
    });

    newTrip.save().then(trip => res.json(trip));
};

exports.deleteTrip = (req, res) => {
    Trip.findById(req.params.tripId)
      .then(trip => {
        trip.remove().then(() => res.json(trip));
      })
      .catch(err =>
        res.status(404).json({ notripfound: "No trip found with that ID" })
      );
};
```

---

## Filtering POIs by Categories

<div align="center">
    <img width=80% src="https://media.giphy.com/media/kGvJlUvJC2xgrH1BPY/giphy.gif">
</div>

<br>

```javascript
filterMap() {
    for (let layer of this.markers) {
      this.map.removeLayer(layer);
    }
    this.filteredPoints = [];
    if (this.state.value.length > 0) {
      for (let pt of this.pointsOfInterest) {
        if (pt.fields.group_sic_code.startsWith(this.state.value)) {
          this.filteredPoints.push(pt);
          let curMarker = window.L.marker(pt.shapePoints, {
            icon: window.L.mapquest.icons.marker({
              shadow: false
            }),
            draggable: false,
            opacity: 0.5
          });
          curMarker
            .bindPopup(
              pt.name + "<br/>" + pt.fields.address + ", " + pt.fields.city
            )
            .addTo(this.map);
          this.markers.push(curMarker);
        }
      }
    }
  }
  
const options = [
      { value: '5812', label: 'Restaurants' },
      { value: '8412', label: 'Museums' },
      { value: '799', label: 'Parks' },
      { value: '5813', label: 'Bars' },
      { value: '5942', label: 'Books' },
      { value: '602101', label: 'ATM' },
      { value: '5461', label: 'Bakeries' }
];
```

---

## Drawing the Map

```javascript
fetchMapData(boundingBoxParam) {
    // fetch POI
    const proxy_url = "https://cors-anywhere.herokuapp.com/";

    axios
      .get(`${proxy_url}https://www.mapquestapi.com/search/v2/rectangle`, {
        params: {
          key: this.props.apiKey,
          boundingBox: boundingBoxParam,
          maxMatches: 500
        },
        paramsSerializer: params => {
          return qs.stringify(params);
        }
      })
      .then(result => {
        this.pointsOfInterest = result.data.searchResults;
      })
      .catch(error => {
        this.setState({
          error
        });
      });
    }

    drawRoute(routeProps) {
        let directions = window.L.mapquest.directions();

        directions.setLayerOptions({
          startMarker: {
            draggable: false
                },
          endMarker: {
            draggable: false
                },
          routeRibbon: {
            draggable: false
                }
    });
    
    directions.route({
      start: routeProps.routeStart,
      end: routeProps.routeEnd,
      options: {
        routeType: "pedestrian"
      }
    });
}
```

---

##
| File | Description |
| --- | --- |
| [components](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/components) | Container and presentational components |
| [actions](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/actions) | These actions can be dispatched to trigger a Redux state change. They return POJOs that tell the reducer what the state should look like. The state is a collection of data used throughout the app. |
| [reducers](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/reducers) | Reducers specify how the state changes in response to dispatched actions. |
| [util](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/util) | Defines functions that make API calls to the backend - login, logout, signup, CRUD actions for trips. |
| [controllers](https://github.com/alfredosumosav/routeplan/tree/master/controllers) |The API controllers define what happens given a requested route. |
| [models](https://github.com/alfredosumosav/routeplan/tree/master/models) | Defines the schema for users, trips, and points of interest |
| [routes](https://github.com/alfredosumosav/routeplan/tree/master/routes/api) | Declares URIs for the backend. These are the endpoints hit by the util functions. |

<<<<<<< HEAD
### How to build/run the code
1. Fork and clone the repository.
2. Install all dependencies by running `npm install` from root directory and frontend folder in the terminal.
3. Update the MapBox API key and Yelp API key by create config/keys_dev.js and write this code:
```
module.exports = {
  MAP_KEY: <YOUR_MAPBOX_API_KEY_HERE>,
  YELP_KEY: <YOUR_YELP_API_KEY_HERE>
};
```
4. Run the node.js server and front end by running `npm run dev` in terminal

### Architecture
The architecture of this application is based on a typical 3-tier MVC model. 
<div align="center">
    <img width=80% src="https://2.bp.blogspot.com/-cJrZfbVrH-0/WtT7O9CyTEI/AAAAAAAAGZw/znD9Yxlf5VYjRAGvoQjRizN_EXsMREKeQCLcBGAs/s640/mern%2Bstack%2Bdevelopment.png">
</div>

<br>

<div align="center"><em>(image source: Top Zenith)</em></div>

##### View
The Client tier (View) is written in JavaScript, HTML and CSS using ReactJS as the framework. This level of the architecture is what the user will interact with to access the features of the application. This application using Redux for state management.

##### Controller
The Business Logic Tier (Controller) will be written using NodeJS and ExpressJS, and this tier represents the Application Server that will act as a bridge of communication for the Client Tier and Database Tier. This tier will serve HTML pages to the user’s device and accept HTTP requests from the user and follow with the appropriate response. NodeJS 

##### Model
The Database Tier (Model) is hosted using MongoDB. This is where all of the crucial data of the application are stored. 

### Challenge

1. **CORS Error**<br>
When working with MapBox API and Yelp API in the application code, there is CORS error `....has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource`. This is a common thing caused by same-origin policy to prevent cross-site request forgery. To fix this, the application using cors-anywhere proxy server to add CORS header to a request. The cors-anywhere proxy server operates in between the frontend web app making the request, and the server that responds with data.

```javascript
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
                "X-Requested-With": "XMLHttpRequest"
            },
            params: {
                term: this.props.name
            },
            paramsSerializer: params => {
                return qs.stringify(params);
            }
        }
    )
```

2. **Draw Map and Trip Route**<br>
The main challenge for this project is try to understand how to build map using MapBox, draw route based on start and end point of user input and collect the POIs along and near the route.

    Draw Map

```javascript
initializeMap() {
    window.L.mapquest.key = this.props.apiKey;

    this.map = window.L.mapquest.map("map", {
        center: this.props.center,
        layers: window.L.mapquest.tileLayer(this.props.baseLayer),
        zoom: this.props.zoom
    });
}
```

    Draw Route

```javascript
drawRoute(routeProps) {
    let directions = window.L.mapquest.directions();
    
    directions.setLayerOptions({
      startMarker: {
        draggable: false
            },
      endMarker: {
        draggable: false
            },
      routeRibbon: {
        draggable: false
            }
    });
    
    directions.route({
      start: routeProps.routeStart,
      end: routeProps.routeEnd,
      options: {
        routeType: "pedestrian"
      }
    });

  }
```


### Team
[Alfredo Sumosa](https://github.com/alfredosumosav), [Renata Santoso](https://github.com/resant18), [Tim Scatterday](https://github.com/timscatterday), [Lance Wong](https://github.com/LanceSanity)
=======
---

## Team
- [Alfredo Sumosa](https://github.com/alfredosumosav)
- [Renata Santoso](https://github.com/resant18)
- [Tim Scatterday](https://github.com/timscatterday)
- [Lance Wong](https://github.com/LanceSanity)
>>>>>>> 7347b0ab43ffdc98f7d28cc7755cb5b50024e6f0

# Routeplan

Routeplan is an app for creating walking trips. Users can select a start and end point on the map, then add points of interest on their trip.

Try it out: [Heroku link](https://routeplan.herokuapp.com/#/)

---

## Visualize Navigation Proccess
<div align="center">
    <img width=80% src="https://media.giphy.com/media/JSXscMwmXXbuBrpdeK/giphy.gif">
</div>

<br>

---

### Features
- User authentication (signup, login, logout)
- Display points of interest within a start and end point, filtered by category
- View additional information (from Yelp) about a POI
- Create trips and add POIs to trips (bound within a start and end point)
- View all trips

---

### Languages/tech
- Database: MongoDB
- Web framework: Express
- Front-end framework: React
- Language: JS
- State management: Redux
- APIs: [MapQuest](https://developer.mapquest.com/), [Yelp Fusion](https://www.yelp.com/fusion)

---

### Creating the Trips Backend Routes with Express and Mongoose

<div align="center">
    <img width=80% src="https://media.giphy.com/media/gLF1aPzcNJ2tzx92IH/giphy.gif">
</div>

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

### Filtering POIs by Categories

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

### Drawing the Map

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

###
| File | Description |
| --- | --- |
| [components](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/components) | Container and presentational components |
| [actions](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/actions) | These actions can be dispatched to trigger a Redux state change. They return POJOs that tell the reducer what the state should look like. The state is a collection of data used throughout the app. |
| [reducers](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/reducers) | Reducers specify how the state changes in response to dispatched actions. |
| [util](https://github.com/alfredosumosav/routeplan/tree/master/frontend/src/util) | Defines functions that make API calls to the backend - login, logout, signup, CRUD actions for trips. |
| [controllers](https://github.com/alfredosumosav/routeplan/tree/master/controllers) |The API controllers define what happens given a requested route. |
| [models](https://github.com/alfredosumosav/routeplan/tree/master/models) | Defines the schema for users, trips, and points of interest |
| [routes](https://github.com/alfredosumosav/routeplan/tree/master/routes/api) | Declares URIs for the backend. These are the endpoints hit by the util functions. |

---

### Team
- [Alfredo Sumosa](https://github.com/alfredosumosav)
- [Renata Santoso](https://github.com/resant18)
- [Tim Scatterday](https://github.com/timscatterday)
- [Lance Wong](https://github.com/LanceSanity)

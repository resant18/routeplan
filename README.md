# Project Overview
Routeplan is an app for creating walking trips. Users can select a start and end point on the map, then add points of interest on their trip.

Try it out: [Heroku link](https://routeplan.herokuapp.com/#/)

## Visualize Navigation Proccess
<div align="center">
    <img width=80% src="https://media.giphy.com/media/JSXscMwmXXbuBrpdeK/giphy.gif">
</div>

<br>

### Features
- User authentication (signup, login, logout)
- Create, update and delete trip plan.
- Display points of interest within a start and end point, filtered by category.
- Add POIs to trip (bound within a start and end point).
- View additional information (from Yelp) about a POI.
- View all trips along with added POIs.

### Languages/tech
- Database: MongoDB
- Web framework: Express
- Front-end framework: React
- Server: Node.js
- Language: HTML, CSS, JavaScript
- State management: Redux
- APIs: [MapQuest](https://developer.mapquest.com/), [Yelp Fusion](https://www.yelp.com/fusion)

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

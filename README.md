# Routeplan

Routeplan is an app for creating walking trips. Users can select a start and end point on the map, then add points of interest on their trip.

Try it out: [Heroku link](https://pure-stream-29700.herokuapp.com/#/)

### Languages/tech
- Database: MongoDB
- Web framework: Express
- Front-end framework: React
- Language: JS
- State management: Redux
- APIs: [MapQuest](https://developer.mapquest.com/), [Yelp Fusion](https://www.yelp.com/fusion)

### Todos
- CSS for the trip's show page
- Allow users to edit their trip details
- User profile
# Routeplan

Routeplan is an app for creating walking trips. Users can select a start and end point on the map, then add points of interest on their trip.

Try it out: [Heroku link](https://pure-stream-29700.herokuapp.com/#/)

<img width=80% height=auto margin-left=10% src="https://media.giphy.com/media/JSXscMwmXXbuBrpdeK/giphy.gif">

### Features
- User authentication (signup, login, logout)
- Display points of interest within a start and end point, filtered by category
- View additional information (from Yelp) about a POI
- Create trips and add POIs to trips (bound within a start and end point)
- View all trips

### Languages/tech
- Database: MongoDB
- Web framework: Express
- Front-end framework: React
- Language: JS
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

### Team
[Alfredo Sumosa](https://github.com/alfredosumosav), [Renata Santoso](https://github.com/resant18), [Tim Scatterday](https://github.com/timscatterday), [Lance Wong](https://github.com/LanceSanity)
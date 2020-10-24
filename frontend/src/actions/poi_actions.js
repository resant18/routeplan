import * as APIUtil from "../util/trip_poi_api_util";

export const RECEIVE_TRIP_POIS = "RECEIVE_TRIP_POIS";
export const REMOVE_TRIP_POIS = "REMOVE_TRIP_POIS";
export const RECEIVE_TRIP_ERRORS = "RECEIVE_TRIP_ERRORS";

export const receiveTripPois = trip => ({
  type: RECEIVE_TRIP_POIS,
  trip
});

export const removeTripPois = trip => ({
  type: REMOVE_TRIP_POIS,
  trip
});

export const receiveTripErrors = errors => ({
  type: RECEIVE_TRIP_ERRORS,
  errors
});

// thunk action creator
export const addPoiToTrip = data => dispatch =>
  APIUtil.addPoiToTrip(data)
    .then(trip => dispatch(receiveTripPois(trip)))
    .catch(err => dispatch(receiveTripErrors(err)));

export const removePoiFromTrip = (data) => (dispatch) =>
   APIUtil.removePoiFromTrip(data)
      .then((trip) => dispatch(receiveTripPois(trip)))
      .catch((err) => dispatch(receiveTripErrors(err)));

// export const removePoiFromTrip = data => dispatch => {  
//   return APIUtil.removePoiFromTrip(data).then( 
//     trip => dispatch(removeTripPois(trip)),
//     err => dispatch(receiveTripErrors(err))
//   );
// }

import * as APIUtil from '../util/trip_poi_api_util';

export const RECEIVE_TRIP_POIS = 'RECEIVE_TRIP_POIS';

export const receiveTripPois = poi => ({
    type: RECEIVE_TRIP_POIS,
    poi
});

// thunk action creator
export const addPoiToTrip = data => dispatch =>
    APIUtil.addPoiToTrip(data)
        .then(trip => dispatch(receiveTripPois(trip)))
        .catch(err => dispatch(receiveTripErrors(err)));
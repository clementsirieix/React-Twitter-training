// @flow
import 'whatwg-fetch';

function requestLocation(payload) {
    return {
        type: 'REQUEST_LOCATION',
        payload
    };
}

function receiveErrorLocation(payload) {
    return {
        type: 'LOCATION_ERROR',
        payload
    };
}

function receiveLocation(data) {
    return {
        type: 'RECEIVE_LOCATION',
        data
    };
}

export function fetchLocation(payload: Object) {
    return function(dispatch: Function) {
        dispatch(requestLocation(payload));
        return fetch(`/api/place/${payload.latitude}&${payload.longitude}`)
            .then( (response) => {
                return response.json();
            })
            .then( (json) => {
                return dispatch(receiveLocation(json.data[0]));
            })
            .catch( (ex) => {
                console.error('parsing failed', ex);
                return dispatch(receiveErrorLocation(ex));
            });
    };
}

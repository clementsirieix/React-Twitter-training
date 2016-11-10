// @flow
import 'whatwg-fetch';

function requestTrends(payload) {
    return {
        type: 'REQUEST_TRENDS',
        payload
    };
}

function receiveErrorTrends(payload) {
    return {
        type: 'TRENDS_ERROR',
        payload
    };
}

function receiveTrends(data) {
    return {
        type: 'RECEIVE_TRENDS',
        data
    };
}

export function fetchTrends(payload: string) {
    return function(dispatch: Function) {
        dispatch(requestTrends(payload));
        // return console.log(payload);
        return fetch(`/api/trends/${payload}`)
            .then( (response) => {
                return response.json();
            })
            .then( (json) => {
                return dispatch(receiveTrends(json.data[0]));
            })
            .catch( (ex) => {
                console.error('parsing failed', ex);
                return dispatch(receiveErrorTrends(ex));
            });
    };
}

// @flow
const locationReducer = (state: {
    lat: number,
    long: number,
    woeid: number,
    error: Object,
    isLoading: boolean,
    isError: boolean
} = {
    lat: 0,
    long: 0,
    woeid: 0,
    error: {},
    isLoading: false,
    isError: false
}, action: Object) => {
    switch (action.type) {
        case 'REQUEST_LOCATION':
            return {...state, lat: action.payload.latitude, long: action.payload.longitude, isLoading: true};
        case 'LOCATION_ERROR':
            return {...state, error: action.payload, isLoading: false, isError: true};
        case 'RECEIVE_LOCATION':
            return {...state, woeid: action.data.woeid, isLoading: false, isError: false};
        default:
            return {...state};
    }
};

export default locationReducer;

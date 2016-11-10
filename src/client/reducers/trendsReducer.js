// @flow
const locationReducer = (state: {
    woeid: number,
    trends: Array<Object>,
    error: Object,
    isLoading: boolean,
    isError: boolean
} = {
    woeid: 0,
    trends: [],
    error: {},
    isLoading: false,
    isError: false
}, action: Object) => {
    switch (action.type) {
        case 'REQUEST_TRENDS':
            return {...state, woeid: action.payload, isLoading: true};
        case 'TRENDS_ERROR':
            return {...state, error: action.payload, isLoading: false, isError: true};
        case 'RECEIVE_TRENDS':
            return {...state, trends: action.data.trends, isLoading: false, isError: false};
        default:
            return {...state};
    }
};

export default locationReducer;

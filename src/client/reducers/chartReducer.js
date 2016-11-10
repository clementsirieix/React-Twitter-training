// @flow
const chartReducer = (state: {
    node: string,
    isLoaded: boolean
} = {
    node: '',
    isLoaded: false
}, action: Object) => {
    switch (action.type) {
        case 'RECEIVE_CHART':
            return {...state, node: action.payload, isLoaded: true};
        default:
            return {...state};
    }
};

export default chartReducer;

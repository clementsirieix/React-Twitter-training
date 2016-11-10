// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'

import location from './reducers/locationReducer';
import trends from './reducers/trendsReducer';
import chart from './reducers/chartReducer';

export default createStore(
    combineReducers({
        location,
        trends,
        chart
    }),
    {},
    applyMiddleware(thunk)
);

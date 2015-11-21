import {combineReducers} from 'redux';

import {routeReducer} from 'redux-simple-router';
import users from './users';
import app from './app';

export default combineReducers({
  routing: routeReducer,
  app,
  users
});

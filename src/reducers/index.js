import {combineReducers} from 'redux';

import {routeReducer} from 'redux-simple-router';
import users from './users';
import app from './app';
import files from './files';
import data from './data';
export default combineReducers({
  routing: routeReducer,
  app,
  users,
  files,
  data
});

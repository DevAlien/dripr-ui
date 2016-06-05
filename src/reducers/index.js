import {combineReducers} from 'redux'

import {routeReducer as routing} from 'redux-simple-router'
import users from './users'
import app from './app'
import files from './files'
import data from './data'
export default combineReducers({
  routing,
  app,
  users,
  files,
  data
})

import {applyMiddleware} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

export default applyMiddleware(
  thunk,
  promise
);

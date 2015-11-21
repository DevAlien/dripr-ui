require('babel-core/polyfill');

import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import Root from './components/Root';
import {createHistory} from 'history';
import {ActionTypes} from './constants';
import getRoutes from './routes';
import {Router} from 'react-router';
import {syncReduxAndRouter} from 'redux-simple-router';

const store = configureStore(window.$STATE);
const history = createHistory();
const routes = getRoutes(store);

store.dispatch({type: ActionTypes.REHYDRATE});
syncReduxAndRouter(history, store);

render(
  <Root store={store}>
    <Router routes={routes} history={history}/>
  </Root>, document.getElementById('root'));

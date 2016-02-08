require('babel-core/polyfill');
import ga from 'ga-react-router'
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import Root from './components/Root';
import {createHistory} from 'history';
import {ActionTypes} from './constants';
import getRoutes from './routes';
import {Router} from 'react-router';
import {syncReduxAndRouter} from 'redux-simple-router';
import apiClient from './apiClient';


const store = configureStore(window.$STATE, apiClient(window.$STATE.app.authInfo));
const history = createHistory();
const routes = getRoutes(store);
history.listen(location => {
  ga('set', 'page', location.pathname)
  ga('send', 'pageview');
});

store.dispatch({type: ActionTypes.REHYDRATE});
// store.dispatch({type: ActionTypes.ASD, "jduahda": "Ijduhe"});
syncReduxAndRouter(history, store);

render(
  <Root store={store}>
    <Router routes={routes} history={history}/>
  </Root>, document.getElementById('root'));

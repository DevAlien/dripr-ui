import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';

import routes from './routes';
import createReducer from './utils/createReducer';
import createStore from './utils/createStore';

const store = createStore(createReducer(), window.$STATE);

React.render(
  <Provider store={store}>
    {() => <Router history={history} children={routes(store)}/>}
  </Provider>
, document.getElementById('root'));

import React from 'react';
import {createRedux} from 'redux';
import {Provider} from 'redux/react';
import {Router} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';

import routes from './routes';
import createDispatcher from './utils/createDispatcher';

const redux = createRedux(createDispatcher(), window.$STATE);

React.render(
  <Provider redux={redux}>
    {() => <Router history={history} children={routes(redux)}/>}
  </Provider>
, document.getElementById('root'));

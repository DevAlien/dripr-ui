import React from 'react';
import {createRedux} from 'redux';
import {Provider} from 'redux/react';
import Router from 'react-router';
import dispatcher from './dispatcher';
import routes from './routes';

const redux = createRedux(dispatcher, window.$STATE);
const root = document.getElementById('root');
const router = Router.create({
  routes: routes(redux),
  location: Router.HistoryLocation,
  onError: err => {
    console.error(err);
  }
});

router.run((Root, state) => {
  React.render(React.createElement(
    Provider,
    {redux},
    () => React.createElement(Root, null)
  ), root);
});

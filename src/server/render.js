import React from 'react';
import path from 'path';
import fs from 'graceful-fs';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Router from 'react-router';
import Location from 'react-router/lib/Location';

import promisify from '../utils/promisify';
import routes from '../routes';
import HtmlDocument from './HtmlDocument';
import createReducer from '../utils/createReducer';

const readFile = promisify(fs.readFile);
const STATS_PATH = path.join(__dirname, '../../public/build/webpack-stats.json');

let webpackStats;

function readStats(req){
  if (req.get('env') === 'production' && webpackStats){
    return Promise.resolve(webpackStats);
  }

  return readFile(STATS_PATH).then(content => {
    webpackStats = JSON.parse(content);
  });
}

export default function(req, res, next){
  readStats(req).then(() => {
    const store = createStore(createReducer());
    const location = new Location(req.path, req.query);
    const state = store.getState();

    state.AppStore.setCSRFToken({csrfToken: req.csrfToken()});
    state.AppStore.setFirstRender({firstRender: false});

    Router.run(routes(store), location, (err, initialState, transition) => {
      if (err) return next(err);

      if (transition.isCancelled){
        if (transition.redirectInfo){
          return req.redirect(transition.redirectInfo.pathname);
        } else {
          return next(transition.abortReason);
        }
      }

      let markup = React.renderToString(
        <Provider store={store}>
          {() => <Router {...initialState}/>}
        </Provider>
      );

      let html = React.renderToStaticMarkup(
        <HtmlDocument store={store} markup={markup} stats={webpackStats}/>
      );

      res.status(state.AppStore.getStatus());
      res.send('<!DOCTYPE html>' + html);
    });
  }).catch(next);
}

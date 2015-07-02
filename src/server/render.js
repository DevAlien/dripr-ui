import React from 'react';
import path from 'path';
import fs from 'graceful-fs';
import {createRedux} from 'redux';
import {Provider} from 'redux/react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';

import promisify from '../utils/promisify';
import routes from '../routes';
import HtmlDocument from './HtmlDocument';
import createDispatcher from '../utils/createDispatcher';

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
    const redux = createRedux(createDispatcher());
    const location = new Location(req.path, req.query);
    const state = redux.getState();

    state.AppStore.setCSRFToken({csrfToken: req.csrfToken()});
    state.AppStore.setFirstRender({firstRender: false});

    Router.run(routes(redux), location, (err, initialState, transition) => {
      if (err) return next(err);

      if (transition.isCancelled && transition.redirectInfo){
        return req.redirect(transition.redirectInfo.pathname);
      }

      let markup = React.renderToString(
        <Provider redux={redux}>
          {() => <Router {...initialState}/>}
        </Provider>
      );

      let html = React.renderToStaticMarkup(
        <HtmlDocument redux={redux} markup={markup} stats={webpackStats}/>
      );

      res.status(state.AppStore.getStatus());
      res.send('<!DOCTYPE html>' + html);
    });
  });
}

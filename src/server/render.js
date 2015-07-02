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

function* readStats(){
  if (this.app.env === 'production' && webpackStats){
    return Promise.resolve(webpackStats);
  }

  webpackStats = yield readFile(STATS_PATH, 'utf8').then(JSON.parse);
}

export default function *(){
  yield readStats.call(this);

  const redux = createRedux(createDispatcher());
  const location = new Location(this.path, this.query);

  Router.run(routes(redux), location, (err, initialState, transition) => {
    if (err){
      return this.throw(err);
    }

    if (transition.isCancelled && transition.redirectInfo){
      return this.redirect(transition.redirectInfo.pathname);
    }

    let markup = React.renderToString(
      <Provider redux={redux}>
        {() => <Router {...initialState}/>}
      </Provider>
    );

    let html = React.renderToStaticMarkup(
      <HtmlDocument redux={redux} markup={markup} stats={webpackStats}/>
    );

    const state = redux.getState();

    this.status = state.AppStore.status;
    this.body = '<!DOCTYPE html>' + html;
  });
}

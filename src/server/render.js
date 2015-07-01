import React from 'react';
import path from 'path';
import fs from 'graceful-fs';
import {createRedux} from 'redux';
import {Provider} from 'redux/react';
import Router from 'react-router';

import dispatcher from '../dispatcher';
import routes from '../routes';
import HtmlDocument from './HtmlDocument';

const STATS_PATH = path.join(__dirname, '../../public/build/webpack-stats.json');

let webpackStats;

function* readStats(){
  if (this.app.env === 'production' && webpackStats){
    return Promise.resolve(webpackStats);
  }

  webpackStats = yield new Promise((resolve, reject) => {
    fs.readFile(STATS_PATH, 'utf8', (err, content) => {
      if (err) return reject(err);
      resolve(JSON.parse(content));
    });
  });
}

export default function *(){
  yield readStats.call(this);

  let isError = false;
  const redux = createRedux(dispatcher);
  const router = Router.create({
    route: routes(redux),
    location: this.path,
    onAbort: options => {
      let path = options.to ? router.makePath(options.to, options.params, options.query) : '/';
      this.redirect(path);
    },
    onError: err => {
      isError = true;
      this.throw(err);
    }
  });

  router.run((Root, state) => {
    if (isError) return;

    let markup = React.renderToString(React.createElement(
      Provider,
      {redux},
      () => React.createElement(Root, null)
    ));

    let html = React.renderToStaticMarkup(React.createElement(HtmlDocument, {
      redux,
      markup,
      stats: webpackStats
    }));

    this.status = 200;
    this.body = '<!DOCTYPE html>' + html;
  });
}

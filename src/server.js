import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import getRoutes from './routes';

import HtmlDocument from './components/HtmlDocument';
import configureStore from './store/configureStore.prod';
import Root from './components/Root.prod';

export default function createHtmlResponse({webpackStats, request}, callback) {
  const initialState = {
    app: {
      status: 200,
      title: 'Redux example',
      fetchForServerRendering: true
    }
  };

  const store = configureStore(initialState);
  const routes = getRoutes(store);

  match({
    routes,
    location: request.url
  }, (err, redirectLocation, routerState) => {
    if (err) return callback(err);

    if (redirectLocation) {
      return callback(null, {
        status: 302,
        url: redirectLocation.pathname + redirectLocation.search
      });
    }

    if (!routerState) {
      return callback(null, {
        status: 404
      });
    }

    const status = store.getState().app.status;

    const content = renderToString(
      <Root store={store}>
        <RoutingContext {...routerState}/>
      </Root>
    );

    const html = renderToStaticMarkup(
      <HtmlDocument
        webpackStats={webpackStats}
        content={content}
        store={store}/>
    );

    callback(null, {
      status,
      body: '<!DOCTYPE html>' + html
    });
  });
}

import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import getRoutes from './routes';
import cookie from 'cookie'
import HtmlDocument from './components/HtmlDocument';
import configureStore from './store/configureStore.prod';
import Root from './components/Root.prod';
import apiClient from './apiClient';

/**
 * Entry point for app
 */

export default function createHtmlResponse({webpackStats, request}, callback) {
  const cookies = cookie.parse(request.headers.cookie || '');
  const initialState = {
    app: {
      status: 200,
      title: "Vouchers's Provider",
      fetchForServerRendering: true,
      authInfo: cookies.vpsauth,
      loggedIn: cookies.vpsauth ? true : false
    }
  };
  const store = configureStore(initialState, apiClient(cookies.vpsauth));

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

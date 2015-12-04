import {applyMiddleware} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

export default function(client) {
  return applyMiddleware(
    clientMiddleware(client),
    thunk,
    promise
  );
}

function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      return promise(client).then(filterError).then(parseJSON).then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
    };
  };
}

function parseJSON(res) {
  return res.json();
}


function filterError(res) {
  if (res.status < 200 || res.status > 300) {
    const contentType = res.headers.get('Content-Type');

    if (!~contentType.indexOf('json')) {
      return Promise.reject(new ResponseError(res));
    }

    return res.json().then(json => {
      return json;
    }, noop).then(json => {
      return Promise.reject(new ResponseError(res, json));
    });
  }

  return res;
}

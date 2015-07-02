import fetch_ from 'isomorphic-fetch';
import {merge} from 'lodash';

// Fix "Illegal invocation" error in Chrome
// https://github.com/matthew-andrews/isomorphic-fetch/pull/20
const fetch = fetch_.bind(this);

const GITHUB_BASE = 'https://api.github.com/';

function setupRequestOptions(options){
  options = merge({
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }, options);

  if (typeof options.body === 'object'){
    options.body = JSON.stringify(options.body);
  }

  return options;
}

export function github(url, options){
  options = setupRequestOptions(options);
  options.mode = 'cors';

  return fetch(GITHUB_BASE + url, options);
}

class ResponseError extends Error {
  constructor(res, body){
    super();

    this.name = 'ResponseError';
    this.message = res.statusText;
    this.response = res;
    this.body = body;
  }
}

export function parseJSON(res){
  return res.json();
}

export function filterError(res){
  if (res.status < 200 || res.status > 300){
    return res.json().then(json => {
      return Promise.reject(new ResponseError(res, json));
    });
  }

  return res;
}

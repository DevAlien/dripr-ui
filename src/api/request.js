import fetch from 'isomorphic-fetch';

const GITHUB_BASE = 'https://api.github.com/';

export function github(url, options) {
  return fetch(GITHUB_BASE + url, options);
}

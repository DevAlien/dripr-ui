import requireUncached from 'require-uncached';
import * as config from '../config';

function getWebpackStats() {
  if (process.env.NODE_ENV === 'production') {
    return require('../public/build/webpack-stats.json');
  }

  return requireUncached('../public/build/webpack-stats.json');
}

function getServerModule() {
  if (process.env.NODE_ENV === 'production') {
    return require('./build/main');
  }

  return requireUncached('./build/main');
}

export default function(req, res, next) {
  const webpackStats = getWebpackStats();
  const createHtmlResponse = getServerModule();

  createHtmlResponse({
    webpackStats,
    request: req,
    config
  }, (err, {status, url, body}) => {
    if (err) return next(err);

    if (status === 302) {
      return res.redirect(url);
    }

    res.status(status).send(body);
  });
}

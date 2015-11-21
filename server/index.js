import express from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import csurf from 'csurf';
import serveStatic from 'serve-static';
import webpack from 'webpack';
import * as config from '../config';

const server = express();
const PUBLIC_PATH = path.join(__dirname, '../public');

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('../webpack/dev.config').client;
  const compiler = webpack(webpackConfig);

  server.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  server.use(require('webpack-hot-middleware')(compiler));
} else {
  server.use(serveStatic(PUBLIC_PATH, {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
    index: false
  }));
}

server.get('/*', require('./render'));

server.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).send('Server error');
});

server.listen(config.port, config.host, () => {
  console.log('Server listening on %s:%d', config.host, config.port);
});

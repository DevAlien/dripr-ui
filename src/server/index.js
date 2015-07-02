import path from 'path';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import csurf from 'csurf';
import serveStatic from 'serve-static';
import errorhandler from 'errorhandler';
import minimist from 'minimist';
import {fork} from 'child_process';

// Create a server
const server = express();
const NODE_ENV = server.get('env');
const PRODUCTION = NODE_ENV === 'production';
const argv = minimist(process.argv.slice(2));
const PORT = argv.port || 4000;

// Middleware
server.use(morgan(PRODUCTION ? 'combined' : 'dev'));
server.use(bodyParser.json());
server.use(cookieSession({
  keys: ['secret1', 'secret2']
}));
server.use(compression());
server.use(csurf());

if (PRODUCTION){
  // On production, use the public directory for static files
  // This directory is created by webpack on build time.
  server.use(serveStatic(path.join(__dirname, '../../public'), {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
    index: false
  }));
} else {
  // On development, serve the static files from the webpack dev server.
  fork(require.resolve('./webpack'));
}

// Render the app server-side and send it as response.
server.get('/*', require('./render'));

server.use(errorhandler());

server.listen(PORT, () => {
  console.log('Server listening on port %d', PORT);
});

import koa from 'koa';
import minimist from 'minimist';
import {fork} from 'child_process';
import serve from 'koa-static';
import path from 'path';
import http from 'http';
import morgan from 'koa-morgan';
import session from 'koa-session';

const app = koa();
const argv = minimist(process.argv.slice(2));
const PRODUCTION = app.env === 'production';
const PORT = argv.port || 4000;

// Logger
app.use(morgan.middleware(PRODUCTION ? 'combined' : 'dev'));

// Session
app.keys = ['keep me secret'];
app.use(session(app));

// CSRF
require('koa-csrf')(app);

if (app.env === 'production'){
  app.use(serve(path.join(__dirname, '../../public'), {
    maxage: 1000 * 60 * 60 * 24 * 30, // 1 month
    index: false
  }));
} else {
  fork(require.resolve('./webpack'));
}

app.use(require('./render'));

http.createServer(app.callback()).listen(PORT, () => {
  console.log('Server listening on port', PORT);
});

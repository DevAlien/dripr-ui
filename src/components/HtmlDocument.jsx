import React from 'react';
import serialize from 'serialize-javascript';
import {ActionTypes} from '../constants';
import Helmet from 'react-helmet';
import asd from 'file!../assets/sty.css';
export default class HtmlDocument extends React.Component {
  static propTypes = {
    webpackStats: React.PropTypes.object.isRequired,
    content: React.PropTypes.string.isRequired,
    store: React.PropTypes.object.isRequired
  }

  render() {
    let head = Helmet.rewind();
    const {content, store, webpackStats} = this.props;
    const {app} = store.getState();

    store.dispatch({type: ActionTypes.DEHYDRATE});
    const state = store.getState();
    const dehydratedState = 'window.$STATE=' + serialize(state);

    let styles = [].concat(
      webpackStats.vendor.css,
      webpackStats.main.css
    );

    let scripts = [].concat(
      webpackStats.vendor.js,
      webpackStats.main.js
    );

    return (
      <html>
        <head>
          <meta charSet='utf-8'/>
          <title>{app.title}</title>
          <meta name="google-site-verification" content="x0BVFv1kzbxAKxKNFc2uFscZw4HkTcwfxoUMsQISOAk" />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"/>
          <link rel="stylesheet" href="http://fontawesome.io/assets/font-awesome/css/font-awesome.css" />
          <link rel="stylesheet" href={asd} />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {styles.map((href, key) => <link rel='stylesheet' type='text/css' href={href} key={key}/>)}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: dehydratedState}}/>
          {scripts.map((src, key) => <script src={src} key={key} defer/>)}
        </body>
      </html>
    );
  }
}

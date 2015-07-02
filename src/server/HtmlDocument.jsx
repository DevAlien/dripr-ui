import React from 'react';
import serialize from 'serialize-javascript';

export default class HtmlDocument extends React.Component {
  static propTypes = {
    redux: React.PropTypes.object.isRequired,
    markup: React.PropTypes.string.isRequired,
    stats: React.PropTypes.object.isRequired
  }

  render(){
    const {redux, markup, stats} = this.props;
    const state = redux.getState();

    let style = [].concat(
      stats.main.css
    );

    let script = [].concat(
      stats['common.js'].js,
      stats.main.js
    );

    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>{state.AppStore.title}</title>
          {style.map((href, key) => <link rel="stylesheet" type="text/css" href={href} key={key}/>)}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}}/>
          <script dangerouslySetInnerHTML={{__html: 'window.$STATE=' + serialize(state)}}/>
          {script.map((src, key) => <script src={src} key={key} defer/>)}
        </body>
      </html>
    );
  }
}

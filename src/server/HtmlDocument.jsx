import React from 'react';
import serialize from 'serialize-javascript';

function dehydrate(state){
  let result = {};

  Object.keys(state).forEach(key => {
    const store = state[key];

    if (typeof store.dehydrate === 'function'){
      if (typeof store.shouldDehydrate === 'function' && !store.shouldDehydrate()){
        return;
      }

      result[key] = store.dehydrate();
    }
  });

  return result;
}

export default class HtmlDocument extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    markup: React.PropTypes.string.isRequired,
    stats: React.PropTypes.object.isRequired
  }

  render(){
    const {store, markup, stats} = this.props;
    const state = store.getState();
    const dehydratedState = 'window.$STATE=' + serialize(dehydrate(state));

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
          <title>{state.AppStore.getTitle()}</title>
          {style.map((href, key) => <link rel="stylesheet" type="text/css" href={href} key={key}/>)}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}}/>
          <script dangerouslySetInnerHTML={{__html: dehydratedState}}/>
          {script.map((src, key) => <script src={src} key={key} defer/>)}
        </body>
      </html>
    );
  }
}

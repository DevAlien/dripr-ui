import React from 'react'; // eslint-disable-line
import {Route, DefaultRoute, NotFoundRoute, createRoutesFromReactChildren} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import NotFound from './components/NotFound';

export default function(redux){
  return createRoutesFromReactChildren(
    <Route path="/" handler={App}>
      <DefaultRoute name="home" handler={Home}/>
      <NotFoundRoute handler={NotFound}/>
    </Route>
  );
}

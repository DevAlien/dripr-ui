import App from './components/pages/App';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import NotFound from './components/pages/NotFound';

export default function getRoutes(store) {
  return {
    component: App,
    childRoutes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/users/:id',
        component: Profile,
        onEnter: Profile.onEnter(store)
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  };
}

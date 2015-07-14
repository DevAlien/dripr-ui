import createRoute from './utils/createRoute';

export default function routes(store){
  const r = createRoute.bind(null, store);

  return {
    ...r(require('./components/App')),
    childRoutes: [
      {
        path: '/',
        ...r(require('./components/Home'))
      },
      {
        path: '/users/:id',
        ...r(require('./components/Profile'))
      },
      {
        path: '*',
        ...r(require('./components/NotFound'))
      }
    ]
  };
}

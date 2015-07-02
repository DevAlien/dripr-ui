import createRoute from './utils/createRoute';

export default function routes(redux){
  const r = createRoute.bind(null, redux);

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

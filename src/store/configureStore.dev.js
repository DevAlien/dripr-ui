import {persistState} from 'redux-devtools';
import DevTools from '../components/DevTools';
import composeStore from './composeStore';

export default function configureStore(initialState, client) {
  const store = composeStore(
    initialState,
    client,
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}

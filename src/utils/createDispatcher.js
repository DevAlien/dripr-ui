import {createDispatcher, composeStores} from 'redux';
import thunkMiddleware from 'redux/lib/middleware/thunk';
import * as stores from '../stores';
import mapValues from './mapValues';
import createStore from './createStore';

export default function(){
  let storeInstances = mapValues(stores, store => {
    return createStore(store);
  });

  return createDispatcher(
    composeStores(storeInstances),
    getState => [thunkMiddleware(getState)]
  );
}

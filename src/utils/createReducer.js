import {combineReducers} from 'redux';
import * as stores from '../stores';
import mapValues from './mapValues';

function initializeStore(Store){
  const store = new Store();
  store.__isStore__ = true;
  const handlers = Store.handlers;

  return function(state, action){
    if (state && !state.__isStore__){
      if (typeof store.rehydrate === 'function'){
        store.rehydrate(state);
      }

      return store;
    }

    if (!action) return store;

    const type = action.type;

    Object.keys(handlers).forEach(key => {
      if (handlers[key] === type){
        store[key].call(store, action);
      }
    });

    return store;
  };
}

export default function createReducer(){
  let storeInstances = mapValues(stores, Store => {
    return initializeStore(Store);
  });

  return combineReducers(storeInstances);
}

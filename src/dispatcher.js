import {createDispatcher, composeStores} from 'redux';
import * as stores from './stores';

export default createDispatcher(
  composeStores(stores)
);

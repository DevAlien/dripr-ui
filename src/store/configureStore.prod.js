import composeStore from './composeStore';

export default function configureStore(initialState, client) {
  return composeStore(initialState, client);
}

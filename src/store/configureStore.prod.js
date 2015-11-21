import composeStore from './composeStore';

export default function configureStore(initialState) {
  return composeStore(initialState);
}

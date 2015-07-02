export default function createStore(Store){
  const store = new Store();
  const handlers = Store.handlers;

  return function(state, action){
    if (!action) return store.state;

    const type = action.type;

    Object.keys(handlers).forEach(key => {
      if (handlers[key] === type){
        store[key].call(store, action);
      }
    });

    return store.state;
  };
}

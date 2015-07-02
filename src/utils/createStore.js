export default function createStore(Store){
  const store = new Store();
  const handlers = Store.handlers;

  return function(state, action){
    if (!action) return store.state;

    const type = action.type;

    if (state && type === '@@INIT' && typeof store.rehydrate === 'function'){
      store.rehydrate(state);
    }

    Object.keys(handlers).forEach(key => {
      if (handlers[key] === type){
        store[key].call(store, action);
      }
    });

    return store;
  };
}

export default function(Store){
  const store = new Store();
  const handlers = Store.handlers;

  return function(state, action){
    const type = action.type;

    Object.keys(handlers).forEach(key => {
      if (handlers[key] === type){
        store[key].call(store, action);
      }
    });

    return store.state;
  };
}

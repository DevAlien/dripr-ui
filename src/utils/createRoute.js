import nodeify from './nodeify';

export default function createRoute(store, handler){
  let obj = {
    component: handler
  };

  if (typeof handler.onEnter === 'function'){
    if (handler.onEnter.length < 3){
      obj.onEnter = function(state, transition, callback){
        nodeify(handler.onEnter.call(store, state, transition), callback);
      };
    } else {
      obj.onEnter = handler.onEnter.bind(store);
    }
  }

  if (typeof handler.onLeave === 'function'){
    if (handler.onLeave.length < 3){
      obj.onLeave = function(state, transition, callback){
        nodeify(handler.onLeave.call(store, state, transition), callback);
      };
    } else {
      obj.onLeave = handler.onLeave.bind(store);
    }
  }

  return obj;
}

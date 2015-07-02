import nodeify from './nodeify';

export default function createRoute(redux, handler){
  let obj = {
    component: handler
  };

  if (typeof handler.onEnter === 'function'){
    if (handler.onEnter.length < 3){
      obj.onEnter = function(state, transition, callback){
        nodeify(handler.onEnter.call(redux, state, transition), callback);
      };
    } else {
      obj.onEnter = handler.onEnter.bind(redux);
    }
  }

  if (typeof handler.onLeave === 'function'){
    if (handler.onLeave.length < 3){
      obj.onLeave = function(state, transition, callback){
        nodeify(handler.onLeave.call(redux, state, transition), callback);
      };
    } else {
      obj.onLeave = handler.onLeave.bind(redux);
    }
  }

  return obj;
}

import mapValues from './mapValues';

export default function bindActions(actions, context){
  return mapValues(actions, act => {
    return function(){
      return act.apply(context, arguments);
    };
  });
}

import mapValues from './mapValues';

export default function bindActions(actions, redux){
  return mapValues(actions, act => {
    return function(){
      return act.apply(redux, arguments);
    };
  });
}

export default function mapValues(obj, mapper, context){
  let result = {};

  Object.keys(obj).forEach(key => {
    result[key] = mapper.call(context, obj[key], key);
  });

  return result;
}

export default function nodeify(promise, callback){
  if (!promise || typeof promise.then !== 'function') return callback();

  promise.then(result => callback(null, result))
    .catch(callback);
}

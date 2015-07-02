export default function promisify(fn){
  return function(...args){
    return new Promise((resolve, reject) => {
      fn.apply(this, [].concat(args, (err, result) => {
        if (err){
          reject(err);
        } else {
          resolve(result);
        }
      }));
    });
  };
}

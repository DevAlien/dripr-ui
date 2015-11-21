import ResponseError from './ResponseError';
import noop from 'lodash/utility/noop';

export default function filterError(res) {
  if (res.status < 200 || res.status > 300) {
    const contentType = res.headers.get('Content-Type');

    if (!~contentType.indexOf('json')) {
      return Promise.reject(new ResponseError(res));
    }

    return res.json().then(json => {
      return json;
    }, noop).then(json => {
      return Promise.reject(new ResponseError(res, json));
    });
  }

  return res;
}

export default class ResponseError extends Error {
  constructor(res, body) {
    super();

    this.name = 'ResponseError';
    this.message = res.statusText;
    this.response = res;
    this.body = body;
  }
}

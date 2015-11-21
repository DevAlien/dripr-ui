import merge from 'lodash/object/merge';

const env = process.env.NODE_ENV || 'development';

export default merge({
  port: 4000,
  host: '0.0.0.0'
}, require('./' + env));

import merge from 'lodash/object/merge';

const env = process.env.NODE_ENV || 'development';
let editedValues = {};

if (env === 'development') {
  editedValues = {
    "port": 4000,
    "host": "0.0.0.0"
  };
}

export default merge(editedValues, require('./default.json'));

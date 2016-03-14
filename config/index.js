//import merge from 'lodash/object/merge';
var defaultEnv = require('./default.json');

const env = process.env.NODE_ENV || 'development';
let editedValues = {};

if (env === 'development') {
  Object.assign(editedValues, defaultEnv, require('./development.json'));
} else {
  editedValues = defaultEnv;
}

export default editedValues;

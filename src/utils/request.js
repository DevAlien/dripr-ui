import fetch_ from 'isomorphic-fetch';

// Fix "Illegal invocation" error in Chrome
// https://github.com/matthew-andrews/isomorphic-fetch/pull/20
const fetch = fetch_.bind(this);



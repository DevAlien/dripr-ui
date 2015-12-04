import fetch from 'isomorphic-fetch';

const BASE = __CLIENT__.apiURL || 'http://localhost:8101';

export default function apiClient(token) {
  return {
    token: token,
    fetch: function(url, options) {
      //let options = options;console.log('options')
      console.log(options)
      if(!options) {
        console.log('asd')
        options = {};
      }
      if(this.token) {
        console.log(options)
        options.headers = {Authorization: 'Bearer ' + this.token};
      }
      return fetch(BASE + url, options);
    },

    postFile: function(files) {
      console.log('token')
      console.log(this)
      let data = new FormData();
      files.forEach(file => {
        data.append('file', file)
      })
      let options = {method: 'post', body: data};
      if(this.token) {
        options.headers = {Authorization: 'Bearer ' + this.token};
      }
      return fetch(BASE + '/files', options);
    }
  }
}

import fetch from 'isomorphic-fetch';

const BASE = __CLIENT__.apiURL || 'http://localhost:8101';

export default function apiClient(token) {
  return {
    token: token,
    fetch: function(url, options) {
      if(!options) {
        options = {};
      }
      if(this.token) {
        options.headers = {Authorization: 'Bearer ' + this.token};
      }
      return fetch(BASE + url, options);
    },

    postFile: function(files) {
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

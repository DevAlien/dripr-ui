import fetch from 'isomorphic-fetch';
import config from '../config';
const BASE = config.apiUrl || 'http://localhost:8101';

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

    postCode: function(text, language) {

      let options = {method: 'post', body: JSON.stringify({text: text, language: language}), headers: {"content-type": "application/json"}};
      let url = '/upload/code/anon';
      if(this.token) {
        url = '/upload/code';
        options.headers.Authorization = 'Bearer ' + this.token;
      }
      return fetch(BASE + url, options);
    },

    postComment: function(id, text) {
      let options = {method: 'post', body: JSON.stringify({text: text}), headers: {"content-type": "application/json"}};
      let url = '/comments/' + id + '/anon';
      if(this.token) {
        url = '/comments/' + id;
        options.headers.Authorization = 'Bearer ' + this.token;
      }
      return fetch(BASE + url, options);
    },

    postFile: function(files) {
      let data = new FormData();
      files.forEach(file => {
        data.append('file', file)
      })
      let options = {method: 'post', body: data};
      let url = '/upload/anon';
      if(this.token) {
        url = '/upload'
        options.headers = {Authorization: 'Bearer ' + this.token};
      }
      return fetch(BASE + url, options);
    }
  }
}

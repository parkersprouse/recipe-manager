const api = require('./api');
const Cookies = require('universal-cookie');
const constants = require('./constants');

module.exports = {

  isLoggedIn: function(callback) {
    const cookies = new Cookies();
    const token = cookies.get('token');

    if (!!token) {
      api.verifyJWT(token, function(success, response) {
        if (success) {
          callback(true);
        }
        else {
          callback(false);
        }
      });
    }
    else {
      callback(false);
    }
  },

  logout: function(to, from, next) {
    const cookies = new Cookies();
    cookies.remove('token');
    next('/');
  },

  getCurrentUserInfo: function(callback) {
    const cookies = new Cookies();
    const token = cookies.get('token');

    if (!!token) {
      api.verifyJWT(token, function(success, response) {
        if (success) {
          callback(true, response.content);
        }
        else {
          callback(false);
        }
      });
    }
    else {
      callback(false);
    }
  }

}

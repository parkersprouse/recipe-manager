const api = require('./api');
const Cookies = require('universal-cookie');
const constants = require('./constants');
const moment = require('moment');

const cookies = new Cookies();

module.exports = {

  isLoggedIn: function(callback) {
    const token = cookies.get('token');

    if (!!token) {
      api.verifyAuthToken(token, function(success, response) {
        callback(success);
      });
    }
    else {
      callback(false);
    }
  },

  logout: function(to, from, next) {
    cookies.remove('token');
    next('/');
  },

  getCurrentUserInfo: function(callback) {
    const token = cookies.get('token');

    if (!!token) {
      api.verifyAuthToken(token, function(success, response) {
        if (success) callback(true, response.content);
        else callback(false);
      });
    }
    else {
      callback(false);
    }
  },

  makeDateReadable: function(date) {
    return moment(date).format("MMMM Do, YYYY");
  },

  isMobile: function() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerWidth < 1024);
  }

}

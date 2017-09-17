const axios = require('axios');
const constants = require('./constants');

function performGet(endpoint, callback) {
  axios.get(endpoint)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response);
  });
}

function performPost(endpoint, data, callback) {
  axios.post(endpoint, data)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response);
  });
}

function performDelete(endpoint, callback) {
  axios.delete(endpoint)
  .then(function (response) {
    callback(response.status === constants.http_ok ||
             response.status === constants.http_no_content, response.data);
  })
  .catch(function (error) {
    callback(false, error.response);
  });
}

function performPut(endpoint, data, callback) {
  axios.put(endpoint, data)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response);
  });
}

function performPatch(endpoint, data, callback) {
  axios.patch(endpoint, data)
  .then(function (response) {
    callback(response.status === constants.http_ok, response.data);
  })
  .catch(function (error) {
    callback(false, error.response);
  });
}

module.exports = {

  register: function(data, callback) {
    performPost('/api/auth/register', data, callback);
  },

  login: function(data, callback) {
    performPost('/api/auth/login', data, callback);
  },

  getUserByID: function(id, callback) {
    performGet('/api/users/id/' + id, callback);
  },

  getUserByEmail: function(email, callback) {
    performGet('/api/users/email/' + email, callback);
  },

  updateUser: function(data, callback) {
    performPatch('/api/users/update', data, callback);
  },

  updateUserPassword: function(data, callback) {
    performPatch('/api/users/updatepw', data, callback);
  },

  verifyAuthToken: function(token, callback) {
    performPost('/api/misc/verifyauthtoken', { token: token }, callback)
  },

  getRecipe: function(id, callback) {
    performGet('/api/recipe/' + id, callback);
  },

  getUsersRecipes: function(id, callback) {
    performGet('/api/recipe/user/' + id, callback);
  },

  addRecipe: function(data, callback) {
    performPost('/api/recipe/add', data, callback);
  },

  updateRecipe: function(data, callback) {
    performPatch('/api/recipe/update', data, callback);
  },

  deleteRecipe: function(id, callback) {
    performDelete('/api/recipe/delete/' + id, callback);
  }

}

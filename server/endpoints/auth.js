// eslint-disable-next-line
'use strict';

const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const constants = require('../constants');
const db = require('../db').db;
const jwt = require('jwt-simple');
const utils = require('../utils.js');
const validator = require('validator');


// public functions

function login(req, res, next) {
  const login = req.body.login;
  const password = req.body.password;

  const type = login.indexOf('@') > -1 ? 'email' : 'username';

  db.one('select * from users where lower(' + type + ') = lower($1)', login)
    .then(function(data) {
      const match = bcrypt.compareSync(password, data.pw_hash);
      if (match) {
        const payload = utils.generateJwtPayload(data);
        const token = jwt.encode(payload, config.jwtSecret);
        res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false });
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: token,
            message: 'Successfully logged in'
          });
      } else {
        res.status(constants.http_unauthorized)
          .json({
            status: 'failure',
            content: data,
            message: 'Your email/username or password was incorrect'
          });
      }
    })
    .catch(function(err) {
      if (err instanceof constants.db_query_result_error && err.code === constants.db_err_no_result) {
        res.status(constants.http_unauthorized)
          .json({
            status: 'failure',
            content: err,
            message: 'Your email/username or password was incorrect'
          });
      }
      else {
        res.status(constants.http_server_error)
          .json({
            status: 'failure',
            content: err,
            message: 'There was an unknown problem when attempting to log you in'
          });
      }
    });
}

function register(req, res, next) {
  if (!validator.isAlphanumeric(req.body.username)) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'Username can only contain letters and numbers'
      });
  }
  else if (!validator.isEmail(req.body.email)) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'Please make sure your email is valid'
      });
  }
  else {
    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(req.body.password, salt);
    const data = {
      username: req.body.username,
      email: req.body.email,
      pw_hash: pw_hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    };

    let query = 'insert into users ' +
                '(username, email, pw_hash, first_name, last_name) ' +
                'values(${username}, ${email}, ${pw_hash}, ${first_name}, ${last_name}) ' +
                'returning id';
    db.one(query, data)
      .then(function (data) {
        res.status(constants.http_ok)
          .json({
            status: 'success',
            message: 'Added new user'
          });
      })
      .catch(function (err) {
        let msg = 'There was an unknown problem when creating your account';

        console.log(err);

        if (err.code === constants.db_err_duplicate) {
          if (err.constraint === 'username' || err.constraint === 'users_lower_idx')
            msg = 'An account with that username already exists';
          else if (err.constraint === 'email' || err.constraint === 'users_lower_idx1')
            msg = 'An account with that email address already exists';
        }

        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err,
            message: msg
          });
      });
  }
}

module.exports = {
  login: login,
  register: register
}

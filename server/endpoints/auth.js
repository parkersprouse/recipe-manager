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
  const email = req.body.email;
  const password = req.body.password;

  db.one('select * from users where lower(email) = lower($1)', email)
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
            message: 'Your email or password was incorrect'
          });
      }
    })
    .catch(function(err) {
      if (err instanceof constants.db_query_result_error && err.code === constants.db_err_no_result) {
        res.status(constants.http_unauthorized)
          .json({
            status: 'failure',
            content: err,
            message: 'Your email or password was incorrect'
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
  if (!validator.isEmail(req.body.email)) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'Please make sure your email is valid'
      });
  }
  else if (req.body.password.length < 6) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'Password should be at least 6 characters long'
      });
  }
  else {
    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(req.body.password, salt);
    const data = {
      email: req.body.email,
      pw_hash: pw_hash
    };

    let query = 'insert into users ' +
                '(email, pw_hash) ' +
                'values(${email}, ${pw_hash}) ' +
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

        if (err.code === constants.db_err_duplicate)
            msg = 'An account with that email address already exists';

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

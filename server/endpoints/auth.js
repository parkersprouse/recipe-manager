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

  if (validator.isEmpty(email) || validator.isEmpty(password)) {
    let data = {
      emailState: validator.isEmpty(email) ? 'invalid' : 'valid',
      passwordState: validator.isEmpty(password) ? 'invalid' : 'valid'
    };

    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: data,
        message: 'Please make sure all required fields are filled out'
      });
  }
  else {
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
}

function register(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  if (validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(confirmpassword)) {
    let data = {
      emailState: validator.isEmpty(email) ? 'invalid' : 'valid',
      passwordState: validator.isEmpty(password) ? 'invalid' : 'valid',
      confirmPasswordState: validator.isEmpty(confirmpassword) ? 'invalid' : 'valid'
    };

    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: data,
        message: 'Please make sure all required fields are filled out'
      });
  }
  else if (!validator.isEmail(email)) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: { emailState: 'invalid' },
        message: 'Please make sure your email is valid'
      });
  }
  else if (password.length < 6) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: { passwordState: 'invalid' },
        message: 'Password should be at least 6 characters long'
      });
  }
  else if (password !== confirmpassword) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: { passwordState: 'invalid', confirmPasswordState: 'invalid' },
        message: 'Your passwords did not match'
      });
  }
  else {
    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(password, salt);
    const data = {
      email: email,
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
        let content = err;

        if (err.code === constants.db_err_duplicate) {
          msg = 'An account with that email address already exists';
          content = { emailState: 'invalid' };
        }

        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: content,
            message: msg
          });
      });
  }
}

module.exports = {
  login: login,
  register: register
}

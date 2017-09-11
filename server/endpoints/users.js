// eslint-disable-next-line
'use strict';

const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const constants = require('../constants');
const db = require('../db').db;
const jwt = require('jwt-simple');
const utils = require('../utils.js');


// private functions

function getUserBy(dataType, param, res, next) {
  let query = 'select * from users where ' + dataType + ' = $1';

  // we should use the lowercase index to search for email addresses
  // but don't want to use it when searching for IDs, so for now we
  // separate the queries like this.
  // yes, it looks weird, but it could look much weirder if I attempted
  // to generalize it.
  if (dataType === 'email')
    query = 'select * from users where lower(email) = lower($1)';

  db.one(query, param)
    .then(function (data) {
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: data,
          message: 'Found user'
        });
    })
    .catch(function (err) {
      if (err instanceof constants.db_query_result_error &&
          err.code === constants.db_err_no_result) {
        res.status(constants.http_no_content)
          .json({
            status: 'failure',
            content: err,
            message: 'User not found'
          });
      }
      else {
        res.status(constants.http_server_error)
          .json({
            status: 'failure',
            content: err,
            message: 'There was an unknown problem when attempting to find the user'
          });
      }
    });
}


// public functions

function getUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: data,
          message: 'Returned all users'
        });
    })
    .catch(function (err) {
      res.status(constants.http_server_error)
        .json({
          status: 'failure',
          content: err,
          message: 'There was an unexpected error when trying to get all users'
        });
    });
}

function getUserByID(req, res, next) {
  getUserBy('id', parseInt(req.params.id, 10), res, next);
}

function getUserByEmail(req, res, next) {
  getUserBy('email', req.params.email, res, next);
}

function updateUser(req, res, next) {
  let updates = '';

  for (let key in req.body)
    if (req.body.hasOwnProperty(key) && key !== 'id')
      updates += key + ' = \'' + req.body[key] + '\', ';

  if (!!updates) {
    updates = updates.slice(0, -2);

    let query = 'update users set ' + updates + ' where id = $1 returning *';
    db.one(query, req.body.id)
      .then(function (data) {
        // after updating, we have to re-create the auth token cookie with the new data
        const payload = utils.generateJwtPayload(data);
        const token = jwt.encode(payload, config.jwtSecret);
        res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false });
        res.status(constants.http_ok)
          .json({
            status: 'success',
            message: 'Successfully updated your profile'
          });
      })
      .catch(function (err) {
        let msg = 'There was an unknown problem when updating your account';

        if (err.code === constants.db_err_duplicate && err.constraint === 'email')
          msg = 'An account with that email address already exists';

        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err,
            message: msg
          });
      });
  }
  else {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        message: 'You must provide at least one property to update'
      });
  }
}

function updateUserPassword(req, res, next) {
  const body = req.body;
  const match = bcrypt.compareSync(body.cur_pw, body.hash);

  if (match) {
    const new_salt = bcrypt.genSaltSync();
    const new_hash = bcrypt.hashSync(body.new_pw, new_salt);

    let query = 'update users set pw_hash = ${hash} where id = ${id} returning *';
    db.one(query, {id: body.id, hash: new_hash})
      .then(function (data) {
        // after updating, we have to re-create the auth token cookie with the new data
        const payload = utils.generateJwtPayload(data);
        const token = jwt.encode(payload, config.jwtSecret);
        res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false });
        res.status(constants.http_ok)
          .json({
            status: 'success',
            message: 'Successfully updated your password'
          });
      })
      .catch(function (err) {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err,
            message: 'There was an unknown problem when updating your password'
          });
      });
  }
  else {
    res.status(constants.http_unauthorized)
      .json({
        status: 'failure',
        message: 'Your current password was incorrect'
      });
  }
}

module.exports = {
  getUsers: getUsers,
  getUserByID: getUserByID,
  getUserByEmail: getUserByEmail,
  updateUser: updateUser,
  updateUserPassword: updateUserPassword
}

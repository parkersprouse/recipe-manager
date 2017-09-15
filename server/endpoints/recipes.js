const constants = require('../constants');
const db = require('../db').db;
const validator = require('validator');
const _ = require('lodash');


// public functions

function getRecipe(req, res, next) {
  db.one('select * from recipes where id = $1', req.params.id)
    .then(function (data) {
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: data,
          message: 'Found recipe'
        });
    })
    .catch(function (err) {
      if (err instanceof constants.db_query_result_error &&
          err.code === constants.db_err_no_result) {
        res.status(constants.http_no_content)
          .json({
            status: 'failure',
            content: err,
            message: 'Recipe not found'
          });
      }
      else {
        res.status(constants.http_server_error)
          .json({
            status: 'failure',
            content: err,
            message: 'There was an unknown problem when attempting to find the recipe'
          });
      }
    });
}

function addRecipe(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const ingredients = req.body.ingredients;
  const steps = req.body.steps;
  const user = req.body.user;

  const titleEmpty = validator.isEmpty(title);
  const ingredientsEmpty = _.isEmpty(ingredients);
  const stepsEmpty = _.isEmpty(steps);
  const userEmpty = !user;

  if (titleEmpty || ingredientsEmpty || stepsEmpty || userEmpty) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: {
          titleState: titleEmpty ? 'invalid' : 'valid',
          ingredientsState: ingredientsEmpty ? 'invalid' : 'valid',
          stepsState: stepsEmpty ? 'invalid' : 'valid',
          userState: userEmpty ? 'invalid' : 'valid',
        },
        message: 'Please make sure all required fields are filled out'
      });
  }
  else {
    const data = {
      title: title,
      description: description,
      ingredients: ingredients,
      steps: steps,
      user: user
    };

    const query = 'insert into recipes ' +
                  '(title, description, ingredients, steps, user) ' +
                  'values(${title}, ${description}, ${ingredients}, ${steps}, ${user}) ' +
                  'returning id';
    db.one(query, data)
      .then(function (data) {
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: data,
            message: 'Added new recipe'
          });
      })
      .catch(function (err) {
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err,
            message: 'There was an unknown problem when adding your recipe'
          });
      });
  }
}

function updateRecipe(req, res, next) {

}

function deleteRecipe(req, res, next) {
  db.none('delete from recipes where id = $1', req.params.id)
    .then(function () {
      res.status(constants.http_ok)
        .json({
          status: 'success',
          message: 'Recipe deleted'
        });
    })
    .catch(function (err) {
      res.status(constants.http_server_error)
        .json({
          status: 'failure',
          content: err,
          message: 'There was an unknown problem when attempting to delete the recipe'
        });
    });
}

module.exports = {
  getRecipe: getRecipe,
  addRecipe: addRecipe,
  updateRecipe: updateRecipe,
  deleteRecipe: deleteRecipe
}

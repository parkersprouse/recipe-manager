const constants = require('../constants');
const db = require('../db').db;
const validator = require('validator');
const _ = require('lodash');


// private functions

function addOrUpdateRecipe(func, req, res, next) {
  const title = req.body.title;
  const description = req.body.description || null;
  const ingredients = req.body.ingredients;
  const steps = req.body.steps;
  const id = req.body.id;

  const titleEmpty = !title || validator.isEmpty(title);
  const ingredientsEmpty = !ingredients || _.isEmpty(ingredients);
  const stepsEmpty = !steps || _.isEmpty(steps);

  if (titleEmpty || ingredientsEmpty || stepsEmpty) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: {
          titleState: titleEmpty ? 'invalid' : 'valid',
          ingredientsState: ingredientsEmpty ? 'invalid' : 'valid',
          stepsState: stepsEmpty ? 'invalid' : 'valid'
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
      id: id
    };

    let query = 'insert into recipes ' +
                '(title, description, ingredients, steps, user_id) ' +
                'values (${title}, ${description}, ${ingredients}, ${steps}, ${id}) ' +
                'returning *';

    if (func === 'update') {
      query = 'update recipes set ' +
              'title = ${title}, description = ${description}, ' +
              'ingredients = ${ingredients}, steps = ${steps} ' +
              'where id = ${id} returning *';
    }

    db.one(query, data)
      .then(function (data) {
        res.status(constants.http_ok)
          .json({
            status: 'success',
            content: data
          });
      })
      .catch(function (err) {
        console.log(err);
        res.status(constants.http_bad_request)
          .json({
            status: 'failure',
            content: err,
            message: 'There was an unknown problem when attempting to ' + func + ' the recipe'
          });
      });
  }
}


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
  addOrUpdateRecipe('add', req, res, next);
}

function updateRecipe(req, res, next) {
  addOrUpdateRecipe('update', req, res, next);
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

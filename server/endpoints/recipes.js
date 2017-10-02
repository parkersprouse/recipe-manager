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
  const private = req.body.private;

  let titleEmpty = !title || validator.isEmpty(title);
  let ingredientsEmpty = !ingredients || _.isEmpty(ingredients);
  let stepsEmpty = !steps || _.isEmpty(steps);

  let stepsState = [];
  let ingredientsState = [];

  for (let i = 0; i < steps.length; i++) {
    if (!steps[i] || validator.isEmpty(steps[i])) {
      stepsState.push(false);
      stepsEmpty = true;
    }
    else {
      stepsState.push(true);
    }
  }

  for (var i in ingredients) {
    if (ingredients.hasOwnProperty(i)) {
      const ing = ingredients[i];
      if (!ing.name || validator.isEmpty(ing.name) || !ing.measurement || validator.isEmpty(ing.measurement) || !ing.amount || validator.isEmpty(ing.amount)) {
        ingredientsState.push({
          name: !ing.name || validator.isEmpty(ing.name) ? false : true,
          measurement: !ing.measurement || validator.isEmpty(ing.measurement) ? false : true,
          amount: !ing.amount || validator.isEmpty(ing.amount) ? false : true
        });
        ingredientsEmpty = true;
      }
      else {
        ingredientsState.push({name: true, measurement: true, amount: true});
      }
    }
  }

  if (titleEmpty || ingredientsEmpty || stepsEmpty) {
    res.status(constants.http_bad_request)
      .json({
        status: 'failure',
        content: {
          titleState: !titleEmpty,
          ingredientsState: ingredientsState,
          stepsState: stepsState
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
      id: id,
      private: private
    };

    let query = 'insert into recipes ' +
                '(title, description, ingredients, steps, user_id, private) ' +
                'values (${title}, ${description}, ${ingredients}, ${steps}, ${id}, ${private}) ' +
                'returning *';

    if (func === 'update') {
      query = 'update recipes set ' +
              'title = ${title}, description = ${description}, ' +
              'ingredients = ${ingredients}, steps = ${steps}, private = ${private} ' +
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
            content: {
              titleState: true,
              ingredientsState: true,
              stepsState: true,
              err: err
            },
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

function getUserRecipes(req, res, next) {
  db.many('select * from recipes where user_id = $1 order by id asc', req.params.id)
    .then(function (data) {
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: data,
          message: 'Found recipes'
        });
    })
    .catch(function (err) {
      if (err instanceof constants.db_query_result_error &&
          err.code === constants.db_err_no_result) {
        res.status(constants.http_no_content)
          .json({
            status: 'failure',
            content: err,
            message: 'Recipes not found'
          });
      }
      else {
        res.status(constants.http_server_error)
          .json({
            status: 'failure',
            content: err,
            message: 'There was an unknown problem when attempting to find the recipes'
          });
      }
    });
}

function getPaginatedUserRecipes(req, res, next) {
  const data = {
    id: req.params.id,
    amount: req.params.amount
  };
  data.offset = (req.params.page - 1) * req.params.amount;

  db.many('select * from recipes where user_id = ${id} order by id asc limit ${amount} offset ${offset}', data)
    .then(function (data) {
      res.status(constants.http_ok)
        .json({
          status: 'success',
          content: data,
          message: 'Found recipes'
        });
    })
    .catch(function (err) {
      if (err instanceof constants.db_query_result_error &&
          err.code === constants.db_err_no_result) {
        res.status(constants.http_no_content)
          .json({
            status: 'failure',
            content: err,
            message: 'Recipes not found'
          });
      }
      else {
        res.status(constants.http_server_error)
          .json({
            status: 'failure',
            content: err,
            message: 'There was an unknown problem when attempting to find the recipes'
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
  getUserRecipes: getUserRecipes,
  getPaginatedUserRecipes: getPaginatedUserRecipes,
  addRecipe: addRecipe,
  updateRecipe: updateRecipe,
  deleteRecipe: deleteRecipe
}

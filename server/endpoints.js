// eslint-disable-next-line
'use strict';

const router = require('express').Router();

const auth = require('./endpoints/auth');
const users = require('./endpoints/users');

// auth endpoints
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);

// user endpoints
router.get('/users', users.getUsers);
router.get('/users/id/:id', users.getUserByID);
router.get('/users/email/:email/', users.getUserByEmail);
router.patch('/users/update', users.updateUser);
router.patch('/users/updatepw', users.updateUserPassword);

module.exports = router;

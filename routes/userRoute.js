const { register, login, verifyToken, getUser, logout, setAvatar, getAllUsers } = require('../controllers/userController');

const Route = require('express').Router();

Route.post('/register', register);
Route.post('/login', login);
Route.get('/user', verifyToken, getUser);
Route.post('/logout', verifyToken, logout);
Route.put('/setAvatar/:id', setAvatar);
Route.get('/allusers/:id', getAllUsers);

module.exports = Route;
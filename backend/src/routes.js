const express = require('express');
const routes = express.Router();

const LanceController = require('./controllers/LanceController');

//criação dos end points
routes.get('/lances', LanceController.index);
routes.post('/lances', LanceController.store);


module.exports = routes;
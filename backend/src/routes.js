const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngValidator = require('./validators/OngValidator');
const IncidentValidator = require('./validators/IncidentValidator');
const ProfileValidator = require('./validators/ProfileValidator');
const SessionValidator = require('./validators/SessionValidator');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionValidator.create, SessionController.create);

routes.get('/ongs', OngController.list);
routes.post('/ongs', OngValidator.create, OngController.create);

routes.get('/profile', ProfileValidator.list, ProfileController.list);

routes.get('/incidents', IncidentValidator.list, IncidentController.list);
routes.post('/incidents', IncidentValidator.create, IncidentController.create);
routes.delete('/incidents/:id', IncidentValidator.remove, IncidentController.delete);

module.exports = routes;

/**
 * Sempre que for colocar uma variável como item de um objeto, 
 * não estando apenas como valor de uma propiredade, é 
 * necessário colocar esta variável entre "[]".
 * 
 * Exemplo do [Segments.BODY], já que ele é uma variável e tem que ser definido 
 * como propriedade de um objeto.
 */

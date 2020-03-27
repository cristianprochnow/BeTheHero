const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;

/**
 * process.env.[] são variáveis de ambiente que servem para todo o local.
 */

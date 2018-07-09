'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
    knex = require('knex');

module.exports = knex(config.mysql);

'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  mongooseService = require('./mongoose'),
  knexService = require('./knex'),
  express = require('./express'),
  fs = require('fs'),
  chalk = require('chalk'),
  path = require('path'),
  seed = require('./mongo-seed');

function seedDB(callback) {
  if (config.seedDB && config.seedDB.seed) {
    console.log(chalk.bold.red('Warning:  Database seeding is turned on'));
    seed.start().then(function (value) {
      if (callback) callback(value);
    });
  }
}

function initMySQL(value) {
  var mongoose = require('mongoose'),
      Form = mongoose.model('Form');
  Form.findOne({title: "PersonalSurveys"}, 'version forms',
    function (err, form) {
      if (err || !form) {
        console.log('No form with that username or email has been found');
      } else if (form.version !== 0) {
        console.log('Form does not need to be updated');
      } else {
        knexService.schema.hasTable('Volunteers').then(function (exists) {
          if (!exists) {
            return knexService.schema.createTable('Volunteers', function (t) {
              form.forms.forEach(function (question) {
                if (question.column.type === "text") {
                  t.string(question.name, question.column.size);
                } else if (question.column.type === "number") {
                  t.biginteger(question.name);
                } else {
                  console.log(chalk.bold.yellow('unknown column type: ' + question.column.type));
                }
              });
              t.increments('id').primary();
              t.integer('version').defaultTo(0);
            });
          } else {
            console.log('Volunteers already exists');
          }
        })
      }
    });
}

module.exports.init = function init(callback) {
  mongooseService.connect(function (db) {
    // Initialize Models
    mongooseService.loadModels(seedDB, initMySQL);

    // Initialize express
    var app = express.init(db);
    if (callback) callback(app, db, config);

  });
};

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, config) {

    // Start the app by listening on <port> at <host>
    app.listen(config.port, config.host, function () {
      // Create server URL
      var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Mongo:        ' + config.mongodb.uri));
      console.log(chalk.green('MySQL:        ' + config.mysql.connection.host));
      console.log(chalk.green('App version:     ' + config.meanjs.version));
      if (config.meanjs['meanjs-version'])
        console.log(chalk.green('MEAN.JS version: ' + config.meanjs['meanjs-version']));
      console.log('--');

      if (callback) callback(app, db, config);
    });

  });

};

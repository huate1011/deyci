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

function seedDB() {
  if (config.seedDB && config.seedDB.seed) {
    console.log(chalk.bold.red('Warning:  Database seeding is turned on'));
    seed.start();
  }
}

function initMySQL() {
  config.files.server.models.mysql.forEach(function (modelPath) {
    // var content = fs.readFileSync(path.resolve(modelPath), 'utf8');
    // knexService.raw(content).then(function() {
    //   console.log('mysql 数据库初始化成功！');
    // }).catch(function(err) {
    //     throw new Error(err)
    // });

    knexService.schema.hasTable('users').then(function(exists) {
      if (!exists) {
        return knexService.schema.createTable('users', function(t) {
          t.increments('id').primary();
          t.string('first_name', 100);
          t.string('last_name', 100);
          t.text('bio');
        });
      } else {
          console.log('mysql already exists！');
      }
    });
  });
}

module.exports.init = function init(callback) {
  mongooseService.connect(function (db) {
    // Initialize Models
    mongooseService.loadModels(seedDB);
    initMySQL();

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

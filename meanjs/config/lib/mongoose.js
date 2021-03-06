'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  config = require('../config'),
  chalk = require('chalk'),
  path = require('path'),
  mongoose = require('mongoose');

// Load the mongoose models
module.exports.loadModels = function (callback, callbackParams) {
  // Globbing model files
  config.files.server.models.mongo.forEach(function (modelPath) {
    require(path.resolve(modelPath));
  });

  if (callback) callback(callbackParams);
};

// Initialize Mongoose
module.exports.connect = function (callback) {
  mongoose.Promise = config.mongodb.promise;

  var options = _.merge(config.mongodb.options || {}, { useMongoClient: true });

  mongoose
    .connect(config.mongodb.uri, options)
    .then(function (connection) {
      // Enabling mongoose debug mode if required
      mongoose.set('debug', config.mongodb.debug);

      // Call callback FN
      if (callback) callback(connection.db);
    })
    .catch(function (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
    });

};

module.exports.disconnect = function (cb) {
  mongoose.connection.db
    .close(function (err) {
      console.info(chalk.yellow('Disconnected from MongoDB.'));
      return cb(err);
    });
};

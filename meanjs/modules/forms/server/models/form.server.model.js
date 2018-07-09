'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  chalk = require('chalk');

/**
 * Form Schema
 */

var FormsSchema = new Schema({
  question: {
    type: String,
    default: '',
    trim: true,
    required: 'question cannot be blank'
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'name cannot be blank'
  },
  column: {
    type: {
      type: String,
      default: '',
      trim: true,
      required: 'type cannot be blank'
    },
    size: {
      type: Number,
      default: 255,
      required: 'size cannot be blank'
    }
  },
  type: {
    type: String,
    default: '',
    trim: true,
    required: 'type cannot be blank'
  },
  index: {
    type: Number,
    default: 0,
    min: 0,
    required: 'index cannot be blank'
  },
  size: {
    type: Number,
    default: 0,
    min: 0,
    required: 'size cannot be blank'
  },
  items: [
    {
      name: {
        type: String,
        default: '',
        trim: true,
        required: 'name cannot be blank'
      },
      value: {
        type: String,
        default: '',
        trim: true,
        required: 'value cannot be blank'
      }
    }
  ]
});

// FormsSchema.statics.seed = seed;
//
// mongoose.model('Forms', FormsSchema);

var FormSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  version: {
    type: Number,
    default: 0,
    min: 0,
    required: 'Version cannot be blank'
  },
  forms: [FormsSchema]
});

FormSchema.statics.seed = seed;

mongoose.model('Form', FormSchema);

/**
* Seeds the form collection with document (Form)
* and provided options.
*/
function seed(doc, options) {
  var Form = mongoose.model('Form');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Form
          .findOne({
            title: doc.title
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Article (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Form\t' + doc.title + ' skipped')
          });
        }

        var form = new Form(doc);

        form.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Form\t' + form.title + ' added'
          });
        });
      });
    }
  });
}

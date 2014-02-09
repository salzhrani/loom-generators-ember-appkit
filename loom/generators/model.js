var inflector = require('../../lib/inflector');
var defaultGenerator = require('./default');
var parent = require('./default');
var generator = module.exports = Object.create(parent);
var app = generator.appPath;

generator.present = function(next,env) {
  // skip all the stuff inbetween
  var fields = env.params;
  parent.present(function(locals){
    locals.fields = parseFields(fields);
    locals.serverFields = parseServerFields(fields);
    next(locals);
  },env);  
};

function parseFields(map) {
  var fields = [];
  for (var key in map) {
    fields.push({name: key, type: map[key], comma: ','});
  }
  if (fields.length) {
    fields[fields.length - 1].comma = '';
  }
  return fields;
}
function parseServerFields(map) {
  var fields = [];
  for (var key in map) {
    fields.push({name: key, type: inflector.capitalize(map[key]), comma: ','});
  }
  if (fields.length) {
    fields[fields.length - 1].comma = '';
  }
  return fields;
}
generator.templates = [
  app+'/models/model.js.hbs',
  'server/models/model.js.hbs',
  ];

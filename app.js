'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const network = require('network');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  swaggerExpress.register(app);

  var port = process.env.PORT || 2580;

  app.listen(port);
  console.log(`eSaude Admin API listening on port ${port}`);
});

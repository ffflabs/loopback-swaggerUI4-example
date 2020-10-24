'use strict';

module.exports = async function (loopbackApp, options = {mountPath: ''}) {
  const path = require('path'),
    chalk = require('chalk'),
    debug = require('debug')('loopback:openapi3:swaggerUi'),
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

  const swaggerUi = require('swagger-ui-express'),
    createSwaggerObject = require('loopback-swagger').generateSwaggerSpec,
    router = loopbackApp.loopback.Router();

  Promise.delay(1000, createSwaggerObject(loopbackApp, options)).then(
    (swaggerDef) => {
      /*fs.writeFileAsync(
        `${__dirname}/../../swagger.ui.json`,
        JSON.stringify(swaggerDef, null, 2)
      );*/
      loopbackApp.use(
        options.mountPath,

        swaggerUi.serve,
        swaggerUi.setup(swaggerDef)
      );
      loopbackApp.use(router);
      var baseUrl = (loopbackApp.get('url') || '').replace(/\/$/, '');
      var swagerUiPath = options.mountPath;
      console.log(`
       Browse your API ${chalk.bold.green(
         'with OpenAPI'
       )} UI at ${chalk.bold.cyan(baseUrl + swagerUiPath)}
       `);
      return loopbackApp;
    }
  );

  loopbackApp.set('OpenAPI', options);
};

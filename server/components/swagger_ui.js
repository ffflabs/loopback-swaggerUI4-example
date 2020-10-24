'use strict';

module.exports = async function (loopbackApp, options = {mountPath: ''}) {
  const swaggerUi = require('swagger-ui-express'),
    createSwaggerObject = require('loopback-swagger').generateSwaggerSpec,
    router = loopbackApp.loopback.Router();

  loopbackApp.use(
    options.mountPath,
    swaggerUi.serve,
    swaggerUi.setup(createSwaggerObject(loopbackApp, options))
  );
  loopbackApp.use(router);

  loopbackApp.set('swager_ui', options);
};

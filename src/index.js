'use strict';

var Syncano = require('./syncano');
var syncanoService = require('./syncano-service');

module.exports = angular.module('ngSyncano', [])
    .factory('syncano', Syncano)
    .provider('syncanoService', syncanoService);

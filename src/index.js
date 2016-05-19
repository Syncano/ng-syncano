'use strict';

var Syncano = require('./syncano');
var syncanoConfig = require('./syncano-config');

module.exports = angular.module('ngSyncano', [])
    .factory('syncano', Syncano)
    .provider('syncanoConfig', syncanoConfig)
    .service('syncanoService', ['syncanoConfig', function(syncanoConfig){

        var syncanoObj = setSyncano();

        function setSyncano(){
            var syncano = syncanoConfig.Syncano;
            var userConfig = syncanoConfig.User;
            if (userConfig.username && userConfig.password){
                var User = syncano.User;
                var query = {instanceName: syncano.instance};
                var user = {
                    username: syncano.username,
                    password: syncano.password
                };

                return User.please().login(query, user)
                    .then(function(res){
                        syncano.userKey = res.user_key;
                        syncano.userDetails = res;
                        return syncano;
                    })
                    .catch(function(err){
                        throw new Error(err);
                    });
            } else if (userConfig.username || userConfig.password){
                throw new Error("You forgot either the username or the password!");
            } else {
                return syncano;
            }
        }

        return {
            setSyncanoUser: function(user){
                var syncano = syncanoConfig.Syncano;

                if (syncano.userKey){
                    delete syncano.userKey;
                }

                if (user.username && user.password){
                    var User = syncano.User;
                    var query = {instanceName: syncano.instance};
                    var credentials = {username: user.username, password: user.password};
                    return User.please().login(query, credentials)
                        .then(function(res){
                            syncano.userKey = res.user_key;
                            syncano.userDetails = res;
                            return syncano;
                        })
                        .catch(function(err){
                            throw new Error(err);
                        });
                } else if (user.username || user.password){
                    throw new Error("You forgot either the username or the password!");
                } else {
                    throw new Error("You need to put in user credentials!");
                }
            },

            getSyncano: function() {
                return syncanoObj;
            },

            removeSyncanoUser: function(){
                var syncano = syncanoConfig.Syncano;

                if (syncano.userKey){
                    delete syncano.userKey;
                    delete syncano.userDetails;
                }

                return "You have logged out.";
            }
        }
    }]);

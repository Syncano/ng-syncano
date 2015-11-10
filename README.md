# ng-syncano

[![NPM](https://img.shields.io/npm/v/ng-syncano.svg)](https://www.npmjs.com/package/ng-syncano)

## Getting Started
Using our Angular Service is simple! After you set it up, you'll be able to use Syncano API calls within Angular without having to import `syncano.js` anywhere else in your code.

This library is intended to be used with a [Syncano](http://www.syncano.io/) account. If you don't already have one - you can sign up [here](https://dashboard.syncano.io/?utm_source=ng-syncano&utm_medium=readme&utm_campaign=github).

**Install from Bower**

```bash
bower install ng-syncano --save
```

**Install from NPM**

```bash
npm install ng-syncano --save
```

## Injecting ngSyncano

Once you have put the `ng-syncano.js` or `ng-syncano.min.js` file in your `js` or `services` folder, you'll need to import ngSyncano so you can use it's API calls and services.

In your `app.js` file or the file that contains code that looks something like this:

```
var myApp = angular.module('myApp', []);
```

You'll need to insert the ngSyncano keyword in between the brackets like this:

```
var myApp = angular.module('myApp', ['ngSyncano']);
```

## Setting Up The Config

Next you'll need to set up the config part of your app, so that Syncano knows what your API details are.

In that same `app.js` file, put the following code:

```
myApp.config(function (syncanoServiceProvider) {
        syncanoServiceProvider.configure({
            apiKey: 'APIKEY/ACCOUNTKEY',
            instance: 'INSTANCE'
        });
    });
```

*Be aware that if you use more than one config for ngSyncano, only the first one will be used!*

## Using the `syncanoService` In Your Controller

After you have completely set up the config for ngSyncano in your app, you will need to inject the Syncano Service into your controller.

To use the Syncano API calls in your Angular controller, just include `syncanoService` in the `function` section of your controller. Then use `syncanoService` in front of your API calls as seen here:

```
myApp.controller('SyncanoController', function ($scope, syncanoService) {
        $scope.dataList = null;
        $scope.error = null;

        syncanoService.class('CLASS').dataobject().list()
            .then(function(res){
                // load the array of data objects into dataList
                $scope.dataList = res.objects;
            })
            .catch(function(err){
                $scope.error = err;
            });
    });
```

The `syncanoService` object will contain all of your API details, so you won't need to type them in again. Once you have imported `syncanoService` and have used it for an API call, the last step is to display it in the DOM or `html` page.

Here is an example one that goes well with the `list()` API call we used in the controller example:

```
<div ng-controller="SyncanoController">
    <div ng-if="error !== null" class="error"><p>{{error.message}}</p></div>
    <div ng-if="dataList !== null" class="data">
        <ul ng-repeat="data in dataList">
            <li>{{data.id}}</li>
        </ul>
    </div>
</div>
```

You would include this code in either your `view` or inbetween your `index.html` `<body>` tag, depending on how your Angular app is set up!

Look <a href="http://docs.syncano.io/" target="_blank">here</a> for more examples on our JS Library API calls.

For more details see `example.html` in this repo.

### Contributors

* Kelly Andrews  - [twitter](https://twitter.com/kellyjandrews), [github](https://github.com/kellyjandrews)
* Devin Visslailli - [twitter](https://twitter.com/devinviss), [github](https://github.com/devintyler)

### Change Log
* **1.0.0** - 2015-11-07
    * Initial Release

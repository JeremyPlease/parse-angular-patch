
Parse Angular Patch
=========

Brought to you by [Try.com](https://www.try.com)

  - Seamless Parse integration with AngularJS, using promises ($q)
  - Never worry about $scope digests again



How to use
----

I. [Grab the latest version of the patch here](https://raw2.github.com/jeremyplease/parse-angular-patch/master/dist/parse-angular.js) or install it using [Bower](http://bower.io/)

```
bower install parse-angular-patch-2
```

II. Include the module in your project

```javascript
angular.module('myApp', ['ngAnimate', 'parse-angular'])
```

III. That's it. How hard was that?! You can now do ANYWHERE in your angular app things such as :

```javascript
// Queries
var query = new Parse.Query("Monsters");
query.equalTo("name", "Frankeistein");
query.first()
.then(function(result){
        $scope.monsters = result;
});
// Cloud Code is patched too!
Parse.Cloud.run("myCloudCodeFunction", function(results) {
    $scope.data = results;
});
```

  And your scope will always be updated. Any asynchronous Parse method is patched and wrapped inside Angular kingdom (Parse.FacebookUtils methods, Parse.User methods, etc etc)
 

License
----

MIT
  
    

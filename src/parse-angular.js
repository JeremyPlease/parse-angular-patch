(function(window, undef){

	var angular = window.angular;

	if (angular !== undef) {

		var module = angular.module('parse-angular', []);

		module.run(['$q', '$window', function($q, $window){

			// Process only if Parse exist on the global window, do nothing otherwise
			if (!angular.isUndefined($window.Parse) && angular.isObject($window.Parse)) {

				// Keep a handy local reference
        var Parse = $window.Parse;

        //-------------------------------------
        // Structured object of what we need to update
        //-------------------------------------

        var methodsToUpdate = {
          "Object": {
            prototype: ['save', 'fetch', 'destroy'],
            static: ['saveAll', 'destroyAll']
          },
          "File": {
            prototype: ['save'],
            static: []
          },
          "Query": {
            prototype: ['find', 'first', 'count', 'get'],
            static: []
          },
          "Cloud": {
            prototype: [],
            static: ['run']
          },
          "User": {
            prototype: ['signUp'],
            static: ['requestPasswordReset', 'logIn']
          },
          "FacebookUtils": {
            prototype: [],
            static: ['logIn', 'link', 'unlink']
          },
          "Config": {
            prototype: [],
            static: ['get']
          }
        };

        //// Let's loop over Parse objects
        for (var k in methodsToUpdate) {

          var currentClass = k;
          var currentObject = methodsToUpdate[k];

          var currentProtoMethods = currentObject.prototype;
          var currentStaticMethods = currentObject.static;

          /// Patching prototypes
          currentProtoMethods.forEach(function(method){
            var origMethod = Parse[currentClass].prototype[method];

            // Overwrite original function by wrapping it with $q
            Parse[currentClass].prototype[method] = function() {
              return origMethod.apply(this, arguments).then(function(data){
                var defer = $q.defer();
                defer.resolve(data);
                return defer.promise;
              }, function(err){
                var defer = $q.defer();
                defer.reject(err);
                return defer.promise;
              });
            };
          });

          ///Patching static methods too
          currentStaticMethods.forEach(function(method){

            var origMethod = Parse[currentClass][method];

            // Overwrite original function by wrapping it with $q
            Parse[currentClass][method] = function() {
              return origMethod.apply(this, arguments).then(function(data){
                var defer = $q.defer();
                defer.resolve(data);
                return defer.promise;
              }, function(err){
                var defer = $q.defer();
                defer.reject(err);
                return defer.promise;
              });
            };
          });

        }
			}

		}]);

	}

})(this);

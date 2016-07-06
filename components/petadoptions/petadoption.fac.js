(function() {

	"use strict";

	angular
		.module("petAdoption")
		.factory('adoptionFactory', ['$http','$firebaseArray', function ($http, $firebaseArray) {

            var ref = firebase.database().ref();


            return {
                ref: $firebaseArray(ref)
            };

        }]);

})();
(function() {

    "use strict";

    angular
        .module('petAdoption')
        .controller('newAdoptionsCtrl', ['$scope', '$state', '$mdSidenav', '$mdDialog', '$timeout', '$stateParams', 'adoptionFactory', function($scope, $state, $mdSidenav, $mdDialog, $timeout, $stateParams, adoptionFactory) {

            var vm = this;

            vm.closeSidebar = closeSidebar;
            vm.saveAdoption = saveAdoption;

            //set label for the form
            vm.sidebarTitle = 'Add a Pet';

            $timeout(function() {
                $mdSidenav('left').open();
            });

            //checking to see if sidebar is closed, if so change state back to /#adoptions
            $scope.$watch('vm.sidenavOpen', function(sidenav){
            	if(sidenav === false){
            		$mdSidenav('left')
            			.close()
            			.then(function(){
            				$state.go('adoptions');
            			});
            	}
            });

            //closes sidebar
            function closeSidebar() {
            	vm.sidenavOpen = false;
            }


            //emits to the listener in the mian controller
            function saveAdoption(adoption) {
            	if(adoption) {
                    // Default contact info
                    // adoption.contact = {
                    //     name: "John Doe",
                    //     phone: "(555) 555-5555",
                    //     email: "jdoe@gmail.com"
                    // }
            		$scope.$emit('newAdoption', adoption);
            		vm.sidenavOpen = false;
            	}
            }

        }]);
})();

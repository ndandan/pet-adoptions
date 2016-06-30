(function() {

    "use strict";

    angular
        .module('petAdoption')
        .controller('newAdoptionsCtrl', ['$scope', '$state', '$mdSidenav', '$mdDialog', '$timeout', '$stateParams', 'adoptionFactory', function($scope, $state, $mdSidenav, $mdDialog, $timeout, $stateParams, adoptionFactory) {

            var vm = this;

            vm.closeSidebar = closeSidebar;
            vm.saveAdoption = saveAdoption;

            vm.sidebarTitle = 'Add a Pet';

            $timeout(function() {
                $mdSidenav('left').open();
            });

            $scope.$watch('vm.sidenavOpen', function(sidenav){
            	if(sidenav === false){
            		$mdSidenav('left')
            			.close()
            			.then(function(){
            				$state.go('adoptions');
            			});
            	}
            });

            function closeSidebar() {
            	vm.sidenavOpen = false;
            }

            function saveAdoption(adoption) {
            	if(adoption) {
                    adoption.contact = {
                        name: "John Doe",
                        phone: "(555) 555-5555",
                        email: "jdoe@gmail.com"
                    }
            		$scope.$emit('newAdoption', adoption);
            		vm.sidenavOpen = false;
            	}
            }

        }]);
})();

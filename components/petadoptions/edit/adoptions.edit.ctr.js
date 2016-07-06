(function() {

    "use strict";

    angular
        .module('petAdoption')
        .controller('editAdoptionsCtrl', ['$scope', '$state', '$mdSidenav', '$mdDialog', '$timeout', '$stateParams', 'adoptionFactory', function($scope, $state, $mdSidenav, $mdDialog, $timeout, $stateParams, adoptionFactory) {

            var vm = this;
            vm.adoptions = adoptionFactory.ref;
            vm.closeSidebar = closeSidebar;
            vm.saveEdit = saveEdit;
            vm.adoption = vm.adoptions.$getRecord($state.params.id);


            //sets the label for the form
            vm.sidebarTitle = 'Edit Pet Ad';

            $timeout(function() {
                $mdSidenav('left').open();
            });

            //checking to see if sidebar is closed, if so change state back to /#adoptions
            $scope.$watch('vm.sidenavOpen', function(sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function() {
                            $state.go('adoptions');
                        });
                }
            });


            //closes sidebar
            function closeSidebar() {
                vm.sidenavOpen = false;
            }

            //emits to the listener in the mian controller
            function saveEdit(adoption) {
                vm.adoptions.$save(vm.adoption).then(function() {
                    $scope.$emit('editSaved', 'Edit Saved!');
                    vm.sidenavOpen = false;
                });
            }
        }]);
})();

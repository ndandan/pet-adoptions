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

            vm.sidebarTitle = 'Edit Pet Ad';

            $timeout(function() {
                $mdSidenav('left').open();
            });

            $scope.$watch('vm.sidenavOpen', function(sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function() {
                            $state.go('adoptions');
                        });
                }
            });

            function closeSidebar() {
                vm.sidenavOpen = false;
            }

            function saveEdit(adoption) {
                vm.adoptions.$save(vm.adoption).then(function() {
                    $scope.$emit('editSaved', 'Edit Saved!');
                    vm.sidenavOpen = false;
                });
            }
        }]);
})();

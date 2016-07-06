(function() {

    "use strict";

    angular
        .module("petAdoption")
        .controller('adoptionCtrl', ['$scope', '$http', 'adoptionFactory', '$mdSidenav', '$mdToast', '$mdDialog', '$state', function($scope, $http, adoptionFactory, $mdSidenav, $mdToast, $mdDialog, $state) {

            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.deleteAdoption = deleteAdoption;
            vm.editAdoption = editAdoption;
            vm.openSidebar = openSidebar;
            vm.saveAdoption = saveAdoption;
            vm.saveEdit = saveEdit;

            vm.adoption;
            vm.adoptions;
            vm.categories;
            vm.editing;
            vm.petLogin = false;

            vm.adoptions = adoptionFactory.ref;
            vm.adoptions.$loaded().then(function(adoptions) {
                vm.categories = getCategories(adoptions);
            });

            $scope.$on('newAdoption', function(event, adoption) {
                vm.adoptions.$add(adoption);
                showToast('Pet Ad Saved!');
            });

            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            });

            function openSidebar() {
                $state.go('adoptions.new');
            }

            function closeSidebar() {
                $mdSidenav('left').close();
            }

            function saveAdoption(adoption) {
                if (adoption) {
                    // adoption.contact = contact;
                    vm.adoptions.push(adoption);
                    vm.adoption = {};
                    closeSidebar();
                    showToast("Pet Ad Saved!");
                }

            }

            function editAdoption(adoption) {
                $state.go('adoptions.edit', {
                    id: adoption.$id
                });
            }

            function saveEdit() {
                vm.editing = false;
                vm.adoption = {};
                closeSidebar();
                showToast("Update Saved!");
            }

            function deleteAdoption(event, adoption) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete ' + adoption.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function() {
                    vm.adoptions.$remove(adoption);
                    showToast("Pet Ad Deleted!");
                }, function() {});
            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(4000)
                );
            }

            function getCategories(adoptions) {

                var categories = [];

                angular.forEach(adoptions, function(item) {
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }


        }]);

})();

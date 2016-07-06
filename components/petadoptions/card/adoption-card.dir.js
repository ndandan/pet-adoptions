(function() {

    "use strict";

    angular
        .module("petAdoption")
        .directive('adoptionCard', function() {
            return {
                templateUrl: "components/petadoptions/card/adoption-card.tpl.html",
                scope: {
                    adoptions: "=adoptions",
                    adoptionsFilter: "=adoptionsFilter",
                    category: "=category",
                    petLogin: "=petLogin"
                },
                controller: adoptionCardCtrl,
                controllerAs: "vm"
            };


            function adoptionCardCtrl($state, $scope, $mdDialog) {

                var vm = this;
                vm.editAdoption = editAdoption;
                vm.deleteAdoption = deleteAdoption;


                function editAdoption(adoption) {
                    $state.go('adoptions.edit', {
                        id: adoption.$id
                    });
                }

                function deleteAdoption(event, adoption) {
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure you want to delete ' + adoption.title + '?')
                        .targetEvent(event)
                        .ok('Yes')
                        .cancel('No');
                    $mdDialog.show(confirm).then(function() {
                        $scope.adoptions.$remove(adoption);
                    }, function() {

                    });
                }

                function showToast(message) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content(message)
                        .position('top, right')
                        .hideDelay(4000)
                    );
                }



            }
        });

})();

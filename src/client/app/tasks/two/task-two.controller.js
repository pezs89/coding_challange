(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TaskTwo', TaskTwo);

    TaskTwo.$inject = ['dataservice', 'logger', '$scope'];
    /* @ngInject */
    function TaskTwo(dataservice, logger, $scope) {
        var vm = this;
        vm.dropdownList = [];
        vm.problem2Solved = problem2Solved;

        activate();

        function activate() {
            return dataservice.getTaskTwo().then(function (data) {
                vm.checkBoxes = data;
                return vm.checkBoxes;
            });
        }
        function problem2Solved() {
            logger.success('Hurray!', '');
        }

        function setCheckBoxValidity(list) {
            var isValid = list.length > 0;
            $scope.testForm.checkBox.$setValidity('required', isValid);
        }

        function setDropDownListElements(list) {
            vm.dropdownList = list;
        }

        var unwatchCheckboxes = $scope.$watch(function () { return vm.checkBoxes; }, function (newVal, oldVal) {
            if (angular.isDefined(newVal) && newVal !== oldVal) {
                var selectedCheckBoxesList = vm.checkBoxes.filter(function (checkBox) { return checkBox.id === true; });
                setCheckBoxValidity(selectedCheckBoxesList);
                setDropDownListElements(selectedCheckBoxesList);
            }
        }, true);

        $scope.$on('destroy', function () {
            unwatchCheckboxes();
        });
    }

})();

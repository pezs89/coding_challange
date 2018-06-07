(function() {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TaskOne', TaskOne);

    TaskOne.$inject = ['dataservice', 'logger'];

    function TaskOne(dataservice, logger) {
        var vm = this;
        vm.title = "Problem 1";
        vm.bowerJsonData = { test: "hello" };
        vm.activeBox;
        vm.clickBox = clickBox;
        activate();

        function activate(){
            dataservice.getTaskOne().then(function(data){
                vm.boxes = data;
            });
        }

        function clickBox(clickedBox) {
            vm.activeBox = clickedBox;
        }
    }
})();
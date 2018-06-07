(function () {
    'use strict';

    angular
        .module('app.tasks')
        .controller('TaskFour', TaskFour);

    TaskFour.$inject = ['dataservice', 'logger'];
    /* @ngInject */
    function TaskFour(dataservice, logger) {
        var vm = this;
        vm.showInput = false;
        vm.toggleInstructions = toggleInstructions;
        vm.title = 'Task 4';
        vm.demoResult = '';        
        vm.result = '';

        var mock = [
            ['ULL'],
            ['RRDDD'],
            ['LURDL'],
            ['UUUUD']
        ];

        var keypad = [
            ['', '', '1', '', ''],
            ['', '2', '3', '4', ''],
            ['5', '6', '7', '8', '9'],
            ['', 'A', 'B', 'C', ''],
            ['', '', 'D', '', ''],
        ];

        var startPoint = {
            x: 0,
            y: 2
        };

        function resetStartPoint() {
            startPoint.x = 0;
            startPoint.y = 2;
        }

        function getKeypadCharacters(characterList) {
            var resultList = [];
            for (var i = 0; i <= characterList.length - 1; i++) {
                resultList.push(getNewPosition(startPoint, characterList[i]));
            }
            return resultList.join('');
        }

        function getNewPosition(point, character) {
            for (var i = 0; i <= character[0].length - 1; i++) {
                switch (character[0][i]) {
                case 'U':
                    startPoint = checkNewPosition(startPoint.y - 1, startPoint.x);
                    break;
                case 'L':
                    startPoint = checkNewPosition(startPoint.y, startPoint.x - 1);
                    break;
                case 'R':
                    startPoint = checkNewPosition(startPoint.y, startPoint.x + 1);        
                    break;
                case 'D':
                    startPoint = checkNewPosition(startPoint.y + 1, startPoint.x);            
                    break;
                default:
                    break;
                }
            }
            return keypad[startPoint.y][startPoint.x];
        }

        function checkNewPosition(posY, posX) {
            if (keypad[posY] && keypad[posX] && keypad[posY][posX]) {
                return {
                    x: posX, y: posY
                };
            } else {
                return startPoint;
            }
        }

        vm.demoResult = getKeypadCharacters(mock);
        activate();

        function activate() {
            dataservice.getInput().then(function (data) {
                vm.input = data;
                resetStartPoint();
                vm.result = getKeypadCharacters(vm.input);
            });
        }

        function toggleInstructions() {
            vm.showInput = !vm.showInput;
        }

    }

})();

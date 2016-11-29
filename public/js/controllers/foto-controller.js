angular.module('alurapic').controller('FotoController', function($scope, $http) {

    $scope.foto = {};

    $scope.submeter = function() {
        console.log($scope.foto);
    }
});
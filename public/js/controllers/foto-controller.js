angular.module('alurapic').controller('FotoController', function($scope, $http, fotoResource, $routeParams) {

    $scope.foto = {};
    $scope.mensagem = '';

    if($routeParams.fotoId) {
        fotoResource.get({fotoId: $routeParams.fotoId}, function(foto) {
            $scope.foto = foto; 
        }, function(erro) {
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto'
        });
    }

    $scope.submeter = function() {
        
        if($scope.formulario.$valid) {
            if($scope.foto._id) {

                fotoResource.update({fotoId:$scope.foto._id}, $scope.foto, function() {
                    $scope.mensagem = 'A foto ' + $scope.foto.titulo + ' foi alterada com sucesso.';
                }, function() {
                    console.log(error);
                    $scope.mensagem = 'Não foi alterar a foto ' + $scope.foto.titulo + '.';
                });

            } else {
                fotoResource.save($scope.foto, function() {
                    $scope.foto = {};
                    $scope.mensagem = 'Foto cadastrada com sucesso';
                }, function(erro) {
                    console.log(erro);
                    $scope.mensagem = 'Não foi possível cadastrar a foto';
                });
            }
        }
    };
});
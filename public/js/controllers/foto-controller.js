angular.module('alurapic').controller('FotoController', function($scope, $http, $resource, $routeParams) {

    $scope.foto = {};
    $scope.mensagem = '';

    var fotoResource = $resource('v1/fotos/:fotoId', null, {
        update: {
            method: 'PUT'
        }
    });

    if($routeParams.fotoId) {
        $http.get('v1/fotos/' + $routeParams.fotoId)
            .success(function(foto) {
            $scope.foto = foto;
        })
        .error(function(error) {
            console.log(error);
            console.log('Não foi possivel obter a foto.');
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
                $http.post('v1/fotos', $scope.foto)
                    .success(function() {
                        $scope.foto = {};
                        $scope.mensagem = 'Foto incluida com sucesso.';
                    })
                    .error(function(error){
                        console.log(error);
                        $scope.mensagem = 'Não foi possivel incluir a foto.';
                    });
            }
        }
    };
});
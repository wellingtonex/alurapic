angular.module('alurapic').controller('FotosController', function($scope, $http, $resource) {

  $scope.fotos = [];
  $scope.filtro = '';
  $scope.mensagem = '';

  var fotoResource = $resource('v1/fotos/:fotoId');

  fotoResource.query(function(fotos) {
    $scope.fotos = fotos;
  }, function(error){
    console.log(error);
  });

  $scope.remover = function (foto) {
    fotoResource.delete({fotoId : foto._id}, function() {
      var indiceFoto = $scope.fotos.indexOf(foto);
        $scope.fotos.splice(indiceFoto, 1);
        $scope.mensagem = 'Foto ' + foto.titulo + ' foi removida com sucesso.';
    }, function(error) {
      console.log(error);
      $scope.mensagem = 'Não foi possivel remover a foto ' + foto.titulo  + '.';
    });
  };
});
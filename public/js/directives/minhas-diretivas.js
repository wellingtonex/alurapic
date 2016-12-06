angular
    .module('minhasDiretivas', ['meusServicos'])
    .directive('meuPainel', function() {
        var ddo = {};
        ddo.restict = "AE";
        ddo.scope = {
            titulo: '@'            
        };
        ddo.transclude = true;
        ddo.templateUrl = 'js/directives/meu-painel.html'; 
        return ddo;
    }).directive('minhaFoto', function() {

        var ddo = {};

        ddo.restrict = "AE";

        ddo.scope = {
            titulo: '@',
            url: '@'
        };

        ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';           

        return ddo;

    }).directive('meuBotaoPerigo', function() {
        var ddo = {};
        ddo.restrict = 'E';
        ddo.scope = {
            nome: '@', //passa uma copia de valor
            acao: '&' //quando esto passando uma expressao, passa uma referencia
        };
        ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao(foto)">{{nome}}</button>';
        return ddo;
    }).directive('meuFocus', function() {
        var ddo = {};
        ddo.restrict = "A";

        ddo.link = function(scope, element) {
            scope.$on('fotoCadastrada', function() {
                element[0].focus();
            });
        };

        return ddo;
    }).directive('meusTitulos', function() {
        var ddo = {};
        ddo.restrict = 'E';
        ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
        ddo.controller = function($scope, fotoResource) {
            fotoResource.query(function(fotos) {
                $scope.titulos = fotos.map(function(foto) {
                    return foto.titulo;
                });    
            });
        };
        return ddo;
    });
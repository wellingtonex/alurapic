angular
    .module('meusServicos', ['ngResource'])
    .factory('fotoResource', function ($resource) {

        return $resource('v1/fotos/:fotoId', null, {
            update: {
                method: 'PUT'
            }
        });
    }).factory('cadastroDeFotos', function(fotoResource, $q, $rootScope) {

        var servico = {};
        var evento = 'fotoCadastrada';

        servico.cadastrar = function (foto) {
            return $q(function(resolve, reject) {
                if(foto._id) {

                    fotoResource.update({fotoId:foto._id}, foto, function() {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso.',
                            inclusao: false                            
                        })
                    }, function(error) {
                        console.log(error);
                        reject({
                            mensagem:'Não foi possivel alterar a foto ' + foto.titulo + '.'
                        })
                    });
                } else {
                    fotoResource.save(foto, function() {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem: 'Foto ' + foto.titulo + ' incluida com sucesso.',
                            inclusao:true
                        }, function(error) {
                            console.log(error);
                            reject({
                                mensagem: 'Não foi possivel incluir a foto ' + foto.titulo + '.'
                            });
                        });
                    });
                }
            });
        };

        return servico;
    });

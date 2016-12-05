angular
    .module('fotoService', ['ngResource'])
    .factory('fotoResource',function ($resource) {

        return fotoResource = $resource('v1/fotos/:fotoId', null, {
            update: {
                method: 'PUT'
            }
        });
    });
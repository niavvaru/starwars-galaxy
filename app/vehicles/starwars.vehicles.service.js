(function () {
    var StarWarsVehiclesService = function ($http, VEHICLES_URL) {
        
        var getVehiclesByPageId = function (callback, pageId) {
            $http.get(VEHICLES_URL + '?page=' + pageId)
                .then(
                function (response) {
                    if (response && response.status == 200) {
                        callback(response, null);
                    } else {
                        callback(null, new Error('FAILED TO GET FILMS. Please try again'));
                    }
                },
                function (response) {
                    callback(null, new Error('FAILED TO GET FILMS. Please try again'));
                }
                );
        }
        
        var getVehicleById = function (callback, filmId) {
            $http.get(VEHICLES_URL + '/' + filmId)
                .then(
                function (response) {
                    if (response && response.status == 200) {
                        callback(response, null);
                    } else {
                        callback(null, new Error('FAILED TO GET FILM. Please try again'));
                    }
                },
                function (response) {
                    callback(null, new Error('FAILED TO GET FILM. Please try again'));
                }
                );
        }

        return {
            getVehiclesByPageId: getVehiclesByPageId,
            getVehicleById: getVehicleById
        }

    }

    StarWarsVehiclesService.$inject = [
        "$http",
        "VEHICLES_URL"
    ];
    
    angular.module("starWarsGalaxy").service("StarWarsVehiclesService", StarWarsVehiclesService);
}());
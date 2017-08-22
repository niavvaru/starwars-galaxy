(function () {
    var StarWarsPlanetsService = function ($http, PLANETS_URL) {
        
        var getPlanetsByPageId = function (callback, pageId) {
            $http.get(PLANETS_URL + '?page=' + pageId)
                .then(
                function (response) {
                    if (response && response.status == 200) {
                        callback(response, null);
                    } else {
                        callback(null, new Error('FAILED TO GET PLANETS. Please try again'));
                    }
                },
                function (response) {
                    callback(null, new Error('FAILED TO GET PLANETS. Please try again'));
                }
                );
        }
        
        var getPlanetById = function (callback, filmId) {
            $http.get(PLANETS_URL + '/' + filmId)
                .then(
                function (response) {
                    if (response && response.status == 200) {
                        callback(response, null);
                    } else {
                        callback(null, new Error('FAILED TO GET PLANET. Please try again'));
                    }
                },
                function (response) {
                    callback(null, new Error('FAILED TO GET PLANET. Please try again'));
                }
                );
        }

        return {
            getPlanetsByPageId: getPlanetsByPageId,
            getPlanetById: getPlanetById
        }

    }

    StarWarsPlanetsService.$inject = [
        "$http",
        "PLANETS_URL"
    ];
    
    angular.module("starWarsGalaxy").service("StarWarsPlanetsService", StarWarsPlanetsService);
}());
(function () {
    var StarWarsStarShipsService = function ($http, STARSHIPS_URL) {
        
        var getStarShipsByPageId = function (callback, pageId) {
            $http.get(STARSHIPS_URL + '?page=' + pageId)
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
        
        var getStarShipById = function (callback, filmId) {
            $http.get(STARSHIPS_URL + '/' + filmId)
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
            getStarShipsByPageId: getStarShipsByPageId,
            getStarShipById: getStarShipById
        }

    }

    StarWarsStarShipsService.$inject = [
        "$http",
        "STARSHIPS_URL"
    ];
    
    angular.module("starWarsGalaxy").service("StarWarsStarShipsService", StarWarsStarShipsService);
}());
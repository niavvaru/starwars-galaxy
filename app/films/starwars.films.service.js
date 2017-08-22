(function () {
    var StarWarsFilmsService = function ($http, FILMS_URL) {
        
        var getFilmsByPageId = function (callback, pageId) {
            $http.get(FILMS_URL + '?page=' + pageId)
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
        
        var getFilmById = function (callback, filmId) {
            $http.get(FILMS_URL + '/' + filmId)
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
            getFilmsByPageId: getFilmsByPageId,
            getFilmById: getFilmById
        }

    }

    StarWarsFilmsService.$inject = [
        "$http",
        "FILMS_URL"
    ];
    
    angular.module("starWarsGalaxy").service("StarWarsFilmsService", StarWarsFilmsService);
}());
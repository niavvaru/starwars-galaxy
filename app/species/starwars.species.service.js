(function () {
    var StarWarsSpeciesService = function ($http, SPECIES_URL) {
        
        var getSpeciesByPageId = function (callback, pageId) {
            $http.get(SPECIES_URL + '?page=' + pageId)
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
        
        var getSpeciesById = function (callback, filmId) {
            $http.get(SPECIES_URL + '/' + filmId)
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
            getSpeciesByPageId: getSpeciesByPageId,
            getSpeciesById: getSpeciesById
        }

    }

    StarWarsSpeciesService.$inject = [
        "$http",
        "SPECIES_URL"
    ];
    
    angular.module("starWarsGalaxy").service("StarWarsSpeciesService", StarWarsSpeciesService);
}());
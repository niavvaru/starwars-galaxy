(function () {
    var StarWarsPeopleService = function ($http, PEOPLE_URL) {

        var getPeopleByPageId = function (callback, pageId) {
            $http.get(PEOPLE_URL + '?page=' + pageId)
                .then(
                function (response) {
                    if (response && response.status == 200) {
                        callback(response, null);
                    } else {
                        callback(null, new Error('FAILED TO GET PEOPLE. Please try again'));
                    }
                },
                function (response) {
                    callback(null, new Error('FAILED TO GET PEOPLE. Please try again'));
                }
                );
        }

        var getPersonById = function (callback, personId) {
            $http.get(PEOPLE_URL + '/' + personId)
                .then(
                function (response) {
                    if (response && response.status == 200) {
                        callback(response, null);
                    } else {
                        callback(null, new Error('FAILED TO GET PEOPLE. Please try again'));
                    }
                },
                function (response) {
                    callback(null, new Error('FAILED TO GET PEOPLE. Please try again'));
                }
                );
        }

        return {
            getPeopleByPageId: getPeopleByPageId,
            getPersonById: getPersonById
        }
    }

    StarWarsPeopleService.$inject = [
        "$http",
        "PEOPLE_URL"
    ];

    angular.module("starWarsGalaxy").service("StarWarsPeopleService", StarWarsPeopleService);
}());
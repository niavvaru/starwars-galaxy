angular.module("starWarsGalaxy", ["ui.router", "ngMaterial"]);

(function () {

    var appMgmt = function ($rootScope, $transitions) {
        $transitions.onSuccess({}, function($transition) {
            $rootScope.currentRoute = $transition.router.stateService.$current.name;
        })
    }

    appMgmt.$inject = ["$rootScope", "$transitions"];

    angular.module("starWarsGalaxy").run(appMgmt);
}());
(function() {
    var APP_BASE_URL = "https://swapi.co/api/";
    angular.module('starWarsGalaxy').constant('APP_BASE_URL', APP_BASE_URL);
    angular.module('starWarsGalaxy').constant('FILMS_URL', APP_BASE_URL+'films/');
    angular.module('starWarsGalaxy').constant('PEOPLE_URL', APP_BASE_URL+'people/');
    angular.module('starWarsGalaxy').constant('PLANETS_URL', APP_BASE_URL+'planets/');
    angular.module('starWarsGalaxy').constant('SPECIES_URL', APP_BASE_URL+'species/');
    angular.module('starWarsGalaxy').constant('STARSHIPS_URL', APP_BASE_URL+'starships/');
    angular.module('starWarsGalaxy').constant('VEHICLES_URL', APP_BASE_URL+'vehicles/');
}());
(function(){
    var app = angular.module("starWarsGalaxy");
    
    var AppRoutes = function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state("people", {
            url: "/people",
            templateUrl: "./app/people/people.html",
            controller: "PeopleListController"
        });
        
        $stateProvider.state("films", {
            url: "/films",
            templateUrl: "./app/films/films.html",
            controller: "FilmsListController"
        });

        $stateProvider.state("planets", {
            url: "/planets",
            templateUrl: "./app/planets/planets.html",
            controller: "PlanetsListController"
        });

        $stateProvider.state("species", {
            url: "/species",
            templateUrl: "./app/species/species.html",
            controller: "SpeciesListController"
        });

        $stateProvider.state("starships", {
            url: "/starships",
            templateUrl: "./app/starships/starships.html",
            controller: "StarShipsListController"
        });

         $stateProvider.state("vehicles", {
            url: "/vehicles",
            templateUrl: "./app/vehicles/vehicles.html",
            controller: "VehiclesListController"
        });

        $urlRouterProvider.otherwise("/people");
    }

    AppRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    app.config(AppRoutes);

}());
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
(function () {
    var utils = function ($mdSidenav) {

        var getIdFromUrl = function (url) {
            var id = 0;
            if (url) {
                var temp = url.split('/');
                id = temp[temp.length - 2] || 0;
            }
            return id;
        }

        var getBaseViewStateConfig = function (viewType) {
            return {
                showProgressBar: false,
                searchTerm: "",
                pageId: 1,
                nextBtnDisabled: false,
                prevBtnDisabled: true,
                prevPageLink: "",
                nextPageLink: "",
                errorMessage: "",
                pageNumbers: []
            }
        }

        var getPageNumbers = function (totalCount, pageSize) {
            var pageNumbers = [];
            var totalNumberOfPages = 0;
            if (totalCount && totalCount > pageSize) {
                totalNumberOfPages = Math.ceil(totalCount / pageSize);
            }
            _.times(totalNumberOfPages, function (i) {
                pageNumbers[i] = i + 1;
            })
            return pageNumbers;

        }

        var toggleLeft = function () {
            $mdSidenav('left').toggle();
        };
        
        var toggleRight = function () {
            $mdSidenav('right').toggle();
        };

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        return {
            getIdFromUrl: getIdFromUrl,
            getBaseViewStateConfig: getBaseViewStateConfig,
            getPageNumbers: getPageNumbers,
            toggleLeft: toggleLeft,
            toggleRight: toggleRight
        }
    }

    utils.$inject = ["$mdSidenav"];

    angular.module("starWarsGalaxy").service("utils", utils);
}());
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
(function () {
    var GlobalController = function ($scope, StarWarsFilmsService, utils) {

        $scope.getNext = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePlanet = {};
            $scope.viewState.pageId += 1;
            getFilms($scope.viewState.pageId);
        }
        $scope.getPrev = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePlanet = {};
            $scope.viewState.pageId -= 1;
            getFilms($scope.viewState.pageId);

        }
    }

    GlobalController.$inject = ["$scope", "StarWarsFilmsService", "utils"];

    angular.module("starWarsGalaxy").controller("GlobalController", GlobalController);
}());
(function () {
    var FilmsListController = function ($scope, StarWarsFilmsService, utils) {


        $scope.filmsResultsCallback = function (response, error) {
            var viewState = $scope.viewState;
            if (error) {
                viewState.errorMessage = error;
            } else if (response && response.status == 200) {
                viewState.errorMessage = "";
                viewState.films = response.data.results;
                viewState.activeFilm = response.data.results[0];
                viewState.totalFilms = response.data.count;
                viewState.nextPageLink = response.data.next;
                viewState.prevPageLink = response.data.previous;
                viewState.prevBtnDisabled = !viewState.prevPageLink;
                viewState.nextBtnDisabled = !viewState.nextPageLink;
                viewState.lastFilmRetrieved = utils.getIdFromUrl(viewState.films[viewState.films.length - 1].url);
                if(viewState.nextPageLink) {
                    viewState.pageNumbers = utils.getPageNumbers(viewState.totalFilms, viewState.films.length);
                }
            }
            viewState.searchTerm = "";
            viewState.showProgressBar = false;
        }

        $scope.getNextFilms = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePlanet = {};
            $scope.viewState.pageId += 1;
            getFilms($scope.viewState.pageId);
        }
        $scope.getPrevFilms = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePlanet = {};
            $scope.viewState.pageId -= 1;
            getFilms($scope.viewState.pageId);

        }
        $scope.setActiveFilm = function (film) {
            $scope.viewState.activeFilm = $scope.viewState.films.filter(function(_film) {
                return _film.title === film.title;
            })[0];
            $scope.toggleLeft();
        }

        $scope.toggleLeft = utils.toggleLeft;

        function getFilms(pageId) {
            $scope.viewState.errorMessage = "Please wait while we get the next set of films for you";
            StarWarsFilmsService.getFilmsByPageId($scope.filmsResultsCallback, pageId);
        }

        function viewStateInit($scope) {
            $scope.viewState = utils.getBaseViewStateConfig();
            $scope.viewState['totalPlanets'] = '';
            $scope.viewState['lastFilmRetrieved'] = 0;
            $scope.viewState['films'] = [];
            $scope.viewState['activeFilm'] = {};
        }

        function init() {
            viewStateInit($scope);
            getFilms($scope.viewState.pageId);
        }

        init();
        
    }

    FilmsListController.$inject = ["$scope", "StarWarsFilmsService", "utils"];

    angular.module("starWarsGalaxy").controller("FilmsListController", FilmsListController);
}());
(function () {
    var PeopleListController = function ($scope, StarWarsPeopleService, utils, $mdSidenav, $mdMedia) {

        $scope.peopleResultsCallback = function (response, error) {
            var viewState = $scope.viewState;
            if (error) {
                viewState.errorMessage = error;
            } else if (response && response.status == 200) {
                viewState.errorMessage = "";
                viewState.people = response.data.results;
                viewState.activePerson = viewState.people[0];
                viewState.totalPeople = response.data.count;
                viewState.nextPageLink = response.data.next;
                viewState.prevPageLink = response.data.previous;
                viewState.prevBtnDisabled = !viewState.prevPageLink;
                viewState.nextBtnDisabled = !viewState.nextPageLink;
                viewState.lastPersonRetrieved = utils.getIdFromUrl(viewState.people[viewState.people.length - 1].url);
                if (viewState.nextPageLink) {
                    viewState.pageNumbers = utils.getPageNumbers(viewState.totalPeople, viewState.people.length);
                }
            }
            viewState.searchTerm = "";
            viewState.showProgressBar = false;
        }

        $scope.getNextPeople = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePerson = {};
            $scope.viewState.pageId += 1;
            getPeople($scope.viewState.pageId);
        }
        $scope.getPrevPeople = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePerson = {};
            $scope.viewState.pageId -= 1;
            getPeople($scope.viewState.pageId);

        }
        $scope.setActivePerson = function (person) {
            $scope.viewState.activePerson = $scope.viewState.people.filter(function(_person) {
                return _person.name === person.name;
            })[0];
            $scope.toggleLeft();
        }
        
        $scope.toggleLeft = utils.toggleLeft;

        function getPeople(pageId) {
            $scope.viewState.errorMessage = "Please wait while we fetch next group of people for you";
            StarWarsPeopleService.getPeopleByPageId($scope.peopleResultsCallback, pageId);
        }

        function viewStateInit($scope) {
            $scope.viewState = utils.getBaseViewStateConfig();
            $scope.viewState['totalPeople'] = '';
            $scope.viewState['lastPersonRetrieved'] = 0;
            $scope.viewState['people'] = [];
            $scope.viewState['activePerson'] = {};
        }

        function init() {
            viewStateInit($scope);
            getPeople($scope.viewState.pageId);
        }

        init();

    }

    PeopleListController.$inject = ["$scope", "StarWarsPeopleService", "utils", "$mdSidenav"];

    angular.module("starWarsGalaxy").controller("PeopleListController", PeopleListController);
}());
(function () {
    var PlanetsListController = function ($scope, StarWarsPlanetsService, utils) {

        $scope.planetsResultsCallback = function (response, error) {
            var viewState = $scope.viewState;
            if (error) {
                viewState.errorMessage = error;
            } else if (response && response.status == 200) {
                viewState.errorMessage = "";
                viewState.planets = response.data.results;
                viewState.activePlanet = viewState.planets[0];
                viewState.totalPlanets = response.data.count;
                viewState.nextPageLink = response.data.next;
                viewState.prevPageLink = response.data.previous;
                viewState.prevBtnDisabled = !viewState.prevPageLink;
                viewState.nextBtnDisabled = !viewState.nextPageLink;
                viewState.firstPlanetRetrieved = utils.getIdFromUrl(viewState.planets[0].url);
                viewState.lastPlanetRetrieved = utils.getIdFromUrl(viewState.planets[viewState.planets.length - 1].url);
                if(viewState.nextPageLink) {
                    viewState.pageNumbers = utils.getPageNumbers(viewState.totalPlanets, viewState.planets.length);
                }
            }
            viewState.searchTerm = "";
            viewState.showProgressBar = false;
        }

        $scope.getNextPlanets = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePlanet = {};
            $scope.viewState.pageId += 1;
            getPlanets($scope.viewState.pageId, true);
        }
        $scope.getPrevPlanets = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePlanet = {};
            $scope.viewState.pageId -= 1;
            getPlanets($scope.viewState.pageId, true);
            
        }

        $scope.getPlanetsByPageId = function(pageId) {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePlanet = {};
            $scope.viewState.pageId = pageId;
            getPlanets($scope.viewState.pageId);
        }

        $scope.setActivePlanet = function (planet) {
            $scope.viewState.activePlanet = $scope.viewState.planets.filter(function(_planet){
                return _planet.name === planet.name;
            })[0];
            $scope.toggleLeft();
        }

        $scope.toggleLeft = utils.toggleLeft;

        function getPlanets(pageId, fromNextPrev) {
            $scope.viewState.errorMessage = "Please wait while we watch next group of planets for you";
            StarWarsPlanetsService.getPlanetsByPageId($scope.planetsResultsCallback, pageId);
        }

        function viewStateInit($scope) {
            $scope.viewState = utils.getBaseViewStateConfig();
            $scope.viewState['totalPlanets'] = '';
            $scope.viewState['lastPlanetRetrieved'] = 0;
            $scope.viewState['planets'] = [];
            $scope.viewState['activePlanet'] = {};
        }

        function init() {
            viewStateInit($scope);
            getPlanets($scope.viewState.pageId);
        }
        
        init();

    }

    PlanetsListController.$inject = ["$scope", "StarWarsPlanetsService", "utils"];

    angular.module("starWarsGalaxy").controller("PlanetsListController", PlanetsListController);
}());
(function () {
    var SpeciesListController = function ($scope, StarWarsSpeciesService, utils) {

        $scope.speciesResultsCallback = function (response, error) {
            var viewState = $scope.viewState;
            if (error) {
                viewState.errorMessage = error;
            } else if (response && response.status == 200) {
                viewState.errorMessage = "";
                viewState.species = response.data.results;
                viewState.activeSpecies = viewState.species[0];
                viewState.totalSpecies = response.data.count;
                viewState.nextPageLink = response.data.next;
                viewState.prevPageLink = response.data.previous;
                viewState.prevBtnDisabled = !viewState.prevPageLink;
                viewState.nextBtnDisabled = !viewState.nextPageLink;
                viewState.lastSpeciesRetrieved = utils.getIdFromUrl(viewState.species[viewState.species.length - 1].url);
                if(viewState.nextPageLink) {
                    viewState.pageNumbers = utils.getPageNumbers($scope.viewState.totalSpecies, $scope.viewState.species.length);
                }
            }
            viewState.searchTerm = "";
            viewState.showProgressBar = false;
        }

        $scope.getNextSpecies = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activeSpecies = {};
            $scope.viewState.pageId += 1;
            getSpecies($scope.viewState.pageId);
        }
        $scope.getPrevSpecies = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activeSpecies = {};
            $scope.viewState.pageId -= 1;
            getSpecies($scope.viewState.pageId);
            
        }
        $scope.setActiveSpecies = function (species) {
            $scope.viewState.activeSpecies = $scope.viewState.species.filter(function(_species){
                return _species.name === species.name;
            })[0];
            $scope.toggleLeft();
        }

        $scope.toggleLeft = utils.toggleLeft;

        function getSpecies(pageId) {
            $scope.viewState.errorMessage = "Please wait while we fetch the next sepcies for you";
            StarWarsSpeciesService.getSpeciesByPageId($scope.speciesResultsCallback, pageId);
        }

        function viewStateInit($scope) {
            $scope.viewState = utils.getBaseViewStateConfig();
            $scope.viewState['totalSpecies'] = '';
            $scope.viewState['lastSpeciesRetrieved'] = 0;
            $scope.viewState['species'] = [];
            $scope.viewState['activeSpecies'] = {};
        }

        function init() {
            viewStateInit($scope);
            getSpecies($scope.viewState.pageId);
        }
        
        init();

    }

    SpeciesListController.$inject = ["$scope", "StarWarsSpeciesService", "utils"];

    angular.module("starWarsGalaxy").controller("SpeciesListController", SpeciesListController);
}());
(function () {
    var StarShipsListController = function ($scope, StarWarsStarShipsService, utils) {

        $scope.starShipsResultsCallback = function (response, error) {
            var viewState = $scope.viewState;
            if (error) {
                viewState.errorMessage = error;
            } else if (response && response.status == 200) {
                viewState.errorMessage = "";
                viewState.starShips = response.data.results;
                viewState.activeStarShip = viewState.starShips[0];
                viewState.totalStarShips = response.data.count;
                viewState.nextPageLink = response.data.next;
                viewState.prevPageLink = response.data.previous;
                viewState.prevBtnDisabled = !viewState.prevPageLink;
                viewState.nextBtnDisabled = !viewState.nextPageLink;
                viewState.lastStarShipRetrieved = utils.getIdFromUrl(viewState.starShips[viewState.starShips.length - 1].url);
                if(viewState.nextPageLink) {
                    viewState.pageNumbers = utils.getPageNumbers($scope.viewState.totalStarShips, $scope.viewState.starShips.length);
                }
            }
            viewState.searchTerm = "";
            viewState.showProgressBar = false;
        }

        $scope.getNextStarShips = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activeStarShip = {};
            $scope.viewState.pageId += 1;
            getStarShips($scope.viewState.pageId)
        }
        $scope.getPrevStarShips = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activeStarShip = {};
            $scope.viewState.pageId -= 1;
            getStarShips($scope.viewState.pageId)
        }
        $scope.setActiveStarShip = function (starShip) {
            $scope.viewState.activeStarShip = $scope.viewState.starShips.filter(function(_starShip){
                return _starShip.name === starShip.name;
            })[0];
            $scope.toggleLeft();
        }

        $scope.toggleLeft = utils.toggleLeft;

        function getStarShips(pageId) {
            $scope.viewState.errorMessage = "Please wait while we are fetching starships for you";
            StarWarsStarShipsService.getStarShipsByPageId($scope.starShipsResultsCallback, pageId);
        }

        function viewStateInit($scope) {
            $scope.viewState = utils.getBaseViewStateConfig();
            $scope.viewState['totalStarShips'] = '';
            $scope.viewState['lastStarShipRetrieved'] = 0;
            $scope.viewState['starShips'] = [];
            $scope.viewState['activeStarShip'] = {};
        }

        function init() {
            viewStateInit($scope);
            getStarShips($scope.viewState.pageId);
        }
        
        init();
        
    }

    StarShipsListController.$inject = ["$scope", "StarWarsStarShipsService", "utils"];

    angular.module("starWarsGalaxy").controller("StarShipsListController", StarShipsListController);
}());
(function () {
    var VehiclesListController = function ($scope, StarWarsVehiclesService, utils) {

        $scope.vehiclesResultsCallback = function (response, error) {
            var viewState = $scope.viewState;
            if (error) {
                viewState.errorMessage = error;
            } else if (response && response.status == 200) {
                viewState.errorMessage = "";
                viewState.vehicles = response.data.results;
                viewState.activeVehicle = viewState.vehicles[0];
                viewState.totalVehicles = response.data.count;
                viewState.nextPageLink = response.data.next;
                viewState.prevPageLink = response.data.previous;
                viewState.prevBtnDisabled = !viewState.prevPageLink;
                viewState.nextBtnDisabled = !viewState.nextPageLink;
                viewState.lastVehicleRetrieved = utils.getIdFromUrl(viewState.vehicles[viewState.vehicles.length - 1].url);
                if(viewState.nextPageLink) {
                    viewState.pageNumbers = utils.getPageNumbers($scope.viewState.totalVehicles, $scope.viewState.vehicles.length);
                }
            }
            viewState.searchTerm = "";
            viewState.showProgressBar = false;
        }

        $scope.getNextVehicles = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePerson = {};
            $scope.viewState.pageId += 1;
            getVehicles($scope.viewState.pageId);
        }
        $scope.getPrevVehicles = function () {
            $scope.viewState.showProgressBar = true;
            $scope.viewState.activePerson = {};
            $scope.viewState.pageId -= 1;
            getVehicles($scope.viewState.pageId);
            
        }
        $scope.setActiveVehicle = function (vehicle) {
            $scope.viewState.activeVehicle = $scope.viewState.vehicles.filter(function(_vehicle){
                return _vehicle.name === vehicle.name;
            })[0];
            $scope.toggleLeft();
        }

        $scope.toggleLeft = utils.toggleLeft;

        function getVehicles(pageId) {
            $scope.viewState.errorMessage = "Please wait while we fetch the next set of vehicles for you";
            StarWarsVehiclesService.getVehiclesByPageId($scope.vehiclesResultsCallback, pageId);
        }

        function viewStateInit($scope) {
            $scope.viewState = utils.getBaseViewStateConfig();
            $scope.viewState['totalVehicles'] = '';
            $scope.viewState['lastVehicleRetrieved'] = 0;
            $scope.viewState['vehicles'] = [];
            $scope.viewState['activeVehicle'] = {};
        }

        function init() {
            viewStateInit($scope);
            getVehicles($scope.viewState.pageId);
        }
        
        init();

    }

    VehiclesListController.$inject = ["$scope", "StarWarsVehiclesService", "utils"];

    angular.module("starWarsGalaxy").controller("VehiclesListController", VehiclesListController);
}());
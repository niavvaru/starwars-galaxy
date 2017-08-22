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
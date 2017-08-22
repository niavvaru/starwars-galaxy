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
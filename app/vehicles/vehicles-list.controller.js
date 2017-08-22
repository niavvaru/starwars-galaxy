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
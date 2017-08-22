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
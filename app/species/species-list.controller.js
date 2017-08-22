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
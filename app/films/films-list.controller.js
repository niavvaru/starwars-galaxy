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
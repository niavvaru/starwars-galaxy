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
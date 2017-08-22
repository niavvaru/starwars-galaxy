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
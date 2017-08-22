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
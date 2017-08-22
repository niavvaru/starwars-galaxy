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
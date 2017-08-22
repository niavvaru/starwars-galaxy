(function() {
    var APP_BASE_URL = "https://swapi.co/api/";
    angular.module('starWarsGalaxy').constant('APP_BASE_URL', APP_BASE_URL);
    angular.module('starWarsGalaxy').constant('FILMS_URL', APP_BASE_URL+'films/');
    angular.module('starWarsGalaxy').constant('PEOPLE_URL', APP_BASE_URL+'people/');
    angular.module('starWarsGalaxy').constant('PLANETS_URL', APP_BASE_URL+'planets/');
    angular.module('starWarsGalaxy').constant('SPECIES_URL', APP_BASE_URL+'species/');
    angular.module('starWarsGalaxy').constant('STARSHIPS_URL', APP_BASE_URL+'starships/');
    angular.module('starWarsGalaxy').constant('VEHICLES_URL', APP_BASE_URL+'vehicles/');
}());
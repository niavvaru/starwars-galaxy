module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        concat: {
            app: {
                src: [
                    "app/**/*.module.js",
                    "app/**/*.constants.js",
                    "app/**/*.routes.js",
                    "app/**/*.service.js",
                    "app/**/*.controller.js",
                ],
                dest: "assets/dist/js/main.js"
            },
            lib: {
                src: [
                    "assets/libs/js/angular.min.js",
                    "assets/libs/js/angular-ui-router.min.js",
                    "assets/libs/js/angular-animate.min.js",
                    "assets/libs/js/angular-aria.min.js",
                    "assets/libs/js/angular-messages.min.js",
                    "assets/libs/js/angular-material.min.js",
                    "assets/libs/js/lodash.min.js"
                ],
                dest: "assets/dist/js/lib.js"
            }, css: {
                src: [
                    "assets/libs/css/*.css",
                    "assets/css/*.css"
                ],
                dest: "assets/dist/css/main.css"
            }
        },
        uglify: {
            app: {
                src: 'assets/dist/js/main.js',
                dest: 'assets/dist/js/main.min.js'
            }
        },
    });


    grunt.registerTask('default', ['concat', 'uglify']);
};
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        browserify: {
            bndr: {
                files: {
                    'dist/bndr.bundle.js': 'lib/bndr.js'
                }
            }
        },
        watch: {
            js: {
                files: [
                    'lib/**/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['default']
            }
        },
        uglify: {
            options: {
                
            },
            js: {
                files: {
                    'dist/bndr.min.js': 'dist/bndr.bundle.js'
                }
            }
        },
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register the default tasks.
    grunt.registerTask('default', ['browserify', 'uglify', 'watch']);
};
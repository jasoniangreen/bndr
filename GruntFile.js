module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        watch: {
            js: {
                files: [
                    'lib/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['uglify']
            }
        },
        uglify: {
            options: {
                
            },
            js: {
                files: {
                    'dist/bndr.min.js': 'lib/bndr.js'
                }
            }
        },
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register the default tasks.
    grunt.registerTask('default', ['uglify', 'watch']);
};
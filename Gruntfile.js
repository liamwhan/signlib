/**
 * Created by Liam on 25/07/2015.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['doc'],
        jsdoc: {

            dist: {
                dest: 'doc',
                src: ['modules/BaseClasses/Iterator.js'],
                options: {
                    template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['clean', 'jsdoc']);
};
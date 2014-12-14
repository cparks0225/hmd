/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'static/styles',
                    src: ['*.scss'],
                    dest: 'dist/styles',
                    ext: '.css'
                }]
            }
        },
        concat_css: {
            options: {
              // Task-specific options go here.
            },
            all: {
                src: ["dist/styles/*.css"],
                dest: "dist/styles/styles.css"
            },
        },
        concat: {
            options: {
                stripBanners: true
            },
            dist: {
                src: ['static/scripts/libs/*.js'],
                dest: 'dist/scripts/<%= pkg["name"] %>.js'
            }
        },
        uglify: {
            options: {
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/scripts/<%= pkg["name"] %>.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'static/images',
                    src: ['**/*.{png,jpg,gif,jpeg}'],
                    dest: 'dist/images/'
                }]
            }
        },
        clean: {
            build: ["dist/styles/styles.css"],
            release: ["dist/styles/styles.css"]
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['static/scripts/*.js', 'static/scripts/libs/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: ['static/images/*'],
                tasks: ['imagemin'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['static/styles/*.scss'],
                tasks: ['sass', 'clean', 'concat_css'],
                options: {
                    spawn: false,
                }
            },
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass']);

};

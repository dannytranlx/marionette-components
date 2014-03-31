/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function(string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var fs = require('fs');
    var path = require('path');

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * Marionette Components v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        // Task configuration.
        clean: {
            dist: ['dist', 'docs/dist']
        },

        gitclone: {
            clone: {
                options: {
                    repository: 'git@github.com:marionette-components/marionette-components.github.io.git',
                    branch: 'master',
                    directory: '_site'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            src: {
                src: 'js/**/*.js'
            },
            test: {
                src: 'js/tests/unit/**/*.js'
            },
            assets: {
                src: 'docs/assets/js/_src/**/*.js'
            }
        },

        jscs: {
            options: {
                config: 'js/.jscsrc'
            },
            src: {
                src: '<%= jshint.src.src %>'
            },
            test: {
                src: '<%= jshint.test.src %>'
            },
            assets: {
                options: {
                    requireCamelCaseOrUpperCaseIdentifiers: null
                },
                src: '<%= jshint.assets.src %>'
            }
        },

        uglify: {
            components: {
                options: {
                    banner: '<%= banner %>'
                },
                src: 'dist/js/<%= pkg.name %>.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            },
            docsJs: {
                options: {
                    preserveComments: 'some'
                },
                src: [
                    'docs/assets/js/_vendor/holder.js',
                    'docs/assets/js/_src/application.js'
                ],
                dest: 'docs/assets/js/docs.min.js'
            }
        },

        sass: {
            dist: {
                style: 'compressed',
                sourcemap: true,
                unixNewlines: true,
                expand: true,
                cwd: 'scss',
                src: ['*.scss'],
                dest: 'dist/css',
                ext: '.min.css'
            },
            src: {
                style: 'expanded',
                unixNewlines: true,
                banner: '<%= banner %>',
                expand: true,
                cwd: 'scss',
                src: ['*.scss'],
                dest: 'dist/css',
                ext: '.css'
            }
        },

        copy: {
            docs: {
                files: [{
                    expand: true,
                    cwd: './dist',
                    src: [
                        '{css,js}/*',
                        'fonts/*'
                    ],
                    dest: 'docs/dist'
                }, {
                    expand: false,
                    src: [
                        'bower_components/requirejs/require.js'
                    ],
                    dest: 'docs/assets/js/require.js'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    base: '_site'
                }
            }
        },

        jekyll: {
            docs: {}
        },

        validation: {
            options: {
                charset: 'utf-8',
                doctype: 'HTML5',
                failHard: true,
                reset: true,
                relaxerror: [
                    'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
                    'Element img is missing required attribute src.'
                ]
            },
            files: {
                src: '_site/**/*.html'
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: [
                    '<%= jshint.src.src %>',
                    'js/templates/**/*.hbs',
                    'docs/assets/js/_src/**/*.js'
                ],
                tasks: ['jshint:src', 'dist']
            },
            jekyll: {
                files: [
                    'docs/**/*',
                    '!docs/dist/**/*',
                    '!docs/assets/js/**/*.{js,frag}'
                ],
                tasks: ['jekyll', 'copy:docs']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test']
            },
            scss: {
                files: 'scss/**/*.scss',
                tasks: 'dist'
            },

            grunt: {
                files: [
                    'Gruntfile.js'
                ],
                tasks: ['dist']
            }
        },

        sed: {
            versionNumber: {
                pattern: (function() {
                    var old = grunt.option('oldver');
                    return old ? RegExp.quote(old) : old;
                })(),
                replacement: grunt.option('newver'),
                recursive: true
            }
        },

        exec: {
            npmUpdate: {
                command: 'npm update'
            }
        },

        concat: {
            bootstrap: {
                options: {
                    banner: 'define(["jquery"], function(jQuery){\n',
                    footer: '\n return jQuery; \n});'
                },
                src: [
                    'bower_components/bootstrap/dist/js/bootstrap.js'
                ],
                dest: 'docs/assets/js/bootstrap.js'
            }
        },

        requirejs: {
            minified: {
                options: {
                    almond: true,
                    baseUrl: '.',
                    include: ['js/marionette-components'],
                    mainConfigFile: 'js/config.js',
                    name: 'bower_components/almond/almond',
                    out: 'dist/js/<%= pkg.name %>.min.js',
                    optimize: 'uglify2',
                    wrap: {
                        startFile: 'js/start.js.frag',
                        endFile: 'js/end.js.frag'
                    },

                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                }
            },

            source: {
                options: {
                    almond: true,
                    baseUrl: '.',
                    include: ['js/marionette-components'],
                    mainConfigFile: 'js/config.js',
                    name: 'bower_components/almond/almond',
                    out: 'dist/js/<%= pkg.name %>.js',
                    wrap: {
                        startFile: 'js/start.js.frag',
                        endFile: 'js/end.js.frag'
                    },
                    optimize: 'none'
                }
            },

            docs: {
                options: {
                    almond: true,
                    baseUrl: '.',
                    include: ['docs/assets/js/_src/application'],
                    mainConfigFile: 'js/config.js',
                    name: 'bower_components/almond/almond',
                    out: 'docs/assets/js/docs.min.js',
                    optimize: 'uglify2',
                    wrap: {
                        startFile: 'docs/assets/js/_src/start.js.frag',
                        endFile: 'docs/assets/js/_src/end.js.frag'
                    },

                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                }
            },


            docs_src: {
                options: {
                    almond: true,
                    baseUrl: '.',
                    include: ['docs/assets/js/_src/application'],
                    mainConfigFile: 'js/config.js',
                    name: 'bower_components/almond/almond',
                    out: 'docs/assets/js/docs.js',
                    optimize: 'none',
                    wrap: {
                        startFile: 'docs/assets/js/_src/start.js.frag',
                        endFile: 'docs/assets/js/_src/end.js.frag'
                    }
                }
            },
        }
    });


    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });
    require('time-grunt')(grunt);

    grunt.registerTask('init', ['gitclone:clone']);

    // Test task.
    var testSubtasks = [];
    // Skip core tests if running a different subset of the test suite
    if (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'core') {
        testSubtasks = testSubtasks.concat(['dist-css', 'jshint', 'jscs']);
    }
    // Skip HTML validation if running a different subset of the test suite
    if (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'validate-html') {
        testSubtasks.push('validate-html');
    }
    grunt.registerTask('test', testSubtasks);

    // Docs HTML validation task
    grunt.registerTask('validate-html', ['jekyll', 'validation']);

    // JS distribution task.
    grunt.registerTask('dist-js', ['requirejs:source', 'requirejs:minified']);
    grunt.registerTask('dist-doc-js', ['concat:bootstrap', 'requirejs:docs_src', 'requirejs:docs']);

    // CSS distribution task.
    grunt.registerTask('dist-css', ['sass']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'copy:docs', 'dist-doc-js', 'jekyll']);

    // Default task.
    grunt.registerTask('default', ['test', 'dist']);

    grunt.registerTask('dev', ['connect', 'watch']);

    // Version numbering task.
    // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
    // This can be overzealous, so its changes should always be manually reviewed!
    grunt.registerTask('change-version-number', 'sed');
};
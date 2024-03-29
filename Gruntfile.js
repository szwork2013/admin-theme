var files = require('./adminFiles').files;
var util = require('./lib/grunt/utils.js');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: true,
      },
      node: {
        files: {
          src: ['*.js', 'lib/**/*.js', 'js/**/*.js']
        },
      }
    },
    concat: {
      kernel: {
        dest: 'dist/js/kernel.js',
        src: util.wrap([files['modules']['kernel']], 'module')
      },
      product: {
        dest: 'dist/js/product.js',
        src: util.wrap([files['modules']['product']], 'module')
      },
      auth: {
        dest: 'dist/js/auth.js',
        src: util.wrap([files['modules']['auth']], 'module')
      },
      section: {
        dest: 'dist/js/section.js',
        src: util.wrap([files['modules']['section']], 'module')
      },
      order: {
        dest: 'dist/js/order.js',
        src: util.wrap([files['modules']['order']], 'module')
      },
      shop: {
        dest: 'dist/js/shop.js',
        src: util.wrap([files['modules']['shop']], 'module')
      },
      variant: {
        dest: 'dist/js/variant.js',
        src: util.wrap([files['modules']['variant']], 'module')
      },
      reports: {
        dest: 'dist/js/reports.js',
        src: util.wrap([files['modules']['reports']], 'module'),
      },
      settings: {
        dest: 'dist/js/settings.js',
        src: util.wrap([files['modules']['settings']], 'module'),
      },
      media: {
        dest: 'dist/js/media.js',
        src: util.wrap([files['modules']['media']], 'module'),
      },
      base: {
        dest: 'dist/js/base.js',
        src: util.wrap([files['modules']['base']], 'module'),
      }
    },
    uglify: {
        core: {
            files:{
                "dist/js/core.js":[
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                    'bower_components/ng-file-upload/ng-file-upload-all.min.js',
                    'bower_components/angular-input-masks/angular-input-masks-standalone.min.js',
                    'bower_components/ng-tags-input/ng-tags-input.min.js',
        		        'bower_components/angular-ui-grid/ui-grid.js',
        		        'bower_components/angular-loading-bar/build/loading-bar.min.js',
                    'bower_components/angular-notify/dist/angular-notify.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
               ],
           }
       },
       dist: {
            options: {
              sourceMap: true
            },
            files:{
                "dist/js/app.js":[
                    'js/app.js',
                    'js/constant.js',
                    'js/environment.js',
                    'dist/js/kernel.js',
                    'dist/js/product.js',
                    'dist/js/auth.js',
                    'dist/js/section.js',
                    'dist/js/order.js',
                    'dist/js/shop.js',
                    'dist/js/variant.js',
                    'dist/js/reports.js',
                    'dist/js/dashboard.js',
                    'dist/js/settings.js',
                    'dist/js/media.js',
                    'dist/js/base.js',
                    'js/bootstrap.js'
              ],
           }
        }

  },
    ngtemplates:  {
      web:{
        src:'web/**/*.html',
        dest:'dist/js/templates.js',
        options:{
          module: "app.kernel",
          prefix: '/',
          htmlmin:{
            collapseWhitespace: true,
            collapseBooleanAttributes: true
          }
        }
      }
    },
    copy: {
        bootstrap: {
            files: [{
                src: 'bower_components/bootstrap-sass/assets/fonts/**',
                dest: 'dist/fonts/bootstrap/',
                expand: true,
                flatten: true

            }]
        },

        awesome: {
            files: [{
                src: 'bower_components/font-awesome-sass/assets/fonts/**',
                dest: 'dist/fonts/font-awesome/',
                expand: true,
                flatten: true

            }]
        },

        i18n: {
            files: [{
                src: 'src/locale/**',
                dest: 'dist/i18n/',
                expand: true,
                flatten: true

            }]
        },
        
        examples: {
            files: [{
                src: 'dist/**/*',
                dest: 'examples/dist/',
                expand: true,
                flatten: true

            }]
        }
    },
    watch: {
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['js'],
        options: {
          spawn: false,
        },
      },
      templates: {
        files: ['web/**/*.html'],
        tasks: ['temp'],
        options: {
          spawn: false,
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');

  grunt.registerTask('js', ['concat', 'uglify:dist']);
  grunt.registerTask('css', ['cssmin']);
  grunt.registerTask('temp', ['ngtemplates']);
  grunt.registerTask('examples', ['copy:examples']);
  // Default task(s).
  grunt.registerTask('default', ['js', 'css', 'copy', 'temp', 'examples']);

};

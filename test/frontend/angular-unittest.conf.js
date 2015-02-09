module.exports = function(config){
  config.set({

    basePath : '../../',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'public/js/**/*.js',
      'public/views/**/*.html',
      'test/frontend/unit/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
            ],

    preprocessors: {
      'public/views/**/*.html':['ng-html2js']
    },

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

 

  });
};
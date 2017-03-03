// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'modules/angular/angular.js',      
    ],

    // list of files / patterns to exclude
    exclude: [
      'test/e2e/*',
        'src/app/test_player/**'
    ],

    // web server port
    port: 8081,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['ChromeNoSandbox'],//temp fix for Chrome Browser 'Chrome'
    customLaunchers: {
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['progress','coverage','html'],

    preprocessors: {
	'src/**/*.js':['coverage']
	},

	coverageReporter: {
	type: 'lcov',
	dir: 'qualityreports/testresults/unit/coverage/'
	},

	htmlReporter: {
		 outputFile: 'qualityreports/testresults/unit/testresults.html'
	},

	

	plugins: [
        'karma-jasmine','karma-chrome-launcher','karma-coverage','karma-htmlfile-reporter'],
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};








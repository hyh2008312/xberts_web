// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-11-05 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/summernote/dist/summernote.js',
      'bower_components/angular-summernote/dist/angular-summernote.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/ng-tags-input/ng-tags-input.min.js',
      'bower_components/intl-tel-input/build/js/intlTelInput.min.js',
      'bower_components/intl-tel-input/lib/libphonenumber/build/utils.js',
      'bower_components/international-phone-number/releases/international-phone-number.js',
      'bower_components/angular-growl-v2/build/angular-growl.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/string/dist/string.min.js',
      'bower_components/angular-img-fallback/angular.dcb-img-fallback.js',
      'bower_components/angular-scroll/angular-scroll.js',
      'bower_components/checklist-model/checklist-model.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-random-string/src/angular-random-string.js',
      'bower_components/satellizer/satellizer.js',
      'bower_components/ng-idle/angular-idle.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};

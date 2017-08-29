const gulp             = require('gulp');
const eventStream      = require('event-stream');
const buildIndex       = require('./index');
const buildImages      = require('./images');

const buildApp = function() {
  return eventStream.merge(
    buildIndex(),
    buildImages()
  );
};

gulp.task('build-app', ['clean'], buildApp);
module.exports = buildApp;
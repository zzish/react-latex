'use strict';
var gulp = require('gulp');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');


// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-core/register');

var handleErr = function (err) {
  console.log(err.message);
  process.exit(1);
};

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(jscs())
    .on('error', handleErr);
});

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')    .pipe(babel())

    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('babel', function () {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(rename('latex.npm.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('modules', function() {
    return browserify({
        entries: './lib/Latex.js',
        debug: false
    })
    .transform(babelify)
    .bundle()
    .pipe(source('latex.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify', ['modules'], function(){
    return gulp.src('dist/latex.js')
        .pipe(uglify({
            compress: {
                drop_console: true,
                unsafe: true
            }
        }))
        .pipe(rename('latex.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('prepublish', ['nsp', 'babel', 'modules', 'minify']);
gulp.task('default', ['test']);

"use strict";

const gulp = require('gulp');
const connect = require('gulp-connect'); // runs local dev server
const open = require('gulp-open'); // open a URL in a web browser
const browserify = require('browserify'); // bundles JS
const reactify = require('reactify'); // Transforms React JSX to JS
const source = require('vinyl-source-stream'); // Use conventional text streams with gulp
const concat = require('gulp-concat'); // concatenates files
const lint = require('gulp-eslint');

const config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/toastr/build/toastr.min.css',
    ],
    images: './src/images/*',
    dist: './dist',
    mainJs: './src/main.js',
  },
};

//start a local dev server
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
  });
});

//open index.html in a browser window
gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

//copy html files to dist and reload
gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

//bundle and copy JS files to dist/scripts
gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

  //publish favicon
  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(lint({ config: 'eslint.config.json' }))
    .pipe(lint.format());
});

//watch for files to change
gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

//run these tasks as default 'gulp' command
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);
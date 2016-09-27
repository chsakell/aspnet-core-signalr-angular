/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("gulp-rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    copy = require("gulp-copy"),
    rename = require("gulp-rename"),
    watch = require("gulp-watch"),
    tsc = require("gulp-tsc");

var paths = {
    webroot: "./wwwroot/",
    node_modules: "./node_modules/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/live-game-feed.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

paths.lib = paths.webroot + "lib/";

paths.angular = paths.node_modules + "@angular/**/*.js";
paths.angularWebApi = paths.node_modules + "angular2-in-memory-web-api/*.js";
paths.corejs = paths.node_modules + "core-js/client/shim*.js";
paths.zonejs = paths.node_modules + "zone.js/dist/zone*.js";
paths.reflectjs = paths.node_modules + "reflect-metadata/Reflect*.js";
paths.systemjs = paths.node_modules + "systemjs/dist/*.js";
paths.rxjs = paths.node_modules + "rxjs/**/*.js";
paths.jasminejs = paths.node_modules + "jasmine-core/lib/jasmine-core/*.*";

paths.app = "app/**/*.*";
paths.appDest = paths.webroot + "app";
gulp.task("clean:js", function (cb) {
    return rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("copy:angular", function () {

    return gulp.src(paths.angular,
        { base: paths.node_modules + "@angular/" })
        .pipe(gulp.dest(paths.lib + "@angular/"));
});

gulp.task("copy:angularWebApi", function () {
    return gulp.src(paths.angularWebApi,
        { base: paths.node_modules })
        .pipe(gulp.dest(paths.lib));
});

gulp.task("copy:corejs", function () {
    return gulp.src(paths.corejs,
        { base: paths.node_modules })
        .pipe(gulp.dest(paths.lib));
});

gulp.task("copy:zonejs", function () {
    return gulp.src(paths.zonejs,
        { base: paths.node_modules })
        .pipe(gulp.dest(paths.lib));
});

gulp.task("copy:reflectjs", function () {
    return gulp.src(paths.reflectjs,
        { base: paths.node_modules })
        .pipe(gulp.dest(paths.lib));
});

gulp.task("copy:systemjs", function () {
    return gulp.src(paths.systemjs,
        { base: paths.node_modules })
        .pipe(gulp.dest(paths.lib));
});

gulp.task("copy:rxjs", function () {
    return gulp.src(paths.rxjs,
        { base: paths.node_modules })
        .pipe(gulp.dest(paths.lib));
});

gulp.task("copy:app", function () {
    return gulp.src(paths.app)
        .pipe(gulp.dest(paths.appDest));
});

gulp.task("copy:jasmine", function () {
    return gulp.src(paths.jasminejs,
        { base: paths.node_modules + "jasmine-core/lib" })
        .pipe(gulp.dest(paths.lib));
});

gulp.task("dependencies", ["copy:angular",
    "copy:angularWebApi",
    "copy:corejs",
    "copy:zonejs",
    "copy:reflectjs",
    "copy:systemjs",
    "copy:rxjs",
    "copy:jasmine",
    "copy:app"]);

gulp.task("watch", function () {
    return watch(paths.app)
        .pipe(gulp.dest(paths.appDest));
});

gulp.task("min:app", function () {
    return gulp.src(paths.app)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.appDest));
});

gulp.task("min", ["min:js", "min:css", "min:app"]);

gulp.task("default", ["clean", "dependencies"]);
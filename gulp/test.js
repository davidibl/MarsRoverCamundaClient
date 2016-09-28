'use strict';

const gulp = require('gulp'), config = require('./gulpconfig');

const path = require('path'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    inject = require('gulp-inject'),
    merge = require('merge2'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    run = require('run-sequence');

gulp.task('test:clean', () => del(path.join(config.targets.testing, '**/*')));

gulp.task('test:externalModules:clean', () => del(Object.keys(config.externalModules).map(m => path.join('node_modules', m, '**/*'))));

gulp.task('test:externalModules', ['test:externalModules:clean'], () => {
    return merge(Object.keys(config.externalModules).map(m => gulp.src(config.externalModules[m]).pipe(gulp.dest(path.join('node_modules', m)))));
});


gulp.task('test:scripts', () => {
    return gulp.src(config.sources.scripts.concat(config.sources.specs), { base: '.' })
        .pipe(sourcemaps.init())
        .pipe(typescript(Object.assign({}, config.typescript, { declaration: false })))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.targets.testing));
});

gulp.task('test:templates', () => {
    return gulp.src(config.sources.templates, { base: config.base })
        .pipe(gulp.dest(config.targets.testing + '/src/'));
});

gulp.task('test:assets', () => {
    return gulp.src(config.sources.assets)
        .pipe(gulp.dest(config.targets.testassets));
});

gulp.task('test:scripts:watch', () => {
    return watch(config.sources.scripts.concat(config.sources.specs), batch((e, done) => run('test:scripts', 'test:index', done)));
});

gulp.task('test:index', () => {
    return gulp.src(config.testIndex)
        .pipe(inject(gulp.src(path.join(config.targets.testing, config.testBase, '**/*.js'), { read: false }), {
            starttag: 'Promise.all([',
            endtag: '])',
            addRootSlash: false,
            transform: (fp, f, i, l) => '    System.import("' + fp.substr(8, fp.length - 11) + '")' + (i + 1 < l ? ',' : '')
        }))
        .pipe(gulp.dest(config.targets.testing));
});

gulp.task('test', done => {
    run('test:clean',
        'test:scripts',
        'test:templates',
        'test:assets',
        'test:index',
        done);
});

gulp.task('test:watch', done => {
    run(['test:scripts:watch'], done);
});
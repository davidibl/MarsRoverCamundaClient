'use strict';

const gulp = require('gulp'), config = require('./gulpconfig');

const path = require('path'),
    fs = require('fs'),
    del = require('del'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    merge = require('merge2'),
    inject = require('gulp-inject'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    run = require('run-sequence'),
    embed = require('gulp-angular-embed-templates'),
    count = require('gulp-count'),
    replaceExtension = require('replace-ext'),
    less = require('gulp-less');
    

gulp.task('build:clean', () => del(path.join(config.targets.build, '**/*')));

gulp.task('build:vendorScripts', () => {
    return gulp.src(config.vendorScripts)
        .pipe(gulp.dest(config.targets.lib));
});

gulp.task('build:nodeModules', () => {
    return gulp.src(config.nodeModules.map(m => path.join('node_modules', m, '**/*{.js,.js.map}')), { base: 'node_modules' })
        .pipe(gulp.dest(config.targets.lib));
});

gulp.task('build:externalModules:clean', () => del(Object.keys(config.externalModules).map(m => path.join('node_modules', m, '**/*'))));

gulp.task('build:externalModules', ['build:externalModules:clean'], () => {
    return merge(Object.keys(config.externalModules).map(m => gulp.src(config.externalModules[m]).pipe(gulp.dest(path.join('node_modules', m)))));
});

gulp.task('build:externalModules:watch', () => {
    return watch(Object.keys(config.externalModules).map(m => config.externalModules[m]).reduce((a, b) => a.concat(b)), batch((e, done) => run('build:externalModules', 'build:nodeModules', 'build:scripts', done)));
});

gulp.task('build:less', function(){
    return gulp.src('src/less/site.less')
        .pipe(less())
        .pipe(gulp.dest(config.targets.styles));
});

gulp.task('build:lint', () => {
    return gulp.src(config.sources.scripts)
        .pipe(tslint({formatter: "verbose"}))
        .pipe(tslint.report({ emitError: false }));
});

gulp.task('build:scripts', () => {
    let files = gulp.src(config.sources.scripts, { base: config.base });
    return transpileScripts(files, config.typeScript);
});

function transpileScripts(files, typeScriptConfig) {
    if (typeScriptConfig.buildMode === 'fast') {
        files = files.pipe(tslint({ reporter: 'verbose' }))
            .pipe(tslint.report({ emitError: false }))
    }
    const ts = files
        .pipe(sourcemaps.init())
        .pipe(embed({
            sourceType: 'ts',
            minimize: {
                empty: true,
                cdata: true,
                comments: true,
                spare: true,
                quotes: true
            }
        }))
        .pipe(count('Transpiled ## files'))
        .pipe(typescript(typeScriptConfig.compilerOptions));
    return merge([
        ts.dts.pipe(gulp.dest(config.targets.build)),
        ts.js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.targets.build))
    ]);
}

gulp.task('build:scripts:watch', () => {
    return watch(config.sources.scripts, batch((e, done) => run('build:lint', 'build:scripts', done)));
});

gulp.task('build:templates', () => {
    return gulp.src(config.sources.templates, { base: config.base })
        .pipe(gulp.dest(config.targets.build));
});

gulp.task('build:templates:watch', () => {
    return watch(config.sources.templates, batch((e, done) => run('build:templates', done)));
});

gulp.task('build:styles', () => {
    return gulp.src(config.sources.styles)
        .pipe(gulp.dest(config.targets.styles));
});

gulp.task('build:styles:watch', () => {
    return watch(config.sources.styles, batch((e, done) => run('build:styles', done)));
});

gulp.task('build:assets', () => {
    return gulp.src(config.sources.assets)
        .pipe(gulp.dest(config.targets.assets));
});

gulp.task('build:assets:watch', () => {
    return watch(config.sources.assets, batch((e, done) => run('build:assets', done)));
});

gulp.task('build:fonts', () => {
    return gulp.src(config.sources.fonts)
        .pipe(gulp.dest(config.targets.fonts));
});

gulp.task('build:fonts:watch', () => {
    return watch(config.sources.fonts, batch((e, done) => run('build:fonts', done)));
});

gulp.task('build:index', () => {
    return gulp.src(config.index)
        .pipe(inject(gulp.src(config.vendorScripts.map(v => path.join(config.targets.lib, v.split('/').slice(-1)[0])), { read: false }), { addRootSlash: false, ignorePath: config.targets.build }))
        .pipe(inject(gulp.src(path.join(config.targets.build, '**/*.css'), { read: false }), { addRootSlash: false, ignorePath: config.targets.build }))
        .pipe(gulp.dest(config.targets.build));
});

gulp.task('build:index:watch', () => {
    return watch(config.index, batch((e, done) => run('build:index', done)));
});

gulp.task('build:watch', done => {
    run(['build:scripts:watch', 'build:templates:watch', 'build:styles:watch', 'build:assets:watch', 'build:fonts:watch', 'build:index:watch'], done);
});

gulp.task('build:less', function(){
    return gulp.src('src/less/site.less')
        .pipe(less())
        .pipe(gulp.dest(config.targets.styles));
});

gulp.task('build', done => {
    run('build:clean',
        ['build:lint', 'build:vendorScripts', 'build:nodeModules', 'build:scripts', 'build:styles', 'build:assets', 'build:fonts', 'build:less'],
        'build:index',
        done);
});
